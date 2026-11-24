// One Line, One Chill (u-azazex-one-line-one-chill-6d4d5488).
// Writes a single line of horror to $MAKEFUN_OUTPUT_DIR/entry.txt.
// One image, one twist, no gore: the scare is what the line withholds.
const fs = require("node:fs");
const path = require("node:path");

const LINE = "My reflection blinked a second late, then smiled first.";

// Guard: the gate counts characters (code points), not bytes, and the
// entry must be exactly one line with no trailing newline, so the file
// is written byte-for-byte as LINE and checked by reading it back.
function main() {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  const chars = [...LINE];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error("line must be 1-200 characters, got " + chars.length);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be whitespace-only");
  }
  if (/[\r\n]/.test(LINE)) {
    throw new Error("line must be a single line");
  }
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, LINE, "utf8");
  const back = fs.readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip validation failed: output differs from line");
  }
}

main();
