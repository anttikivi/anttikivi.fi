import browserslist from "browserslist";
import { browserslistToTargets, Features } from "lightningcss";
import normalizeColors from "lightningcss-plugin-normalize-colors";
import memoize from "memoize";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { compile, type CompilerOptions } from "tailwindcss-node-compiler";
import type { ProcessResult } from "./processing.ts";

function _createOptions(
  env: "development" | "staging" | "production",
): CompilerOptions {
  const defaultOptions = {
    sourceMap: false,
    include: Features.Nesting,
    exclude: Features.LogicalProperties | Features.DirSelector,
    visitor: normalizeColors,
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

const createOptions =
  process.env.NODE_ENV === "development"
    ? _createOptions
    : memoize(_createOptions);

async function _processCSS(input: string): Promise<ProcessResult> {
  const code = await compile(
    input,
    path.resolve(process.cwd(), "src"),
    createOptions(
      process.env.NODE_ENV as "development" | "staging" | "production",
    ),
  );
  const hash = crypto.createHash("sha256").update(code).digest("hex");

  return { code, hash };
}

export const processCSS =
  process.env.NODE_ENV === "development" ? _processCSS : memoize(_processCSS);

async function _processCSSFile(inputPath: string): Promise<ProcessResult> {
  const input = await fs.readFile(inputPath, "utf-8");
  return processCSS(input);
}

export const processCSSFile =
  process.env.NODE_ENV === "development"
    ? _processCSSFile
    : memoize(_processCSSFile);
