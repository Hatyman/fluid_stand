import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { WebSocketsClient } from 'services/ws/WebSocketsClient';

type WebSocketsContextType = {
  client: WebSocketsClient;
};

type OwnProps = {};

const WebSocketsContext = createContext<WebSocketsContextType | undefined>(undefined);

export const WebSocketsProvider: FC<PropsWithChildren<OwnProps>> = function WebSocketsProvider(
  props
) {
  // todo: add sessionId load
  const url = 'test';
  const state = useMemo<WebSocketsContextType>(
    () => ({
      client: new WebSocketsClient(url),
    }),
    []
  );

  return <WebSocketsContext.Provider value={state}>{props.children}</WebSocketsContext.Provider>;
};

export function useWsClient(): WebSocketsClient {
  const context = useContext(WebSocketsContext);
  if (context === undefined) {
    throw new Error('useWsClient must be used within a WebSocketsProvider');
  }
  return context.client;
}
