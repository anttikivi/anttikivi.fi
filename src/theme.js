// Coypright (c) 2021 Antti Kivi
// Licensed under the MIT License

const colors = {
  blue: '#0a15c8',
  blueAlternative: '#a3a7ea',
  lightBlue: '#7bd3ff',
  lightBlueAlternative: '#def4ff',
  black: '#404040',
  white: '#ffffff',
  alternativeBlack: '#262c34',
};

export const COLORS = {
  background: {
    light: colors.white,
    dark: colors.alternativeBlack,
  },
  text: {
    light: colors.black,
    dark: colors.white,
  },
  // 'text-weak': {
  //   light: colors.shade,
  //   dark: colors.gray,
  // },
  'text-button': {
    light: colors.white,
    dark: colors.black,
  },
  // 'text-button-green': {
  //   light: colors.black,
  //   dark: colors.black,
  // },
  link: {
    light: colors.blue,
    dark: colors.lightBlue,
  },
  'link-hover': {
    light: colors.blueAlternative,
    dark: colors.lightBlueAlternative,
  },
  // 'button-green': {
  //   light: colors.buttonGreen,
  //   dark: colors.buttonGreen,
  // },
  // 'button-green-hover': {
  //   light: colors.buttonGreenDark,
  //   dark: colors.buttonGreenDark,
  // },
  primary: {
    light: colors.blue,
    dark: colors.lightBlue,
  },
  // secondary: {
  //   light: colors.peach,
  //   dark: colors.cream,
  // },
};

const fonts = {
  heading: 'kepler-std-display, Times, "Times New Roman", serif',
  main: 'myriad-pro, "Helvetica Neue", Helvetica, Arial, sans-serif',
  code: 'courier-std, Menlo, Monaco, Consolas, "Courier New", monospace',
};

// The maximum sizes of different viewports.
const sizes = {
  mobileS: '20em', // 320px
  mobileM: '23.4375em', // 375px
  mobileL: '26.5625em', // 425px
  tablet: '48em', // 768px
  laptop: '64em', // 1024px
  laptopL: '90em', // 1440px
  fourK: '160em', // 2560px
};

const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  fourK: `(min-width: ${sizes.fourK})`,
};

const layout = {
  marginMobile: '2em',
  marginTablet: '4em',
  marginDesktop: '16em',
};

const borders = {
  commonRadius: '25px',
};

export default {
  fonts: { ...fonts },
  sizes: { ...sizes },
  devices: { ...devices },
  layout: { ...layout },
  borders: { ...borders },
};