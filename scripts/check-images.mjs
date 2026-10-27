// Verifies every product photo in public/products: real image, webp, 800x800,
// > 5 KB, not a flat/blank frame, and in sync with the noImage flags in products.ts.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "public", "products");
const data = readFileSync(path.join(root, "src", "data", "products.ts"), "utf8");

const products = [...data.matchAll(/id: "([^"]+)"[\s\S]*?noImage: (true|false)/g)].map((m) => ({
  id: m[1],
  noImage: m[2] === "true",
}));

let failed = 0;
const fail = (id, msg) => {
  failed++;
  console.log(`FAIL ${id}: ${msg}`);
};

for (const { id, noImage } of products) {
  const file = path.join(dir, `${id}.webp`);
  if (!existsSync(file)) {
    if (!noImage) fail(id, "no file but noImage is false");
    else console.log(`skip ${id} (noImage)`);
    continue;
  }
  if (noImage) fail(id, "file exists but noImage is true");

  const size = statSync(file).size;
  if (size <= 5 * 1024) fail(id, `too small (${size} B)`);

  const head = readFileSync(file).subarray(0, 12).toString("latin1");
  if (!head.startsWith("RIFF") || head.slice(8) !== "WEBP") fail(id, "not a webp file (error page?)");

  try {
    const img = sharp(file);
    const meta = await img.metadata();
    if (meta.width !== 800 || meta.height !== 800) fail(id, `size ${meta.width}x${meta.height}`);
    // A logo or blank banner tends to be almost one flat colour.
    const { channels } = await img.stats();
    const spread = Math.max(...channels.slice(0, 3).map((c) => c.stdev));
    if (spread < 12) fail(id, `nearly flat image (stdev ${spread.toFixed(1)})`);
    console.log(`ok   ${id} ${meta.width}x${meta.height} ${(size / 1024).toFixed(1)} KB stdev ${spread.toFixed(0)}`);
  } catch (e) {
    fail(id, `cannot decode: ${e.message}`);
  }
}

const known = new Set(products.map((p) => `${p.id}.webp`));
for (const f of readdirSync(dir).filter((f) => f.endsWith(".webp"))) {
  if (!known.has(f)) fail(f, "file has no product in data");
}

console.log(failed ? `\n${failed} problem(s)` : `\nall good`);
process.exit(failed ? 1 : 0);
