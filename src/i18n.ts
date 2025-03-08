import type { Locale } from "@/locales";
import en from "@/messages/en.json";
import fi from "@/messages/fi.json";

type Translations = typeof en;
type Namespace = keyof Translations;

const translations: Record<Locale, Translations> = {
  en,
  fi,
};

function getNestedValue(
  obj: (typeof translations)[Locale][Namespace],
  key: string,
) {
  const keys = key.split(".");
  let curr = obj;

  for (const k of keys as (keyof typeof curr)[]) {
    if (!Object.hasOwn(curr, k)) {
      return undefined;
    }

    if (typeof curr[k] === "string") {
      return curr[k];
    }

    curr = curr[k];
  }
}

export function useTranslations<N extends Namespace>(ns: N, lang: Locale) {
  const msgs = translations[lang][ns];

  type NS = typeof msgs;
  type PathsToKeys<T> = T extends string
    ? ""
    : {
        [K in keyof T]: K extends string
          ? T[K] extends string
            ? K
            : `${K}.${PathsToKeys<T[K]>}`
          : never;
      }[keyof T];

  type NSKey = keyof NS | PathsToKeys<NS>;

  return function t(key: NSKey | (string & {})): string {
    let value: string | undefined = undefined;

    if (typeof key === "string" && key.includes(".")) {
      value = getNestedValue(msgs, key);
    } else {
      value = msgs[key as keyof typeof msgs] as string;
    }

    return value ? value : `MISSING: ${key as string}`;
  };
}
