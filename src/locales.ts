const locales = ["en", "fi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fi";

export function resolveLocaleParam(locale?: string | number): Locale {
  if (!locale || !locales.includes(locale as Locale)) {
    return defaultLocale;
  }

  return locale as Locale;
}

export default locales;
