/* eslint-disable max-len */
import { formatEther } from '@ethersproject/units';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract, Overrides } from '@ethersproject/contracts';

export const displayAddress = (addr: string, start?: number, end?: number): string => `${addr?.substring(0, start || 6)}...${addr?.substring(addr.length - (end || 4))}`;

export const ethFormat = (value: BigNumberish, prec?: number, unit?: string) => `${unit || 'Ξ'} ${parseFloat(formatEther(value)).toPrecision(prec || 4)}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const calculateOverides = async (provider: JsonRpcProvider, contract: Contract, method: string, ...args: any): Promise<Overrides> => {
  const options: Overrides = {};

  const gasPrice = await provider.getGasPrice();
  options.gasPrice = gasPrice.mul(2);

  const estimate = await contract.estimateGas[method].apply(null, [...args, options]);
  // eslint-disable-next-line eqeqeq
  if (!estimate || estimate == 0) {
    options.gasLimit = BigNumber.from(100000)
      .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
      .div(BigNumber.from(10000));
  } else {
    options.gasLimit = BigNumber.from(estimate)
      .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
      .div(BigNumber.from(10000));
  }

  return options;
};
