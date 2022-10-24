import {
  useMemo, useState, useEffect,
} from 'react';
import { INTERFACE_ERC721, CollectionOf } from '@elacity-js/lib';
import { useWeb3React } from '@web3-react/core';
import { BigNumberish } from '@ethersproject/bignumber';
// import mediaTokenArtifact from '../lib/scm/deployer/iface/MediaToken.json';
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

const mediaFormatter = async (item: MediaTokenAsset) => {
  const rs = await fetch(`https://ipfs.ela.city/ipfs/${item.tokenURI}`);
  const metadata = await rs.json();

  return {
    ...item,
    name: metadata.name,
    description: metadata.description,
    image: `https://ipfs.ela.city/ipfs/${metadata.image}`,
    // eslint-disable-next-line camelcase
    mediaURL: metadata.attributes.find(({ trait_type }) => trait_type === 'Media')?.value,
  };
};

export default (method: string, args: BigNumberish[]) => {
  const { chainId, library } = useWeb3React();
  const { TEMP721 } = useAddresses();
  const [result, setResult] = useState<CollectionOf<MediaTokenAsset>>({
    total: 0,
    items: [],
    offset: 0,
    limit: Infinity,
  });

  const contract = useMemo(() => {
    const abiMap = {
      [chainId]: {
        abi: INTERFACE_ERC721,
        address: TEMP721,
      },
    };

    if (!TEMP721 || !chainId || !library?.provider) {
      return null;
    }

    return new MediaToken(
      chainId,
      library,
      abiMap
    );
  }, [chainId, library]);

  useEffect(() => {
    contract?.[method](...args).promise().then(
      async (re: CollectionOf<MediaTokenAsset>) => {
        setResult({
          ...re,
          items: await Promise.all(
            re.items.map(mediaFormatter)
          ),
        });
      }
    ).catch(console.error);
  }, [chainId, library]);

  return result;
};
