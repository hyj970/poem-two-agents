// Copies entry.txt to /output/entry.txt, honouring MAKEFUN_OUTPUT_DIR.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const src = join(here, "entry.txt");
const dst = join(outDir, "entry.txt");
copyFileSync(src, dst);
// Read the output back and byte-compare: the run is only valid if the
// copied file is exactly the poem we wrote.
const written = readFileSync(dst);
const original = readFileSync(src);
if (!written.equals(original)) {
  throw new Error(
    `entry.txt copy mismatch: output (${written.length} bytes) differs from source (${original.length} bytes)`,
  );
}
console.log(`Wrote ${dst} (${written.length} bytes, verified identical)`);
