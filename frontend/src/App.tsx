import React, { Suspense } from 'react';
import './App.module.sass';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/muiTheme';
import { AppRouter } from 'navigation/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { setAxiosFactory, setBaseUrl } from './services/api/axios-client';

setBaseUrl('http://192.168.43.213:64345');
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
          <Suspense>
            <AppRouter />
          </Suspense>
        </QueryClientProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
