import { ContractReceipt } from '@ethersproject/contracts';
import { JsonRpcSigner } from '@ethersproject/providers';
import { ISmartContractSpecification } from '../common/types';

export interface ISCMDeployerOptions {
  account: string;
  issuer: string;
  provider?: JsonRpcSigner;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenURIHasher?: (metadata: string) => Promise<string> ;
}

export interface IDeployer {
  deploy(payload: ISmartContractSpecification): Promise<ContractReceipt>
}
