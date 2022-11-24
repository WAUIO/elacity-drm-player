/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// @ts-ignore
const getLibrary = (provider: any): Web3Provider => {
  const lib = new Web3Provider(provider);
  lib.pollingInterval = 12000;
  return lib;
};

interface Web3ProviderProps {}

const Web3AdapterProvider: React.FC<React.PropsWithChildren<Web3ProviderProps>> = ({
  children,
}: React.PropsWithChildren<Web3ProviderProps>) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    {children}
  </Web3ReactProvider>
);

export default Web3AdapterProvider;
