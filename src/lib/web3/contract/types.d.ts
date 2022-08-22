import { Waitable, CollectionOf } from '@elacity-js/lib';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { BigNumberish } from '@ethersproject/bignumber';
import { ContractReceipt } from '@ethersproject/contracts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ContractABI = any;

/**
 * We will configure a contract like this object
 * so that all contract will be a couple of (abi, address)
 */
export interface ContractDefs {
  abi: ContractABI;
  address: string;
}

/**
 * The library we will pick our contract
 */
export type AbiLibraryMap = Record<string | number, ContractDefs>;

export interface WriteOptions {
  from: string;
  gasPrice: BigNumberish;
  gas?: number;
  value: string;
  abiData?: ContractABI;
}

/**
 * Functional web3 contract
 */
export interface IWeb3Contract {
  ready: boolean;

  _web3: Web3Provider | JsonRpcProvider;
}

/**
 * Supporting chains over ETH blockchain
 */
export interface INetworkSupport {
  chainId: number | string;
}

export namespace IContract {
  /**
   * Definition of a standard ERC-721 contract type
   * see https://eips.ethereum.org/EIPS/eip-721
   */
  export interface Erc721<T = void> extends IWeb3Contract, INetworkSupport {
    /**
     * Get information about a token identified by its id
     *
     * @param tokenId
     */
    getAssetByTokenId(tokenId: string | BigNumberish): Promise<T>;

    /**
     * Retrieve list of assets a token holder owns
     *
     * @param owner
     * @param offset
     * @param limit
     */
    getOwnerAssets(owner: string, offset?: number, limit?: number): Waitable<CollectionOf<T>>;

    /**
     * Get the number of assets a token holder owns
     *
     * @param owner
     */
    getOwnerAssetsCount(owner: string): Promise<number>;

    /**
     * Get all the assets over handled in the contract
     */
    getAssets(offset?: number, limit?: number): Waitable<CollectionOf<T>>;

    /**
     * Get the number of assets handled in a contract
     */
    getAssetsCount(): Promise<number>;
  }

  /**
   * Definition of a ERC-20 token contract type
   * see: https://eips.ethereum.org/EIPS/eip-20
   */
  export interface Erc20 extends IWeb3Contract, INetworkSupport {
    /**
     * Authorize a 3rd party to spend some token on behalf (*)
     *
     * @param spender
     * @param amount
     */
    approve(spender: string, amount: BigNumberish): Promise<boolean>;

    /**
     * Retrieve the remaining balance of a given address
     *
     * @param owner
     */
    balanceOf(owner: string): Promise<BigNumberish>;

    /**
     * Transfer amount of token to another address (*)
     *
     * @param address
     * @param amount
     */
    transfer(address: string, amount: number): Promise<boolean>;

    // /**
    //  * Transfer an amount of token from an address to another one
    //  * It will be used especially by contract executing a withdrawal operation
    //  *
    //  * @param from
    //  * @param to
    //  * @param amount
    //  */
    // transferFrom(from: string, to: string, amount: number): Promise<boolean>;
  }

  /**
   * Wrapped ERC20 interface
   */
  export interface WrappedErc20 extends Erc20 {
    /**
     * Make a deposit transaction
     * @param amount
     */
    deposit(amount: number): Promise<ContractReceipt>;

    /**
     * Make a withdrawal transaction
     * @param amount
     */
    withdraw(amount: number): Promise<ContractReceipt>;
  }
}
