// Copyright (c) 2020 Antti Kivi
// Licensed under the MIT License

import pageSlugs from "../data/page-slugs.json";

export const createLanguageUrl = (baseUrl, pageKey) => {
  const slugs = pageSlugs;

  return locale => {
    let url = locale === "fi" ? "/" : `/${locale}`;

    if (pageKey in slugs && locale in slugs[pageKey]) {
      url = `/${locale}/${slugs[pageKey][locale]}`;

      if (locale === "fi") {
        url = `/${slugs[pageKey][locale]}`;
      }
    }

    return `${baseUrl}${url}`;
  };
};