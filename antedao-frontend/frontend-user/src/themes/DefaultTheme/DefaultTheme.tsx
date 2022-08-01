import { createTheme, ThemeOptions } from '@material-ui/core/styles';
import { ZIndex } from '@material-ui/core/styles/zIndex';

declare module '@material-ui/core/styles/zIndex' {
  interface ZIndex {
    negative: number;
  }
}

declare module '@material-ui/core/styles' {
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
    primary: '#6901FC',
    secondary: '#FD849C',
    tertiary: '#CA22C6',
    primaryText: '#636363',
    secondaryText: '#363636',
    textNavBar: '#FFFFFF4D',
    metamask: '#FF8F44',
    error: '#FF6838',
    success:"#58BD7D",
    warning:"#FFD166",
    mainBackground: '#202020',
    gradientMain:"linear-gradient(90deg, #FD849C 0%, #6901FC 100%)",
    gradientStep:"linear-gradient(90deg, #CA22C6 0%, #FD849C 100%)",
    gradientMainReverse:"linear-gradient(270deg, #FD849C 0%, #6901FC 100%)",
    gradientMainReverseColumn:"linear-gradient(360deg, #FD849C 0%, #6901FC 100%)",
    gradientMainProgressBar:"linear-gradient(90deg, #CA22C6 0%, #FD849C 100%)",
    darkGrey:"#777E90",
    grey5:"#B1B5C3",
    grey8:"#23262F",
    grey6:"#777E90",
    grey3:"#F4F5F6",
    grey7:"#353945",
    black: "#000",
    white: "#FFF",
    white02: "#FCFCFD",
    disable: "#171B22",
    greyBlue: "#424959",
    greyLight: "#919AAE",
    darkLight: "#1F242C",
    darkLightBg:"rgba(255, 255, 255, 0.03)",
    darkDeepBlack:"#1B1B1D",
    green: "#58BD7D",
    secondaryBg: "#24232F",
  },
  radius: {
    full: 99,
    small: 5,
    small4: 4,
    small8: 8,
    small12:12,
    medium: 20,
    medium24: 24,
    medium30:30,
  },
  typography: {
    fontFamilyDM: 'DMSans',
    fontFamilyWork: 'WorkSans',
  },
};

const defaultTheme = createLemonadeTheme({
  custom: themeOptions,
});

export { themeOptions };
export default defaultTheme;