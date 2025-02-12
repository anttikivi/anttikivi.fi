import { EleventyI18nPlugin } from "@11ty/eleventy";
import Image, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import htmlMinifierTerser from "html-minifier-terser";
import path from "node:path";
import type UserConfig from "./node_modules/@11ty/eleventy/src/UserConfig.js";
import { processCSS } from "./utils/css.ts";
import { createFileHash } from "./utils/hash.ts";

type ImageData = {
  format: string;
  width: number;
  height: number;
  url: string;
  sourceType: string;
};

type ImageOutput = {
  png: [ImageData];
  svg: [ImageData];
};

const languages = ["en", "fi"] as const;

type Language = (typeof languages)[number];

const locales = {
  en: "en_US",
  fi: "fi_FI",
};

const paths = {
  en: {
    "/": "/en/",
    cv: "/en/cv/",
    "data-protection": "/en/data-protection/",
  },
  fi: {
    "/": "/",
    cv: "/ansioluettelo/",
    "data-protection": "/tietosuoja/",
  },
};

const siteData = {
  description: "Viestintäasiantuntija ja yrittäjä",
  disabledLanguages: [],
  isProduction: process.env.NODE_ENV === "production",
  languages,
  locales,
  subtitle: "Viestinnän asiantuntija",
  title: "Antti Kivi",
  url:
    process.env.NODE_ENV === "production"
      ? "https://www.anttikivi.fi"
      : process.env.NODE_ENV === "staging"
        ? "https://staging.anttikivi.fi"
        : "http://localhost:8080",
};

export default async function (eleventyConfig: UserConfig) {
  /*
   * Filters
   */
  eleventyConfig.addFilter("hash", async function (filename: string) {
    if (process.env.NODE_ENV === "development") {
      return filename;
    }
    const inputFile = path.join("src", filename);
    const hash = await createFileHash(inputFile);
    if (filename.endsWith(".css")) {
      if (process.env.NODE_ENV === "production") {
        return `/${hash}.css`;
      }
      return `${filename.substring(0, filename.lastIndexOf("."))}.${hash}.css`;
    } else {
      return filename;
    }
  });
  eleventyConfig.addFilter("makePath", function (value: string, lang: string) {
    return `${paths[lang][value]}index.html`;
  });
  eleventyConfig.addFilter("tURL", function (value: string, lang?: string) {
    if (lang === this.page.lang) {
      return value;
    }
    const language = lang ? lang : this.page.lang;
    if (value in paths[language]) {
      return `${paths[language][value]}`;
    }
    throw new ReferenceError(
      `Trying to translate the path ${value} to ${language} but no valid translation was found.`,
    );
  });

  /*
   * Shortcodes
   */
  eleventyConfig.addShortcode("favicons", async function () {
    const options = {
      urlPath: "/",
      outputDir: "./_site",
    };
    const svgIcons: ImageOutput = await Image("./src/assets/favicon.svg", {
      widths: ["auto"],
      formats: ["svg"],
      ...options,
    });
    const pngIcons: ImageOutput = await Image("./src/assets/favicon.png", {
      widths: [16, 32, 180],
      formats: ["png"],
      ...options,
    });
    const icoHash = await createFileHash("./src/assets/favicon.ico");
    return `<link href="${svgIcons.svg[0].url}" rel="icon" type="image/svg+xml" />
<link href="/${process.env.NODE_ENV !== "development" ? icoHash : "favicon"}.ico" rel="alternate icon" sizes="16x16" />
<link href="${pngIcons.png.find((a) => a.width === 32).url}" rel="icon" sizes="32x32" type="image/png" />
<link href="${pngIcons.png.find((a) => a.width === 16).url}" rel="icon" sizes="16x16" type="image/png" />
<link href="${pngIcons.png.find((a) => a.width === 180).url}" rel="apple-touch-icon" sizes="180x180" />`;
  });
  eleventyConfig.addShortcode(
    "openGraphImage",
    async function (src: string, lang?: Language) {
      if (!src.endsWith(".png")) {
        throw new TypeError(
          `The value for the OpenGraph image is not an PNG image: ${src}`,
        );
      }
      const images: ImageOutput = await Image(
        lang
          ? `./src/assets/${src.split(".").slice(0, -1).join(".")}-${lang}.png`
          : `./src/assets/${src}`,
        {
          widths: [1200],
          formats: ["png"],
          urlPath: "/",
          outputDir: "./_site",
        },
      );
      const img = images.png[0];
      return `<meta property="og:image" content="${siteData.url}${img.url}" />
<meta property="og:image:secure_url" content="${siteData.url}${img.url}" />
<meta property="og:image:type" content="${img.sourceType}" />
<meta property="og:image:width" content="${img.width}" />
<meta property="og:image:height" content="${img.height}" />`;
    },
  );

  /*
   * Plugins
   */
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "fi",
  });
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  /**
   * Pass-through copies
   */
  // To be safe, add a pass-through copy of the plain "favicon.ico" in case
  // the browser looks for it.
  eleventyConfig.addPassthroughCopy({
    "src/assets/favicon.ico": "/favicon.ico",
  });
  if (process.env.NODE_ENV !== "development") {
    eleventyConfig.addPassthroughCopy({
      "src/assets/favicon.ico": `/${await createFileHash("./src/assets/favicon.ico")}.ico`,
    });
  }

  /*
   * Template Formats
   */
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: function (contents: string) {
      return async function () {
        return (await processCSS(contents)).code;
      };
    },
    compileOptions: {
      permalink: async function (_: unknown, inputPath: string) {
        const filename = inputPath.substring(
          inputPath.lastIndexOf("/") + 1,
          inputPath.lastIndexOf("."),
        );
        if (process.env.NODE_ENV === "development") {
          return `${filename}.css`;
        }
        const hash = await createFileHash(inputPath);
        if (process.env.NODE_ENV === "production") {
          return `${hash}.css`;
        }
        return `${filename}.${hash}.css`;
      },
    },
  });

  eleventyConfig.addGlobalData("contact", {
    socialMedia: {
      githubURL: "https://github.com/anttikivi",
      instagramURL: "https://www.instagram.com/anttikiwi/",
      threadsURL: "https://www.threads.net/@anttikiwi",
    },
  });
  eleventyConfig.addGlobalData("nav", {
    languages: {
      en: "In English",
      fi: "Suomeksi",
    },
    terms: [
      {
        link: "data-protection",
        label: {
          en: "Data protection",
          fi: "Tietosuoja",
        },
      },
    ],
  });
  eleventyConfig.addGlobalData("paths", paths);
  eleventyConfig.addGlobalData("site", siteData);

  eleventyConfig.addTransform(
    "html-minifier-terser",
    function (content: string) {
      if (
        process.env.NODE_ENV === "production" &&
        (this.page.outputPath || "").endsWith(".html")
      ) {
        return htmlMinifierTerser.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
      }

      return content;
    },
  );
}

export const config = {
  dir: {
    input: "src",
  },
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
