// Based on TailwindCSS.
// Copyright (c) Tailwind Labs, Inc.

/**
 * @param {string} value
 */
export function eprintln(value = "") {
  process.stderr.write(`${value}\n`);
}
