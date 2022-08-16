/* eslint-disable max-len */
import { uid, JsonLocalStorage } from '@elacity-js/lib';
import { connectivity, DID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { EssentialsConnector } from '@elastosfoundation/essentials-connector-client-browser';
import Web3WalletconnectConnector from './addons/Web3WalletconnectConnector';
import { APP_DID, DID_STORAGE_KEY } from './constants';

export const resolverURLs: Record<number, string> = {
  20: 'mainnet',
};

interface DIDConnectionOptions {
  init?: boolean;
  handleAccess?: (didAccess: DID.DIDAccess) => Promise<void>;
}

/**
 * This helper will ensure to connect the application via walletconnect
 * we use @wallectconnect/web3-provider as main provider
 *
 * @param connector
 * @returns
 */
export const ensureDIDConnectionWith = async (
  connector: Web3WalletconnectConnector,
  options?: DIDConnectionOptions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<[Record<string, any>?, Record<string, VerifiableCredential>?]> => {
  // init the library
  connectivity.setApplicationDID(APP_DID);
  const essentialsConnector = new EssentialsConnector();

  if (options.init && essentialsConnector.hasWalletConnectSession()) {
    // disconnect all previous session on init
    // await essentialsConnector.disconnectWalletConnect();
  }

  const concreteProvider = connector.walletConnectProvider || connectivity.getActiveConnector().getWeb3Provider();

  // handle disconnect
  if (connector?.walletConnectProvider) {
    connector.walletConnectProvider.on('disconnect', async () => {
      await essentialsConnector.disconnectWalletConnect();
      window.localStorage.removeItem('walletconnect');
      window.localStorage.removeItem('activeconnectorname');
      window.localStorage.removeItem(DID_STORAGE_KEY);

      // remove also .walletProvider from __ela_app_settings
      const settings = new JsonLocalStorage('__ela_app_settings');
      settings.delete('walletProvider');
    });
  }

  const availableConnectors = connectivity.getAvailableConnectors();
  if (availableConnectors.length > 0) {
    console.info('found an available connector', availableConnectors[0].name);
    await connectivity.setActiveConnector(availableConnectors[0].name);
    essentialsConnector.setWalletConnectProvider(concreteProvider);
  } else {
    await connectivity.registerConnector(essentialsConnector);
    essentialsConnector.setWalletConnectProvider(concreteProvider);
  }

  const storage = new JsonLocalStorage(DID_STORAGE_KEY, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue: { exists: false } as any,
    flush: !!options.init,
  });

  // request credentials and ask for usage approval
  const didAccess = new DID.DIDAccess();
  console.log({ didAccess }, concreteProvider.chainId);

  if (!options.init) {
    return [storage.toJSON()];
  }

  try {
    const presentation = await didAccess.requestCredentials({
      claims: [
        DID.simpleIdClaim('Access your name', 'name', true),
        DID.simpleIdClaim('Show your biography', 'description', false),
      ],
      nonce: uid(),
      realm: uid(),
    });

    if (presentation) {
      const credentials: Record<string, VerifiableCredential> = presentation.getCredentials().reduce(
        (result: Record<string, VerifiableCredential>, credential: VerifiableCredential) => ({
          ...result,
          [credential.getId().getFragment()]: credential,
        }), {}
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsonCredentials: Record<string, any> = presentation.getCredentials().reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: Record<string, any>, credential: VerifiableCredential) => ({
          ...result,
          [credential.getId().getFragment()]: credential.getSubject().getProperty(
            credential.getId().getFragment()
          ),
        }), {}
      );

      storage.set({
        exists: true,
        credentials: jsonCredentials,
        did: presentation.holder,
      });

      // enforce reload in order to digest new identity
      // this reload statement will ensure to call /api/account/did/link
      // in the login flow
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      return [jsonCredentials, credentials];
    }

    return [];
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
};
