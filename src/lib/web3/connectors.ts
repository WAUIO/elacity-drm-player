import { InjectedConnector } from '@web3-react/injected-connector';
import { NetworkConnector } from '@web3-react/network-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Web3Provider } from '@ethersproject/providers';
import { signingMethods } from '@walletconnect/utils';
import { baseURL, JsonLocalStorage } from '@elacity-js/lib';
import { Web3WalletconnectConnector, ensureDIDConnectionWith } from './did';

signingMethods.push('wallet_addEthereumChain', 'wallet_watchAsset', 'wallet_switchEthereumChain');

export const INFURA_ID = process.env.REACT_APP_INFURA_ID || 'b00193a4a5fa4b7da1d2336ea76a0614';
export const POLLING_INTERVAL = parseInt(process.env.REACT_APP_POLLING_INTERVAL || '12000', 10);

export interface INetworkConfig {
  name: string;
  symbol: string;
  chainID: number;
  rpcUrl: string;
  explorerUrl: string;
  decimals: number;
}

export interface INetworkCollection {
  [chainId: number]: INetworkConfig
}

export const NETWORKS: INetworkCollection = {
  20: {
    name: 'Elastos Smart Chain',
    symbol: 'ELA',
    chainID: 20,
    // rpcUrl: 'https://escrpc.elaphant.app',
    // rpcUrl: 'https://api.elastos.io/eth',
    rpcUrl: 'https://api.trinity-tech.io/esc',
    explorerUrl: 'https://eth.elastos.io',
    decimals: 18,
  },
  3: {
    name: 'Ropsten Test Network',
    symbol: 'ETH',
    chainID: 3,
    // rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    rpcUrl: 'https://ropsten.infura.io/v3/44a8e00e1b7d41889719cc14a97df9ca',
    explorerUrl: 'https://ropsten.etherscan.io',
    decimals: 18,
  },
};

export const getNetworkForChain = (chainId: number): INetworkConfig | null => {
  if (!NETWORKS[chainId]) {
    return null;
  }

  return NETWORKS[chainId];
};

const RPC_URLS: { [chainId: number]: string } = {
  3: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  // 20: 'https://escrpc.elaphant.app',
  // 20: 'https://api.elastos.io/eth',
  // 20: 'http://34.142.19.27:20638',
  20: 'https://api.trinity-tech.io/esc',
  21: 'https://rpc.elaeth.io',
};

export const network = new NetworkConnector({
  urls: { 3: RPC_URLS[3], 20: RPC_URLS[20] },
  defaultChainId: 1,
});

// Metamask needs this
export const injected = new InjectedConnector({
  supportedChainIds: [3, 20],
});

// Wallet Connect
export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [3, 20],
  rpc: { 3: RPC_URLS[3], 20: RPC_URLS[20] },
  // bridge: 'https://c.bridge.walletconnect.org',
  bridge: 'https://walletconnect.elastos.net/v2',
  qrcode: true,
  infuraId: INFURA_ID,
  qrcodeModalOptions: {
    mobileLinks: [
      'metamask',
      'essentials',
    ],
    desktopLinks: [
      'encrypted ink',
    ],
  },
});

// Elastos DID connector, essentials@wallectconnect
export const essentialConnect = new Web3WalletconnectConnector({
  supportedChainIds: [3, 20],
  rpc: { 3: RPC_URLS[3], 20: RPC_URLS[20] },
  // bridge: 'https://c.bridge.walletconnect.org',
  bridge: 'https://walletconnect.elastos.net/v2',
  qrcode: true,
  infuraId: INFURA_ID,
  qrcodeModalOptions: {
    mobileLinks: [
      'essentials',
    ],
    desktopLinks: [
      'encrypted ink',
    ],
  },
});

export enum ConnectorName {
  Metamask = 'Metamask',
  WalletConnect = 'WalletConnect',
  ElastosDID = 'Elastos DID',
}

export interface Connector {
  name: ConnectorName;
  // @todo: change 'any' to the appropriate type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;
  icon?: string;
  // Use this to auto switch network and add if not there yet
  networkSwitcher?: (chainId: number, library:Web3Provider) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConnected?: (connector: any) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onQuit?: (connector: any) => Promise<void>;
}

export async function switchNetwork(chainId: number, library?: Web3Provider): Promise<void> {
  const networkConfig = getNetworkForChain(chainId);
  if (networkConfig === null) {
    return Promise.reject(new Error(`Network config for chain ${chainId} is null`));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = library ? (library?.provider || null) : (window as any).ethereum;
  if (!provider) {
    return Promise.reject(new Error('No provider available, cannot continue'));
  }

  const chainIdHExStr = `0x${(chainId).toString(16)}`;

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHExStr }],
    });

    return Promise.resolve();
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        return provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainIdHExStr, // A 0x-prefixed hexadecimal string
              chainName: networkConfig.name,
              nativeCurrency: {
                name: networkConfig.symbol,
                symbol: networkConfig.symbol, // 2-6 characters long
                decimals: networkConfig.decimals,
              },
              rpcUrls: [networkConfig.rpcUrl],
              blockExplorerUrls: [networkConfig.explorerUrl],
              iconUrls: [], // Currently ignored.
            },
          ],
        });
      } catch (addError) {
        return Promise.reject(new Error(`Add network Error : ${addError.message}`));
      }
    }

    // eslint-disable-next-line max-len
    return Promise.reject(new Error(`Switch network Error : ${JSON.stringify(switchError.message)}, code=${switchError.code}`));
  }
}

export default [
  {
    name: ConnectorName.ElastosDID,
    handler: essentialConnect,
    icon: baseURL('/static/elacity/Elastos_logo_black.png'),
    onConnected: async (connector: Web3WalletconnectConnector) => {
      const [jsonCredentials, credentials] = await ensureDIDConnectionWith(connector, { init: true });
      console.log('joined successfully', { jsonCredentials, credentials });
    },
  },
  {
    name: ConnectorName.Metamask,
    handler: injected,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/240px-MetaMask_Fox.svg.png',
    networkSwitcher: switchNetwork,
  },
  {
    name: ConnectorName.WalletConnect,
    handler: walletconnect,
    // eslint-disable-next-line max-len
    icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/492d95c038bbcde1517cab5fb90ed4514690e919/png/square/walletconnect-square-white.png',
    // only available for Metamask
    // networkSwitcher: switchNetwork,
    onConnected: async (connector: WalletConnectConnector) => {
      connector?.walletConnectProvider?.on('disconnect', async () => {
        window.localStorage.removeItem('walletconnect');

        // remove also .walletProvider from __ela_app_settings
        const settings = new JsonLocalStorage('__ela_app_settings');
        settings.delete('walletProvider');
      });
    },
  },
] as Connector[];
