import { createMuiTheme } from '@material-ui/core/styles';

export const defaultDark = createMuiTheme({
  palette: {
    type: 'dark',
    background: { default: 'black' }
  }
});

export const defaultLight = createMuiTheme({
  palette: {
    type: 'light'
  }
});

// Themes derived from https://bootswatch.com/
export const darklyTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#375a7f' },
    secondary: { main: '#444' },
    error: { main: '#E74C3C' },
    background: { default: 'black' }
  }
});

export const superheroTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#DF691A' },
    secondary: { main: '#4E5D6C' },
    error: { main: '#d9534f' },
    background: { default: '#2B3E50' }
  }
});

export const theme = darklyTheme;

export default theme;

//
// Palette Type:
//
// primary?: PaletteColorOptions;
// secondary?: PaletteColorOptions;
// error?: PaletteColorOptions;
// type?: PaletteType;
// tonalOffset?: number;
// contrastThreshold?: number;
// common?: Partial<CommonColors>;
// grey?: ColorPartial;
// text?: Partial<TypeText>;
// divider?: string;
// action?: Partial<TypeAction>;
// background?: Partial<TypeBackground>;
// getContrastText?: (background: string) => string;
