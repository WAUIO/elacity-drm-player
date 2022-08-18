/* eslint-disable no-case-declarations */
import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useAppSettings } from '@elacity-js/uikit';
import useErrorHandler from 'src/hooks/useErrorHandler';
import Web3WalletconnectConnector from './did/addons/Web3WalletconnectConnector';
import { ensureDIDConnectionWith } from './did';
import {
  injected, walletconnect, essentialConnect, ConnectorName,
} from './connectors';

export function useEagerConnect() {
  const { key, handlerError, closeError } = useErrorHandler();
  const { activate, active } = useWeb3React<Web3Provider>();
  const { values } = useAppSettings();

  const [tried, setTried] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    console.log('[lib/web3.useEagerConnect] resuming connection...', [values.walletProvider]);
    // As we previously stored the walletProvider as user preference
    // we will retrieve it and connect the wallet accordingly
    // eslint-disable-next-line default-case
    switch (values.walletProvider as ConnectorName) {
    case ConnectorName.Metamask:
      injected
        .isAuthorized()
        .then((isAuthorized: boolean) => {
          setReady(true);
          if (isAuthorized) {
            activate(injected, undefined, true).catch((err: Error) => handlerError(err));
          }
        })
        .finally(() => {
          setTried(true);
        });
      break;
    case ConnectorName.WalletConnect:
      activate(walletconnect, undefined, true)
        .then(() => {
          setReady(true);
        })
        .catch((err: Error) => handlerError(err))
        .finally(() => {
          setTried(true);
        });
      break;
    case ConnectorName.ElastosDID:
      const concreteConnector = window?.elastos ? injected : essentialConnect;
      activate(concreteConnector, undefined, true)
        .then(() => {
          ensureDIDConnectionWith(concreteConnector as Web3WalletconnectConnector, {})
            .then(() => {
              setReady(true);
              console.log('[DID] Completed connection flow');
            })
            .catch((err: Error) => handlerError(err));
        })
        .catch((err: Error) => handlerError(err))
        .finally(() => {
          setTried(true);
        });

      break;
    default:
      console.warn('no connection to check', [values.walletProvider]);
      setReady(true);
      break;
    }
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }

    if (active && key) {
      closeError(key);
    }
  }, [tried, active]);

  return { tried, ready };
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();
  const { handlerError, scopedClose } = useErrorHandler();
  const { values } = useAppSettings();

  const checkActivation = () => activate(injected, undefined, true).then(scopedClose).catch(handlerError);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { ethereum } = window as any;
    if (ConnectorName.Metamask === values.walletProvider && ethereum && ethereum.on && !error && !suppress) {
      const handleConnect = () => {
        checkActivation();
      };
      const handleChainChanged = (chainId: string | number) => {
        console.log('Handling \'chainChanged\' event with payload', chainId);
        window.location.reload();
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          checkActivation();
        }
        window.location.reload();
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }

    return () => {};
  }, [active, error, suppress, activate]);
}

export const useAddresses = () => {
  const { chainId } = useWeb3React();

  return {
    ISSUER_TOKEN: chainId === 20
      ? process.env.REACT_APP_ISSUER_TOKEN_MAINNET
      : process.env.REACT_APP_ISSUER_TOKEN_TESTNET,
  };
};
