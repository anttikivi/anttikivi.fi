import type { Locale } from "@/locales";

type Routes = Record<Locale, { index: string }>;

const routes: Routes = {
  en: {
    index: "/",
  },
  fi: {
    index: "/",
  },
};

export default routes;
