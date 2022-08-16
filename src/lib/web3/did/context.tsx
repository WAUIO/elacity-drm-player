/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable max-len */
import React from 'react';
import { JsonLocalStorage, uid } from '@elacity-js/lib';
import { useAppSettings } from '@elacity-js/uikit';
import { DID_STORAGE_KEY } from './constants';
import { DIDBroadcastMessageType, DIDBroadcastMessage } from './types';
import { ConnectorName } from '../connectors';

export interface DIDContextValue {
  isConnectedWithDID: () => boolean;
  syncChannel: BroadcastChannel;
  did?: string;
  sessionId: string;
  setDIDValue?: (did: string) => void;
}

export const DIDContext = React.createContext<DIDContextValue>({
  syncChannel: new BroadcastChannel('xxx'),
  sessionId: '',
  isConnectedWithDID: () => false,
});

interface DIDProviderProps {}

export const DIDProvider: React.FC<React.PropsWithChildren<DIDProviderProps>> = ({
  children,
}: React.PropsWithChildren<DIDProviderProps>) => {
  const storage = new JsonLocalStorage(DID_STORAGE_KEY);
  const syncChannel = new BroadcastChannel(DID_STORAGE_KEY);
  const [sessionId, setSessionId] = React.useState(uid());

  const { values } = useAppSettings();

  const [did, setDIDValue] = React.useState<string>(storage.get('did') || null);

  // listen to changes notification from popup (VerificationCallbackProxy)
  React.useEffect(() => {
    const messageHandler = (event: MessageEvent<DIDBroadcastMessage<null>>) => {
      switch (event.data?.type) {
      case DIDBroadcastMessageType.STORAGE_UPDATE:
        console.log('[DIDContext] received storage update', event.data);
        // enforce components update
        // storage.hydrate();
        // setSessionId(uid());
        window.location.reload();
        break;
      default:
        console.warn('event caught, no handler for type', event.data);
        break;
      }
    };

    syncChannel.addEventListener('message', messageHandler);

    return () => {
      syncChannel.removeEventListener('message', messageHandler);
    };
  }, []);

  const isConnectedWithDID = React.useCallback(
    () => did && values.walletProvider === ConnectorName.ElastosDID,
    [values.walletProvider, did]
  );

  return (
    <DIDContext.Provider
      value={{
        did,
        sessionId,
        syncChannel,
        setDIDValue,
        isConnectedWithDID,
      }}
    >
      {children}
    </DIDContext.Provider>
  );
};

export default DIDContext;
