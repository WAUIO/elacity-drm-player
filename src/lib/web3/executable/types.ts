import { BigNumberish } from '@ethersproject/bignumber';
import { ContractReceipt, Contract } from '@ethersproject/contracts';

export interface ITxArgumentBuilder {
  args(): BigNumberish[];
}

export interface ITxCallable {
  callee(): Contract;
  method: string;
}

export interface ITxExecutable {
  getValue: () => Promise<BigNumberish>;
  execute: (callable: ITxCallable, argumentBuilder: ITxArgumentBuilder) => Promise<ContractReceipt>;
}
