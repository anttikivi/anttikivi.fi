import browserslist from "browserslist";
import { browserslistToTargets, Features } from "lightningcss";
import memoize from "memoize";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { compile } from "tailwindcss-node-compiler";
import fixTailwindColors from "./lightningcss-plugin-fix-tailwind-colors/index.js";

/**
 * @param {"development" | "staging" | "production"} env The value of NODE_ENV.
 *
 * @returns {import("tailwindcss-node-compiler").CompilerOptions}
 */
function _createOptions(env) {
  const defaultOptions = {
    sourceMap: false,
    include: Features.Nesting,
    exclude: Features.LogicalProperties | Features.DirSelector,
    visitor: fixTailwindColors,
  };

  if (env === "production") {
    const targets = browserslistToTargets(
      browserslist(">= 0.005% and not dead"),
    );
    return Object.assign({}, defaultOptions, {
      minify: true,
      targets,
    });
  }

  if (env === "staging") {
    const targets = browserslistToTargets(browserslist("defaults"));
    return Object.assign({}, defaultOptions, {
      minify: false,
      targets,
    });
  }

  return { disableTransforms: true };
}

/** @type {typeof _createOptions} */
const createOptions = memoize(_createOptions);

/**
 * @param {string} input The CSS that should be compiled.
 *
 * @returns {Promise<import("./processing").ProcessResult>}
 */
async function _processCSS(input) {
  const code = await compile(
    input,
    path.resolve(process.cwd(), "src"),
    createOptions(process.env.NODE_ENV),
  );
  const hash = crypto.createHash("sha256").update(code).digest("hex");

  return { code, hash };
}

/** @type {typeof _processCSS} */
export const processCSS =
  process.env.NODE_ENV === "development" ? _processCSS : memoize(_processCSS);

/**
 * @param {string} inputPath Path to the CSS file to compile.
 *
 * @returns {Promise<import("./processing").ProcessResult>}
 */
async function _processCSSFile(inputPath) {
  const input = await fs.readFile(inputPath, "utf-8");
  return processCSS(input);
}

/** @type {typeof _processCSSFile} */
export const processCSSFile =
  process.env.NODE_ENV === "development"
    ? _processCSSFile
    : memoize(_processCSSFile);
