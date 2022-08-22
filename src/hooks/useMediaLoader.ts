import {
  useMemo, useState, useEffect,
} from 'react';
import { CollectionOf } from '@elacity-js/lib';
import { useWeb3React } from '@web3-react/core';
import { BigNumberish } from '@ethersproject/bignumber';
import mediaTokenArtifact from '../lib/scm/deployer/iface/MediaToken.json';
import { Erc721ContractType } from '../lib/web3/contract';
import { useAddresses } from '../lib/web3/hooks';
import { MediaTokenAsset } from '../types';

class MediaToken extends Erc721ContractType<MediaTokenAsset> {
  async getAssetByTokenId(tokenId: BigNumberish): Promise<MediaTokenAsset> {
    const asset: MediaTokenAsset = { tokenId, tokenURI: '' };
    asset.tokenURI = await this.cRead.tokenURI(tokenId);

    return asset;
  }
}

export default () => {
  const { chainId, account, library } = useWeb3React();
  const { MEDIA_TOKEN } = useAddresses();
  const [result, setResult] = useState<CollectionOf<MediaTokenAsset>>({
    total: 0,
    items: [],
    offset: 0,
    limit: Infinity,
  });

  const contract = useMemo(() => {
    const abiMap = {
      [chainId]: {
        abi: mediaTokenArtifact.abi,
        address: MEDIA_TOKEN,
      },
    };

    if (!MEDIA_TOKEN || !chainId || !library?.provider) {
      return null;
    }

    return new MediaToken(
      chainId,
      library,
      abiMap
    );
  }, [chainId, library]);

  useEffect(() => {
    contract?.getOwnerAssets(account).promise().then(
      async (re: CollectionOf<MediaTokenAsset>) => {
        setResult({
          ...re,
          items: await Promise.all(
            re.items.map(
              async (item: MediaTokenAsset) => {
                const rs = await fetch(item.tokenURI);
                const metadata = await rs.json();

                console.log({ item, metadata });

                return {
                  ...item,
                  name: metadata.name,
                  description: metadata.description,
                  image: `https://ipfs.io/ipfs/${metadata.image}`,
                  // eslint-disable-next-line camelcase
                  mediaURL: metadata.attributes.find(({ trait_type }) => trait_type === 'Media')?.value,
                };
              }
            )
          ),
        });
      }
    ).catch(console.error);
  }, [chainId, library]);

  return result;
};
