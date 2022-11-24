import { useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import { AddressZero } from '@ethersproject/constants';
import { INTERFACE_ERC721 } from '@elacity-js/lib';
import { useWeb3React } from '@web3-react/core';
import useErrorHandler from 'src/hooks/useErrorHandler';
import { IUploader, IFormTransformer } from '../../lib/uploader';
import { useAddresses } from '../../lib/web3';
import { MintForm as BaseType } from '../../lib/typeform/types';

declare type MintForm = BaseType & {author?: string}

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

const thumbnailTransformer: IFormTransformer<Pick<MintForm, 'assetThumbnail' | 'title'>> = {
  transform: async (payload: MintForm) => {
    const formData = new FormData();
    formData.append('image', payload.assetThumbnail);
    formData.append('title', payload.title);
    return formData;
  },
};

const mediaTransformer: IFormTransformer<Omit<MintForm, 'assetThumbnail'> & {thumbnail: string;}> = {
  transform: async (payload: Omit<MintForm, 'assetThumbnail'> & {thumbnail: string;}) => {
    const formData = new FormData();
    formData.append('image', payload.assetFile);
    formData.append('thumbnailHash', payload.thumbnail);
    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('author', payload.author);
    if (Number(payload.pricePerSale || 0) > 0) {
      formData.append('price', payload.pricePerSale.toString());
    }
    formData.append('payToken', AddressZero);
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
  const { TEMP721 } = useAddresses();
  const [status, setStatus] = useState<HandlerStatus>(null);
  const [outcome, setOutcome] = useState<string>(null);

  const handlePayload = async ({ assetThumbnail, title, ...payload }: MintForm) => {
    setStatus(HandlerStatus.INITED);
    try {
      // 1. upload thumbnail -> replace .thumnail with returned CID of the file
      const thumnailFormData = await thumbnailTransformer.transform({ assetThumbnail, title });
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
          { trait_type: 'ChainId', value: chainId },
          { trait_type: 'Author', value: account },
          { trait_type: 'Distribution', value: payload.accessMethod },
          { trait_type: 'Royalties', value: payload.royalties },
          { trait_type: 'LabelType', value: payload.operator },
        ],
      })), {
        headers: {
          'X-Target-Flow': 'ipfs',
        },
      });

      const contract = new Contract(TEMP721, INTERFACE_ERC721, library?.getSigner());
      const tx = await contract.mint(account, response3[0].path);

      const receipt = await tx.wait();

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
