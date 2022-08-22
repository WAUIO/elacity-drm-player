/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { sha256 } from 'js-sha256';
import {
  Waitable, Waiter, CollectionOf, promiseAllStepN,
} from '@elacity-js/lib';
import { BigNumberish, BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { ContractMissconfigurationError } from '../errors';
import { IContract, AbiLibraryMap } from './types.d';

export abstract class Erc721ContractType<T> implements IContract.Erc721<T> {
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
   * Abstraction oh the web3 library
  */
  _web3!: Web3Provider | JsonRpcProvider;

  constructor(chainId: number | string, _web3: Web3Provider | JsonRpcProvider, abiMap: AbiLibraryMap) {
    this.chainId = chainId;
    this._web3 = _web3;
    if (this.chainId && abiMap[this.chainId]) {
      this.ready = true;

      this._address = abiMap[this.chainId].address;

      this.cRead = new Contract(this._address as string, abiMap[this.chainId].abi, this._web3);
      this.cWrite = new Contract(this._address as string, abiMap[this.chainId].abi, this._web3.getSigner());
    }
  }

  /**
   * Format a string name to a contract readable value
   */
  protected asToken(name: string): string {
    return BigNumber.from(`0x${sha256(name)}`).toString();
  }

  /**
   * Format a value to HEX
   *
   * @param value
   * @param modifier
   * @returns
   */
  protected asHex(value: BigNumberish, modifier?: (n: number) => number): string {
    if (!modifier) {
      return `0x${parseInt(BigNumber.from(value).toString(), 10).toString(16)}`;
    }

    return `0x${modifier(parseInt(BigNumber.from(value).toString(), 10)).toString(16)}`;
  }

  /**
   * Safe execution of contract operation
   *
   * @param fn
   * @returns
  */
  protected _ensure<P>(fn: () => Promise<P>): Promise<P> {
    if (!this.ready) {
      return Promise.reject(new ContractMissconfigurationError(this._address));
    }

    return fn.call(this);
  }

  abstract getAssetByTokenId(tokenId: string | BigNumberish): Promise<T>;

  /**
   * Get the number of assets a token holder owns
   *
   * @param owner
   * @returns
   */
  async getOwnerAssetsCount(owner: string): Promise<number> {
    return this._ensure(
      async () => {
        const total: BigNumberish = await this.cRead.balanceOf(owner);

        return BigNumber.from(total).toNumber();
      }
    );
  }

  /**
   * List of owner assets hosted in onsaletrust smart contract
   *
   * @param owner
   * @param offset
   * @param limit
   * @returns
   */
  getOwnerAssets(owner: string, offset = 0, limit = Infinity): Waitable<CollectionOf<T>> {
    return new Waitable((w: Waiter<CollectionOf<T>>) => this._ensure(async () => {
      const totalNum: number = await this.getOwnerAssetsCount(owner);

      w.emit('count', totalNum);

      const result = {
        total: totalNum,
        offset,
        limit,
      };

      if (totalNum === 0) {
        w.emit('result', {
          ...result,
          items: [],
          isLast: true,
        });

        return {
          ...result,
          isLast: true,
          items: [],
        };
      }

      const assets = await promiseAllStepN<T>(
        10,
        new Array(totalNum)
          .fill(0)
          .map((_, index) => index)
          .slice(offset, offset + limit)
          .map((index: number) => async () => {
            // retrieve tokenId
            const tokenId: BigNumberish = await this.cRead.tokenOfOwnerByIndex(owner, index);

            // get sell info
            const asset = await this.getAssetByTokenId(tokenId);
            w.emit('data', { ...asset, index });

            return { ...asset, index };
          })
      );

      w.emit('result', {
        ...result,
        items: assets,
        isLast: totalNum === offset + assets.length,
      });

      return {
        ...result,
        items: assets,
        isLast: totalNum === offset + assets.length,
      };
    }));
  }

  /**
   * Retrieve assets by wrapping the result in a waitable flow
   * generally, the waiter should emit a bunch of events during retrieval flow
   * - `count` when the totl number of assets is known
   * - `data` on each asset retrieved
   * - `result` emitted when whole result is got
   * - `error` when an error ocurring
   *
   * @param offset
   * @param limit
   * @returns
   */
  getAssets(offset = 0, limit = Infinity): Waitable<CollectionOf<T>> {
    // @ts-ignore
    return new Waitable((w: Waiter<CollectionOf<T>>) => this._ensure(async () => {
      const totalNum: number = await this.getAssetsCount();

      w.emit('count', totalNum);

      const result = {
        total: totalNum,
        offset,
        limit,
      };

      if (totalNum === 0) {
        w.emit('result', {
          ...result,
          items: [],
          isLast: true,
        });

        return {
          ...result,
          isLast: true,
          items: [],
        };
      }

      const assets = await promiseAllStepN<T>(
        10,
        new Array(totalNum)
          .fill(0)
          .map((_, index) => index)
          .slice(offset, offset + limit)
          .map((index: number) => async () => {
            // retrieve tokenId
            const tokenId: BigNumberish = await this.cRead.tokenByIndex(index);

            // get sell info
            const asset = await this.getAssetByTokenId(tokenId);
            w.emit('data', { ...asset, index });

            return { ...asset, index };
          })
      );

      w.emit('result', {
        ...result,
        items: assets,
        isLast: totalNum === offset + assets.length,
      });

      return {
        ...result,
        items: assets,
        isLast: totalNum === offset + assets.length,
      };
    }));
  }

  /**
   * Get the number of assets overall the network
   *
   * @returns
   */
  async getAssetsCount(): Promise<number> {
    return this._ensure(
      async () => {
        const total: BigNumberish = await this.cRead.totalSupply();

        return BigNumber.from(total).toNumber();
      }
    );
  }
}
