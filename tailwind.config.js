import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    colors: {
      gray: {
        /**
         * The background colour for the site in light mode and text colour for
         * dark mode.
         */
        100: colors.stone["100"],
        /**
         * The background colour for the site in dark mode and text colour for
         * light mode.
         */
        900: colors.stone["900"],
      },
    },
    fontFamily: {
      sans: ['"Manrope"', ...defaultTheme.fontFamily.sans],
      serif: ['"Libre Baskerville"', ...defaultTheme.fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
