/* eslint-disable @typescript-eslint/no-explicit-any */
export type RDFType = string;
export type XMLType = string;

// this is valable for only CEL
export interface MediaContractObject {
  contractId: string;
  textVersion?: string;
  metadata?: any;
  party?: {id: string; part: {name: string; details?: string;}}[];
  body?: {
    operativePart: any[];
    type: string[];
  }
}

export interface IDeonticSpecification {
  uri: string;
  receiver: string;
}

export interface IObjectSpecification {
  uri: string;
  receiver: string;
}

export interface ISmartContractSpecification {
  identifier: string;
  parties: Record<string, string>;
  deontics: Record<string, IDeonticSpecification>;
  objects: Record<string, IObjectSpecification>;
  incomePercentage?: Record<string, Record<string, number>>;
  contentURI?: string;
  hash?: string;
}

export interface ContractGenerator<T> {
  generateContractualObjects(input: T): Promise<any>;
  generateContractSpecification?(input: T): Promise<ISmartContractSpecification>;
}
