import { createTheme } from '@material-ui/core/styles';
import { ZIndex } from '@material-ui/core/styles/zIndex';
import { ThemeOptions } from '@material-ui/core/styles/createTheme';

declare module '@material-ui/core/styles/zIndex' {
  interface ZIndex {
    negative: number;
  }
}

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    zIndex: ZIndex;
  }

  interface ThemeOptions {
    custom?: any;
  }
}

export const createLemonadeTheme = (options: ThemeOptions = {}) => {
  return createTheme(options);
};

const themeOptions = {
  colors: {
    primary: '#FFCC00',
    secondary: '#3A39BB',
    primaryText: '#636363',
    secondaryText: '#363636',
    metamask: '#1890FF',
    mainBackground: '#202020',
    bgButton: "linear-gradient(90deg, #61009D 0%, rgba(90, 231, 240, 0.64) 100%)",
  },
};

const defaultTheme = createLemonadeTheme({
  custom: themeOptions,
});

export { themeOptions };
export default defaultTheme;
