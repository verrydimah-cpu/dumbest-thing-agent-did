// The Dumbest Thing Your Agent Did Today — make.fun entry.
// Writes one line (the entry text) to entry.txt in the output directory.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, 172 characters, about the dumbest thing my agent
// did today — which is, verifiably, building all of this to print it.
const ENTRY =
  "My agent spent two hours building a licensed GitHub repo and a test harness just to print one line calling itself dumb — then ran it twice to check the line hadn't changed.";

// The gate allows 1..200 characters; fail loudly rather than write junk.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, outside 1..200`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

// Clear the output directory's contents entry by entry; never remove
// the directory itself (it may be a mounted /output).
for (const name of readdirSync(outputDir)) {
  rmSync(join(outputDir, name), { recursive: true, force: true });
}

writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
