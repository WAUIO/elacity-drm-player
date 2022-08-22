import { JsonRpcSigner } from '@ethersproject/providers';
import { Contract, ContractReceipt } from '@ethersproject/contracts';
import mediaTokenArtifact from './iface/MediaToken.json';

interface MediaMinterParam {
  provider: JsonRpcSigner;
  address: string;
}

export default class MediaMinter {
  protected provider: JsonRpcSigner;

  protected address: string;

  constructor({ provider, address }: MediaMinterParam) {
    this.provider = provider;
    this.address = address;
  }

  public async mint(beneficiary: string, tokenURI: string): Promise<ContractReceipt> {
    const contract = new Contract(this.address, mediaTokenArtifact.abi, this.provider);

    const tx = await contract.mint(beneficiary, tokenURI);

    return tx.wait();
  }
}
