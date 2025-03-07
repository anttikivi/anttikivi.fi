import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fi"],
  defaultLocale: "fi",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
  },
});
