import memoize from "memoize";
import { processCSSFile } from "./css.js";

/**
 * @param {string} inputPath
 *
 * @returns {Promise<string>}
 */
async function _createFileHash(inputPath) {
  try {
    /** @type {Awaited<ReturnType<typeof import("./css.js").processCSS>>} */
    let result;
    if (inputPath.endsWith(".css")) {
      result = await processCSSFile(inputPath);
    } else {
      throw new Error("invalid file type passed to the hashing function");
    }
    return result.hash;
  } catch (err) {
    console.error(err);
  }
}

/** @type {typeof _createFileHash} */
export const createFileHash = memoize(_createFileHash);
