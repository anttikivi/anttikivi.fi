import typographyPlugin from "@tailwindcss/typography";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./hugo_stats.json"],
  theme: {
    colors: {
      current: "currentColor",
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
      red: {
        /**
         * Weak text colour for dark mode.
         */
        100: colors.rose["100"],
        /**
         * The colour for links on hover in dark mode.
         */
        400: colors.rose["400"],
        /**
         * The colour for links on hover in light mode.
         */
        700: colors.rose["700"],
        /**
         * Weak text colour for light mode.
         */
        950: colors.rose["950"],
      },
    },
    fontFamily: {
      sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
      serif: ['"Libre Baskerville"', ...defaultTheme.fontFamily.serif],
      display: ['"Manrope"', ...defaultTheme.fontFamily.sans],
      mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.gray.900"),
            "--tw-prose-headings": theme("colors.gray.900"),
            "--tw-prose-lead": theme("colors.gray.900"),
            "--tw-prose-links": theme("colors.gray.900"),
            "--tw-prose-bold": theme("colors.gray.900"),
            "--tw-prose-counters": theme("colors.gray.900"),
            "--tw-prose-bullets": theme("colors.gray.900"),
            "--tw-prose-hr": theme("colors.gray.900"),
            "--tw-prose-quotes": theme("colors.gray.900"),
            "--tw-prose-quote-borders": theme("colors.gray.900"),
            "--tw-prose-captions": theme("colors.gray.900"),
            "--tw-prose-code": theme("colors.gray.900"),
            "--tw-prose-pre-code": theme("colors.gray.900"),
            "--tw-prose-pre-bg": theme("colors.gray.900"),
            "--tw-prose-th-borders": theme("colors.gray.900"),
            "--tw-prose-td-borders": theme("colors.gray.900"),

            "--tw-prose-invert-body": theme("colors.gray.100"),
            "--tw-prose-invert-headings": theme("colors.gray.100"),
            "--tw-prose-invert-lead": theme("colors.gray.100"),
            "--tw-prose-invert-links": theme("colors.gray.100"),
            "--tw-prose-invert-bold": theme("colors.gray.100"),
            "--tw-prose-invert-counters": theme("colors.gray.100"),
            "--tw-prose-invert-bullets": theme("colors.gray.100"),
            "--tw-prose-invert-hr": theme("colors.gray.100"),
            "--tw-prose-invert-quotes": theme("colors.gray.100"),
            "--tw-prose-invert-quote-borders": theme("colors.gray.100"),
            "--tw-prose-invert-captions": theme("colors.gray.100"),
            "--tw-prose-invert-code": theme("colors.gray.100"),
            "--tw-prose-invert-pre-code": theme("colors.gray.100"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.gray.100"),
            "--tw-prose-invert-td-borders": theme("colors.gray.100"),
          },
        },
      }),
    },
  },
  plugins: [typographyPlugin],
};
