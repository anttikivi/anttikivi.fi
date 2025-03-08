const locales = ["en", "fi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fi";

export const languages: { locale: Locale; menuLabel: string }[] = [
  {
    locale: "en",
    menuLabel: "In English",
  },
  {
    locale: "fi",
    menuLabel: "Suomeksi",
  },
];

export default locales;
