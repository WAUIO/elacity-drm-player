import { BigNumberish } from '@ethersproject/bignumber';

export interface MediaTokenAsset {
  tokenURI: string;
  tokenId: BigNumberish;

  name?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  mediaURL?: string;
}
