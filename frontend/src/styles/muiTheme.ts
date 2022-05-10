import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#80BF44',
    },
    secondary: {
      main: '#AEAFAF',
    },
    background: {
      default: '#fff',
    },
    error: {
      main: '#b0231e',
    },
    text: {
      primary: '#212121',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    mode: 'light',
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeightRegular: 'lighter',
  },
  components: {
    MuiStepConnector: {
      styleOverrides: {
        root: {
          top: '1.5rem',
          left: 'calc(-50% + 2.6rem)',
          right: 'calc(50% + 2.6rem)',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: {
          fill: '#fff',
        },
      },
    },
  },
});
