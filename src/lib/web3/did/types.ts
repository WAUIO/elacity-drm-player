import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';

type CredentialsDataType = 'elastoshive'

interface Credentials {
  name: string;
  description?: string;
  avatar: {
    'content-type': string;
    data: string;
    base64?: string;
    type: CredentialsDataType;
  };
}

// in database
export interface DIdentity {
  address?: string;
  did: string;
  credentials?: Credentials;
  level?: number;
  kycOk?: boolean;
  socials?: Partial<Record<string, VerifiableCredential>>;
}

// in localstoarge
export interface DIDValues<Key extends string | number | symbol> {
  did: string;
  credentials: {
    name: string;
    description: string;
    avatar?: {
      base64?: string;
      data: string;
      type: string;
      'content-type': string;
    };
  };
  socials?: Partial<Record<Key, VerifiableCredential>>;
  kycOk?: boolean;
}

export enum DIDBroadcastMessageType {
  STORAGE_UPDATE = 'did.storage.update',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DIDBroadcastMessage<T extends any> {
  type: DIDBroadcastMessageType;
  data?: T;
}
