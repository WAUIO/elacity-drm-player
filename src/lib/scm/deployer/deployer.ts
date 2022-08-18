/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable class-methods-use-this */
import {
  Contract, ContractTransaction, ContractFactory,
} from '@ethersproject/contracts';
import { BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcSigner, TransactionReceipt } from '@ethersproject/providers';
import { ISCMDeployerOptions, IDeployer } from './types';
import { ISmartContractSpecification } from '../common/types';
import issuerTokenArtifact from './iface/NFToken.json';
import contractArtifact from './iface/Contract.json';

const ascii2Hex = (asciiString: string): string => {
  let hex = '';
  let tempASCII: number;
  let tempHex: string;
  asciiString.split('').forEach((i) => {
    tempASCII = i.charCodeAt(0);
    tempHex = tempASCII.toString(16);
    hex = `${hex + tempHex}`;
  });
  hex = hex.trim();

  return `0x${hex}`;
};

export default class SmartContractMediaDeployer implements IDeployer {
  protected issuer: string;

  protected account: string;

  protected provider: JsonRpcSigner;

  protected issuerToken: Contract;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected tokenURIHasher: (metadata: string) => Promise<string>;

  constructor({ issuer, provider, tokenURIHasher, account }: ISCMDeployerOptions) {
    this.account = account;
    this.issuer = issuer;
    this.provider = provider;
    if (tokenURIHasher) {
      this.tokenURIHasher = tokenURIHasher;
    } else {
      this.tokenURIHasher = (m) => Promise.resolve(m?.toString());
    }

    this.issuerToken = new Contract(issuer, issuerTokenArtifact.abi, provider);
  }

  async deploy(payload: ISmartContractSpecification): Promise<TransactionReceipt> {
    console.log('Deploying contract', payload, this);

    // issue token for each deontic
    const deonticsIds = [];
    for (const deonticValue of Object.values(payload.deontics)) {
      deonticsIds.push(
        await this.issueToken(payload.parties[deonticValue.receiver], deonticValue.uri)
      );
    }

    // issue token for each object type
    const objectsIds = [];
    if (payload.objects !== undefined) {
      for (const objectValue of Object.values(payload.objects)) {
        objectsIds.push(
          await this.issueToken(
            objectValue.receiver !== undefined
              ? payload.parties[objectValue.receiver]
              : this.account,
            objectValue.uri
          )
        );
      }
    }

    // setup royalty distribution
    const incomeBeneficiariesList = [];
    const incomePercentagesList = [];
    const actors = Object.keys(payload.incomePercentage);
    for (let i = 0; i < actors.length; i++) {
      incomeBeneficiariesList.push(payload.parties[actors[i]]);
      const beneficiaries = Object.keys(
        payload.incomePercentage[actors[i]]
      );
      incomePercentagesList.push(beneficiaries.length);
      for (let j = 0; j < beneficiaries.length; j++) {
        incomeBeneficiariesList.push(payload.parties[beneficiaries[j]]);
        incomePercentagesList.push(
          payload.incomePercentage[actors[i]][beneficiaries[j]]
        );
      }
    }

    // prepare contract deployment
    const contentHash = await this.tokenURIHasher(payload.contentURI);
    payload.contentURI = contentHash;
    payload.hash = contentHash;

    const contractArgs = [
      ascii2Hex('identifier'),
      Object.values(payload.parties),
      this.issuer,
      deonticsIds,
      objectsIds,
      [], // TODO contract relations
      [], // TODO contract relations
      incomeBeneficiariesList,
      incomePercentagesList,
      payload.contentURI,
      ascii2Hex(payload.hash),
    ];

    console.log(contractArgs);

    const factory = new ContractFactory(contractArtifact.abi, contractArtifact.bytecode, this.provider);
    const contract = await factory.deploy(...contractArgs);

    console.log(`New contract deployed at ${contract.address}`, contract.deployTransaction.hash);

    return contract.deployTransaction.wait();
  }

  protected async issueToken(to: string, metadata: string): Promise<BigNumberish> {
    const tokenURI = await this.tokenURIHasher(metadata);
    const tx: ContractTransaction = await this.issuerToken.newToken(to, tokenURI);

    const receipt = await tx.wait();

    return receipt.events[0].args.tokenId;
  }
}
