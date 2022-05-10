import React, { Suspense } from 'react';
import './App.module.sass';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/muiTheme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRouter } from 'navigation/AppRouter';

// QueryFactory.setAxiosFactory(() => axios);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
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
