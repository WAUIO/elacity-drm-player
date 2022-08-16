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

export interface ContractGenerator<T> {

  generateContractualObjects(input: T): Promise<any>;

}
