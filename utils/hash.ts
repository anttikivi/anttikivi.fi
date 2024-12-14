import memoize from "memoize";
import { processCSSFile } from "./css.js";

async function _createFileHash(inputPath: string): Promise<string> {
  try {
    let result: Awaited<ReturnType<typeof processCSSFile>>;
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

export const createFileHash = memoize(_createFileHash);
