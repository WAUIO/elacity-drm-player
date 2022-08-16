import React from 'react';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getLibrary = (provider: any): Web3Provider => {
  const lib = new Web3Provider(provider);
  lib.pollingInterval = 12000;
  return lib;
};

const Web3ReactProviderReloaded = createWeb3ReactRoot('elacity');

interface Web3ProviderProps {}

const Web3AdapterProvider: React.FC<React.PropsWithChildren<Web3ProviderProps>> = ({
  children,
}: React.PropsWithChildren<Web3ProviderProps>) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ReactProviderReloaded getLibrary={getLibrary}>{children}</Web3ReactProviderReloaded>
  </Web3ReactProvider>
);

export default Web3AdapterProvider;
