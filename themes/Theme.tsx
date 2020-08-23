import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent: PaletteOptions['primary'];
    line: PaletteOptions['primary'];
    bigDipper: PaletteOptions['primary'];
  }
}
// Create a theme instance.
const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D86FF',
    },
    secondary: {
      main: '#66E39D',
    },
    accent: {
      light: '#FF93F2',
      main: '#FF53EB',
    },
    error: {
      main: red.A400,
    },
    info:{
      main: '#5BEBF2',
    },
    warning: {
      main: '#FFEB00',
    },
    success: {
      main: '#06C776',
    },
    background: {
      default: '#fff',
    },
    line: {
      main: 'e8e8e8',
    },
    bigDipper: {
      light: '#f54f4a',
      main: '#db001a'
    }
  },
  typography: {
    fontFamily: [
      'Arimo',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Hind Madurai',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      color: '#000',
    },
    h2: {
      color: '#000',
    },
    h3: {
      color: '#000',
      fontSize: '2.5rem'
    },
    h4: {
      fontSize: '1.875rem',
      color: '#000',
    },
    h5: {
      color: '#000'
    },
    body1: {
      color: '#292929',
    },
    body2: {
      color: '#777',
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto'
        },
        'th,td': {
          borderBottomColor: '#e8e8e8 !important'
        },
        '.MuiTableCell-sizeSmall':{
          padding: '0.75rem 1.5rem 0.74rem 0 !important'
        }
      },
    },
  },
});

export default Theme;
