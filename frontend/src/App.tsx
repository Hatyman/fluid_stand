import React, { Suspense } from 'react';
import './App.module.sass';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/muiTheme';
import { AppRouter } from 'navigation/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import {
  setAxiosFactory,
  setBaseUrl,
  Telemetry,
  TelemetryClient,
} from './services/api/axios-client';
import { isDev } from 'utils/constants';
import { WebSocketsProvider } from 'services/ws/WebSocketsContext';

setBaseUrl(`${isDev ? 'http://192.168.101.46:40001' : ''}/api`);
setAxiosFactory(() => axios);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: false,
      suspense: false,
    },
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst={true}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <WebSocketsProvider>
            <Suspense>
              <AppRouter />
            </Suspense>
          </WebSocketsProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
