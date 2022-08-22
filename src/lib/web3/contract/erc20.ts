/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { parseUnits } from '@ethersproject/units';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import {
  Contract, ContractReceipt, ContractTransaction, Overrides,
} from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { ContractMissconfigurationError } from '../errors';
import { calculateOverides } from '../utils';
import { IContract, ContractABI } from './types.d';

export const commonErc20Abi = [
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const wrappedTokenAbi = [
  {
    constant: false,
    inputs: [
      {
        name: 'wad',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
];

export class Erc20ContractType implements IContract.Erc20 {
  /**
   * Contract address
   */
  protected readonly _address!: string;

  /**
   * Abstraction of the contract object for read only operation
   */
  protected cRead!: Contract;

  /**
   * Abstraction of the contract object for read only operation
   */
  protected cWrite!: Contract;

  /**
   * Determine wether the contract is ready for use
   */
  readonly ready: boolean = false;

  /**
   * The network we are working on
  */
  public chainId: number | string;

  /**
   * the number of decimals, this value should be loaded during _ensure method
   */
  protected decimals: number;

  /**
   * Abstraction oh the web3 library
  */
  _web3!: JsonRpcProvider;

  constructor(tokenAddress: string, _web3: JsonRpcProvider, abi?: ContractABI) {
    this.chainId = _web3?.network?.chainId;
    this._address = tokenAddress;
    this._web3 = _web3;

    this.cRead = new Contract(this._address as string, [...commonErc20Abi, ...(abi || [])], this._web3);
    this.cWrite = new Contract(this._address as string, [...commonErc20Abi, ...(abi || [])], this._web3?.getSigner());

    this.ready = Boolean(this._web3);
  }

  async load(): Promise<{symbol: string; decimals: number}> {
    const [symbol, decimals] = await Promise.all<string | number>([
      new Promise((r) => {
        this._ensure(
          async () => {
            const result: string = await this.cRead.symbol();

            r(result);
          }
        );
      }),
      new Promise((r) => {
        this._ensure(
          async () => {
            const result: BigNumberish = await this.cRead.decimals();

            r(BigNumber.from(result).toNumber());
          }
        );
      }),
    ]);

    return { symbol: symbol as string, decimals: decimals as number };
  }

  getSigner(): Contract {
    return this.cWrite;
  }

  contract(): Contract {
    return this.cRead;
  }

  /**
   * Safe execution of contract operation
   *
   * @param fn
   * @returns
  */
  protected async _ensure<P>(fn: () => Promise<P>): Promise<P> {
    if (!this.ready) {
      return Promise.reject(new ContractMissconfigurationError(this._address));
    }

    const decimals: BigNumberish = await this.cRead.decimals();
    this.decimals = BigNumber.from(decimals).toNumber();

    return fn.call(this);
  }

  approve(spender: string, amount: BigNumberish): Promise<boolean> {
    return this._ensure(
      async () => {
        const options: Overrides = await calculateOverides(
          this._web3,
          this.cWrite,
          'approve',
          spender,
          amount
        );

        const tx: ContractTransaction = await this.cWrite.approve(
          spender,
          amount,
          options
        );
        const receipt = await tx.wait();

        return receipt.status === 1;
      }
    );
  }

  ensureAllowance(owner: string, spender: string, amount: number): Promise<boolean> {
    return this._ensure(
      async () => {
        console.log(`Ensuring to allow ${spender} to spend ${amount}`, { owner });
        // check allowance
        const allowance: BigNumber = await this.cRead.allowance(
          owner, spender
        );

        // if exceeded, just return true
        // otherwise we should ask approval
        // if (amount <= parseFloat(formatEther(allowance))) {
        // if (allowance.gte(parseUnits(amount.toString(), this.decimals))) {
        //   return true;
        // }

        const total = parseUnits(amount.toString(), this.decimals).add(allowance);
        const balance = await this.balanceOf(owner);
        if (total.gt(balance)) {
          // approve all the balance
          return this.approve(
            spender,
            balance
          );
        }

        return this.approve(
          spender,
          total
        );
      }
    );
  }

  balanceOf(owner: string): Promise<BigNumberish> {
    return this._ensure(
      async () => {
        const amount: BigNumberish = await this.cRead.balanceOf(owner);

        return amount;
      }
    );
  }

  transfer(to: string, amount: number): Promise<boolean> {
    return this._ensure(
      async () => {
        const tx: ContractTransaction = await this.cWrite.transfer(to, parseUnits(amount.toString(), this.decimals));

        await tx.wait();

        return true;
      }
    );
  }
}

export class WrappedErc20Contract extends Erc20ContractType implements IContract.WrappedErc20 {
  constructor(tokenAddress: string, _web3: JsonRpcProvider) {
    super(tokenAddress, _web3, [...commonErc20Abi, ...wrappedTokenAbi]);
  }

  /**
   * swap to wrapped token using human readable amount
   *
   * @param amount
   * @returns
   */
  deposit(amount: number): Promise<ContractReceipt> {
    return this._ensure(
      async () => {
        const tx: ContractTransaction = await this.cWrite.deposit({
          value: parseUnits(amount.toString(), this.decimals).toHexString(),
        });

        return tx.wait();
      }
    );
  }

  /**
   * swap from wrapped token using human readable amount
   *
   * @param amount
   * @returns
   */
  withdraw(amount: number): Promise<ContractReceipt> {
    return this._ensure(
      async () => {
        const tx: ContractTransaction = await this.cWrite.withdraw(
          parseUnits(amount.toString(), this.decimals).toHexString()
        );

        return tx.wait();
      }
    );
  }
}
