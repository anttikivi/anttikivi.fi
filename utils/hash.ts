import memoize from "memoize";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import { processCSSFile } from "./css.js";

async function _createFileHash(inputPath: string): Promise<string> {
  try {
    let result: Awaited<ReturnType<typeof processCSSFile>>;
    if (inputPath.endsWith(".css")) {
      result = await processCSSFile(inputPath);
    } else if (inputPath.endsWith(".ico")) {
      return crypto
        .createHash("sha256")
        .update(await fs.readFile(inputPath, "binary"))
        .digest("hex");
    } else {
      throw new Error("invalid file type passed to the hashing function");
    }
    return result.hash;
  } catch (err) {
    console.error(err);
  }
}

export const createFileHash = process.env.NODE_ENV
  ? _createFileHash
  : memoize(_createFileHash);
