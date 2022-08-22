import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useErrorHandler from 'src/hooks/useErrorHandler';
import { IUploader, IFormTransformer } from '../../lib/uploader';
import {
  SmartContractMediaDeployer, IDeployer, MediaMinter,
} from '../../lib/scm/deployer';
import { mcoApi } from '../../lib/scm/mco';
import { useAddresses } from '../../lib/web3';
import { CreateFormData } from './types';

interface HandlerParams {
  uploader: IUploader;
}

export enum HandlerStatus {
  INITED = 'Initialization',
  DEPLOY = 'Contract Deployment',
  UP_THUMBNAIL = 'Thumbnail Upload',
  UP_MEDIA = 'Media Upload',
  SUCCEED = 'succeed',
  FAILED = 'failed',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const toBase64 = (file: File): Promise<string | ArrayBuffer> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    resolve(reader.result);
  };
  reader.onerror = (err) => {
    reject(err);
  };
});

const thumbnailTransformer: IFormTransformer<Pick<CreateFormData, 'thumbnail' | 'title'>> = {
  transform: async (payload: CreateFormData) => {
    const formData = new FormData();
    formData.append('image', payload.thumbnail);
    formData.append('title', payload.title);
    return formData;
  },
};

const mediaTransformer: IFormTransformer<Omit<CreateFormData, 'thumbnail'> & {thumbnail: string;}> = {
  transform: async (payload: Omit<CreateFormData, 'thumbnail'> & {thumbnail: string;}) => {
    const formData = new FormData();
    formData.append('image', payload.mediaFile);
    formData.append('thumbnailHash', payload.thumbnail);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('author', payload.author);
    formData.append('price', payload.salePrice.amount.toString());
    formData.append('payToken', payload.salePrice.payToken);
    return formData;
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jsonTramsformer: IFormTransformer<any> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: async (payload: any) => {
    const formData = new FormData();
    const bytes = new TextEncoder().encode(
      typeof payload === 'string'
        ? payload
        : JSON.stringify(payload)
    );
    formData.append('data', new Blob([bytes], { type: 'application/json' }));
    return formData;
  },
};

export default ({ uploader }: HandlerParams) => {
  const { library, account, chainId } = useWeb3React();
  const { throwError } = useErrorHandler();
  const { ISSUER_TOKEN, MEDIA_TOKEN } = useAddresses();
  const [status, setStatus] = useState<HandlerStatus>(null);
  const [outcome, setOutcome] = useState<string>(null);

  const handlePayload = async ({ thumbnail, title, ...payload }: CreateFormData) => {
    setStatus(HandlerStatus.INITED);
    try {
      // 0. deploy contract
      const spec = await mcoApi.generateContractSpecification(payload.templateRaw);
      setStatus(HandlerStatus.DEPLOY);
      const deployer: IDeployer = new SmartContractMediaDeployer({
        account,
        issuer: ISSUER_TOKEN,
        provider: library?.getSigner(),
        tokenURIHasher: async (metadata: string) => {
          const response0 = await uploader.upload<{path: string}[]>(await jsonTramsformer.transform(metadata), {
            headers: {
              'X-Target-Flow': 'ipfs',
            },
          });

          return response0[0].path;
        },
      });

      // NOTE. Replace .parties with values set from royalties form
      const contract = await deployer.deploy({
        ...spec,
        parties: {
          ...spec.parties,
          ...(
            Object.fromEntries(
              (payload.royalties).map(({ identifier, address }) => [identifier, address])
            )
          ),
        },
      });

      // 1. upload thumbnail -> replace .thumnail with returned CID of the file
      const thumnailFormData = await thumbnailTransformer.transform({ thumbnail, title });
      setStatus(HandlerStatus.UP_THUMBNAIL);
      const response1 = await uploader.upload<{path: string}[]>(thumnailFormData, {
        headers: {
          'X-Target-Flow': 'ipfs',
        },
      });

      // 2. upload media file
      setStatus(HandlerStatus.UP_MEDIA);
      const mediaFormData = await mediaTransformer.transform({
        ...payload,
        title,
        thumbnail: response1[0].path,
      });
      const response2 = await uploader.upload<{path: string}[]>(mediaFormData, {
        headers: {
          'X-Target-Flow': 'dash,ipfs',
        },
      });

      // Mint the media as an NFT on MediaToken contract
      const response3 = await uploader.upload<{path: string}[]>(await jsonTramsformer.transform(JSON.stringify({
        name: title,
        description: payload.description,
        image: response1[0].path,
        attributes: [
          { trait_type: 'Thumbnail', value: response1[0].path },
          { trait_type: 'Media', value: response2[0].path },
          { trait_type: 'MediaContract', value: MEDIA_TOKEN },
          { trait_type: 'TransactionHash', value: contract.transactionHash },
          { trait_type: 'ChainId', value: chainId },
          { trait_type: 'Author', value: account },
          { trait_type: 'Distribution', value: payload.distributionMethod },
          { trait_type: 'LabelType', value: payload.label },
          { trait_type: 'Specification', value: JSON.parse(spec.contentURI) },
        ],
      })), {
        headers: {
          'X-Target-Flow': 'ipfs',
        },
      });
      const receipt = await (new MediaMinter({
        provider: library?.getSigner(),
        address: MEDIA_TOKEN,
      })).mint(account, response3[0].path);

      console.log({ response1, response2, response3, receipt });

      setStatus(HandlerStatus.SUCCEED);
      setOutcome(response2[0].path);

      return response2;
    } catch (e) {
      throwError(e);
      setStatus(HandlerStatus.FAILED);
      return Promise.reject(e);
    }
  };

  return {
    status,
    handlePayload,
    outcome,
  };
};
