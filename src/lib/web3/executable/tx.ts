/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { ContractReceipt, Contract } from '@ethersproject/contracts';
import {
  ITxExecutable, ITxArgumentBuilder, ITxCallable,
} from './types';

export class TxExecutable implements ITxExecutable {
  // get value implementation
  async getValue() {
    return BigNumber.from('0');
  }

  /**
   * Estimate the gas limit adapted to the platform and the action to call
   *
   * @param value
   * @param minimal
   * @returns
   */
  protected _calculateGasMargin(value: BigNumberish, minimal?: number): BigNumberish {
    // eslint-disable-next-line
    return (value == 0 ? BigNumber.from(minimal || 21000) : BigNumber.from(value))
      .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
      .div(BigNumber.from(10000));
  }

  /**
   * Execute a transaction
   *
   * @param callable
   * @param argumentBuilder
   * @returns
   */
  public async execute(callable: ITxCallable, argumentBuilder: ITxArgumentBuilder): Promise<ContractReceipt> {
    // prepare contract
    const contract: Contract = callable.callee();

    // setup option and estimate gas
    const options: any = {
      gasPrice: await contract.provider.getGasPrice(),
    };

    if (this.getValue) {
      const value = await this.getValue();
      if (value.gt(0)) {
        options.value = (await this.getValue()).mul(1);
      }
    }

    const gasEstimate = await contract.estimateGas[callable.method](...argumentBuilder.args(), options);
    options.gasLimit = this._calculateGasMargin(gasEstimate, 100000);

    return contract[callable.method](...argumentBuilder.args(), options);
  }
}
