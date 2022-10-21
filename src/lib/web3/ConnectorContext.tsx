/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import * as React from 'react';
import { isMobile, baseURL } from '@elacity-js/lib';
import { useAppSettings, AuthenticationProvider } from '@elacity-js/uikit';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import useErrorHandler from 'src/hooks/useErrorHandler';
import connectors, {
  Connector, NETWORKS, INetworkConfig, ConnectorName,
} from './connectors';
import { useEagerConnect, useInactiveListener } from './hooks';

const Image = styled('img')(({ theme }) => ({
  width: 180,
  margin: theme.spacing(4, 'auto', 1),
  [theme.breakpoints.down('sm')]: {
    width: 140,
    margin: theme.spacing(2, 'auto', 0),
  },
}));

interface EthereumProvider {
  isMetaMask?: boolean;
  chainId: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    elastos?: any;
  }
}

const DialogStates = {
  CONNECTOR_SELECTION: 0,
  NETWORK_SELECTION: 1,
};

interface PartialRedirectProps {
  // eslint-disable-next-line react/no-unused-prop-types
  redirectTo?: string;
}

export interface SelectDialogProps extends PartialRedirectProps {
  open: boolean;
  onClose: () => void;
}

const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  textAlign: 'center',
  // marginTop: theme.spacing(2),
  paddingTop: theme.spacing(0),
}));

const CreditWrapper = styled('span')({
  fontSize: 12,
});

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 360,
  margin: theme.spacing(0, 3, 1),
  paddingTop: theme.spacing(1),
}));

const NeedHelpLink = styled(Link)(({ theme }) => ({
  fontSize: '90%',
  color: theme.palette.getContrastText(theme.palette.background.paper),
}));

interface MetamaskSupport {
  supported: boolean;
  elastos?: boolean;
  chainId: number;
}

/**
 * To implement correct this selector we have some rules/concerns to consider
 *
 * M: Metamask
 * W: Walletconnect
 *
 * 1. M + W always available on desktop
 * 2. on mobile browser we should disable 1st level M and only allow W as nothing is injected on metamask
 * 3. on built-in browser and andoid, we should always use `injected` to automatic lookup
 * 4. on built-in browser and ios, only W should be available (similar situation to 2)
 *
 * @param props
 * @returns
 */
export function SelectDialog(props: SelectDialogProps) {
  const { handlerError } = useErrorHandler();
  const { setValues, links } = useAppSettings();
  const { onClose, open } = props;
  const { activate, library, chainId } = useWeb3React<Web3Provider>();
  const [currentStep, setCurrentStep] = React.useState<number>(DialogStates.CONNECTOR_SELECTION);
  const [mm, setSupport] = React.useState<MetamaskSupport | null>(null);

  React.useEffect(() => {
    // as the provider may be not available all the time on mobile, we need this side-effect implementation
    // see https://docs.metamask.io/guide/mobile-best-practices.html#the-provider-window-ethereum
    // also see https://github.com/MetaMask/detect-provider
    const handleEthereum = () => {
      const { ethereum, elastos } = window;
      setSupport({
        supported: Boolean(ethereum),
        elastos: Boolean(elastos),
        chainId: Number(ethereum?.chainId),
      });
    };

    window.addEventListener('ethereum#initialized', handleEthereum);

    const timer = setTimeout(handleEthereum, 3000);

    return () => {
      window.removeEventListener('ethereum#initialized', handleEthereum);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setCurrentStep(DialogStates.CONNECTOR_SELECTION);

    onClose();
  };

  const handleConnectorSelect = (c: Connector, selectedChainID?: number) => async () => {
    let activationError = null;
    let switchNetworkError = null;
    const validSelectedChain = typeof selectedChainID === 'number';
    if (typeof c?.networkSwitcher === 'function' && validSelectedChain && selectedChainID !== chainId) {
      await c.networkSwitcher(selectedChainID, library).catch((e) => {
        switchNetworkError = e;
      });
    }
    // Show error if network switch failed
    // It will not fail if we were able to add the selected network
    if (switchNetworkError !== null) {
      return handlerError(switchNetworkError);
    }

    // see https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#understanding-error-bubbling
    // for more details about error handling
    await activate(c.handler, undefined, true).catch((e) => {
      activationError = e;
    });

    // If there was an error not handled, we show the error here and not continue the switching / activation
    // as error has nothing to do with wrong network
    if (activationError !== null) {
      return handlerError(activationError);
    }

    if (c.onQuit) {
      // for only walletconnect method
      if (typeof c.handler.walletConnectProvider !== 'undefined') {
        c.handler.walletConnectProvider.on('disconnect', c.onQuit.bind(c.handler));
      } else {
        c.handler.on('disconnect', c.onQuit);
      }
    }

    if (c.onConnected) {
      await c.onConnected(c.handler);
    }

    // remember which connector has been lastly used
    // we retrieve this value in src/lib/web3/hooks:useEagerConnect
    setValues({ walletProvider: c.name });

    handleClose();
  };

  const handleClick = React.useCallback(
    (c: Connector, m: MetamaskSupport) => () => {
      // eslint-disable-next-line default-case
      switch (c.name) {
      case ConnectorName.Metamask:
        if (isMobile() && (m?.supported || m?.elastos)) {
          // only the EE built-in browser on android could reach this step, so we don't really have to
          // suggest selecting network instead we will automatically connect by using the injected provider
          return handleConnectorSelect(c, m.chainId).call(null);
        }

        return setCurrentStep(DialogStates.NETWORK_SELECTION);
      case ConnectorName.ElastosDID:
        if (isMobile() && (m?.supported || m?.elastos)) {
          // we will enforce to use metamask provider then bind it into EssentialConnect
          c.handler = connectors[1].handler;
          return handleConnectorSelect(c, m.chainId).call(null);
        }
      }

      // Else, just handle connection
      return handleConnectorSelect(c).call(null);
    },
    [mm]
  );

  const renderConnectionSelection = (m: MetamaskSupport) => (
    <>
      <DialogTitle>Connect your wallet</DialogTitle>
      <List sx={{ pt: 0 }}>
        {connectors.map((c: Connector) => (
          <ListItem
            button
            disabled={c.name === ConnectorName.WalletConnect && isMobile() && m?.supported}
            onClick={handleClick(c, m)}
            key={c.name}
          >
            <ListItemAvatar>
              <Avatar src={c.icon}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={c.name} />
          </ListItem>
        ))}
      </List>
    </>
  );

  const renderNetworkSelection = (connectorName: ConnectorName) => {
    const connectorConfig = connectors.filter((c) => c.name === connectorName);
    if (connectorConfig.length < 1) {
      return (
        <DialogTitle>
          Could not find connector for
          {connectorName}
        </DialogTitle>
      );
    }
    const connector = connectorConfig[0];

    return (
      <>
        <DialogTitle>Choose a network</DialogTitle>
        <List sx={{ pt: 0 }}>
          {Object.values(NETWORKS)
            .reverse()
            .map((c: INetworkConfig) => {
              const matchWithEnv =
                c.chainID === (process.env.REACT_APP_CHAIN_ID ? parseInt(process.env.REACT_APP_CHAIN_ID, 10) : 21);
              return (
                <ListItem
                  button
                  onClick={handleConnectorSelect(connector, c.chainID)}
                  key={c.name}
                  disabled={!matchWithEnv}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={connector.icon}
                      style={{ filter: !matchWithEnv ? 'grayscale(100%)' : 'grayscale(0%)' }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={c.name}
                    style={{ color: !matchWithEnv ? 'rgba(170, 170, 170, 0.8)' : 'inherit' }}
                  />
                </ListItem>
              );
            })}
        </List>
      </>
    );
  };

  const dialogBody = React.useMemo(() => {
    switch (currentStep) {
    case DialogStates.CONNECTOR_SELECTION:
      return renderConnectionSelection(mm);
    case DialogStates.NETWORK_SELECTION:
      // This will only render for Metamask selection for now
      return renderNetworkSelection(ConnectorName.Metamask);
    default:
      return <DialogTitle>Unhandled dialog step</DialogTitle>;
    }
  }, [currentStep, mm]);

  React.useEffect(() => {
    if (open) {
      // on load, check if we are on mobile
      // @deprecated
      // since DID implementation, we need to allow user to choose between at least 2 options
      // if (isMobile()) {
      //   // we also need to verify if injected is present
      //   if (!mm?.supported && !mm?.elastos) {
      //     // no injected provider -> automatically go to walletconnect options
      //     setCurrentStep(DialogStates.CONNECTOR_SELECTION);
      //     handleConnectorSelect(connectors[1]).call(null);
      //   }
      // }
    }
  }, [open]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="sm">
      <DialogContent>
        <Box sx={{ mt: 0, mx: 'auto' }}>
          <Image alt="Swap Station" src={baseURL('/static/elacity/waving.png')} />
        </Box>
        {dialogBody}
        <Box sx={{ borderTop: '1px solid #a4a4a4', pt: 2 }}>
          <NeedHelpLink href={links.documentation} target="_blank" rel="noreferrer" underline="none">
            Need help?
          </NeedHelpLink>
        </Box>
        {process.env.REACT_APP_VERSION && (
          <CreditWrapper>
            &copy; Elacity version
            {` ${process.env.REACT_APP_VERSION}`}
          </CreditWrapper>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Connector context
 * @param param0
 * @returns
 */
type HandleFunc<T extends HTMLElement> = (e?: React.MouseEvent<T>) => void;

interface ConnectorContextValue<T extends HTMLElement> {
  open: boolean;
  promptConnector?: () => void;
  wrapInConnector?: (fn: HandleFunc<T>) => HandleFunc<T>;
  handleClose?: () => void;
}

const ConnectorContext = React.createContext<ConnectorContextValue<HTMLElement>>({
  open: false,
});

interface ConnectorProviderProps extends PartialRedirectProps {}

export const ConnectorProvider = ({ children, redirectTo }: React.PropsWithChildren<ConnectorProviderProps>) => {
  const [open, setOpen] = React.useState(false);
  const { account, active, deactivate } = useWeb3React();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const { tried, ready } = useEagerConnect();
  useInactiveListener(!tried);

  const handleOpen: HandleFunc<HTMLElement> = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const wrapInConnector = React.useCallback(
    (fn: HandleFunc<HTMLElement>) => {
      if (!account) {
        return handleOpen;
      }

      return fn;
    },
    [account]
  );

  return (
    <ConnectorContext.Provider
      value={{
        open,
        handleClose,
        promptConnector: handleOpen,
        wrapInConnector,
      }}
    >
      <AuthenticationProvider connector={{
        // @todo: review these function for a better handling
        // of the process and to persist data got during the process
        connect: async () => handleOpen(),
        disconnect: async () => deactivate(),
        isAuthenticated: active && account?.length > 0,
        // @todo: load profile from somewhere (localstorage for eg after storing all data during connection)
        profile: {
          alias: 'A',
          address: account,
          image: '/static/elacity/elanaut-icon.png',
        },
      }}
      >
        {children}
        <SelectDialog open={open} onClose={handleClose} redirectTo={redirectTo} />
      </AuthenticationProvider>
    </ConnectorContext.Provider>
  );
};

export const useConnector = () => React.useContext(ConnectorContext);
