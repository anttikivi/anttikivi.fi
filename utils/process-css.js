import memoize from "memoize";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { compile } from "tailwindcss-node-compiler";

/** @typedef {{ code: string, hash: string }} ProcessResult */

/**
 * @param {string} input The CSS that should be compiled.
 *
 * @returns {Promise<ProcessResult>}
 */
async function _processCSS(input) {
  const code = await compile(
    input,
    path.resolve(process.cwd(), "src"),
    undefined,
  );
  const hash = crypto.createHash("sha256").update(code).digest("hex");

  return { code, hash };
}

/** @type {typeof _processCSS} */
export const processCSS = memoize(_processCSS);

/**
 * @param {string} inputPath Path to the CSS file to compile.
 *
 * @returns {Promise<ProcessResult>}
 */
async function _processCSSFile(inputPath) {
  const input = await fs.readFile(inputPath, "utf-8");
  return processCSS(input);
}

/** @type {typeof _processCSSFile} */
export const processCSSFile = memoize(_processCSSFile);
