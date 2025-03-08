import type { Locale } from "@/locales";
import locales, { defaultLocale } from "@/locales";
import { getRelativeLocaleUrl } from "astro:i18n";

type RoutesDef = {
  "data-protection": string;
  index: "/";
};

type Routes = Record<Locale, RoutesDef>;

const routes: Routes = {
  en: {
    "data-protection": "data-protection",
    index: "/",
  },
  fi: {
    "data-protection": "tietosuoja",
    index: "/",
  },
};

export function getRouteKey(path: string) {
  const original = path;

  if (path === "/") {
    return "index";
  }

  if (!path.startsWith("/")) {
    throw new Error(`path ${original} does not start with a slash`);
  }

  // For parsing, normalize the path to not have the trailing slash.
  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  const parts = path.split("/");

  if (parts.length <= 1) {
    throw new Error(`parts of path ${original} are too short for parsing`);
  }

  if (parts.length === 2 && locales.includes(parts[1] as Locale)) {
    return "index";
  }

  const pathLocale = locales.includes(parts[1] as Locale)
    ? (parts[1] as Locale)
    : defaultLocale;
  let route = path.startsWith(`/${pathLocale}/`)
    ? path.slice(`/${pathLocale}/`.length)
    : path;
  route = route.startsWith("/") ? route.slice(1) : route;

  for (const [key, value] of Object.entries(routes[pathLocale])) {
    if (value === route) {
      return key;
    }
  }

  throw new Error(`no route key found for path ${original}`);
}

export function getRoute(locale: Locale, key: string) {
  const original = key;

  if (key === "/" || key === "") {
    return getRelativeLocaleUrl(locale, "/");
  }

  if (key.startsWith("/")) {
    key = key.slice(1);
  }

  if (Object.hasOwn(routes[locale], key)) {
    return getRelativeLocaleUrl(locale, routes[locale][key as keyof RoutesDef]);
  }

  throw new Error(`no route found for key ${original}`);
}

export default routes;
