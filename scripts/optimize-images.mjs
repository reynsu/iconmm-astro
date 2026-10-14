// Genera variantes WebP de las imágenes de public/images y un manifiesto con sus medidas.
// Uso: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";

const ROOT = "public/images";
const PHOTO_WIDTHS = [480, 800, 1200, 1600];
const manifest = {};

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png)$/i.test(e.name) && !/-\d+\.webp$/.test(e.name)) out.push(p);
  }
  return out;
}

for (const file of await walk(ROOT)) {
  const { dir, name } = parse(file);
  const rel = join(dir, name).replace(/^public/, ""); // p. ej. /images/kiosk
  const img = sharp(file);
  const meta = await img.metadata();
  const isPhoto = meta.width >= 600;
  const widths = isPhoto ? PHOTO_WIDTHS.filter((w) => w <= meta.width) : [meta.width];
  if (isPhoto && !widths.includes(meta.width) && meta.width < 1600) widths.push(meta.width);
  const sizes = [];
  for (const w of widths) {
    const out = `${join(dir, name)}-${w}.webp`;
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: isPhoto ? 70 : 88, effort: 6 }).toFile(out);
    const s = await stat(out);
    sizes.push({ w, h: Math.round((meta.height * w) / meta.width), kb: Math.round(s.size / 1024) });
  }
  manifest[rel] = { width: meta.width, height: meta.height, widths: sizes.map((s) => s.w) };
  console.log(rel.padEnd(32), `${meta.width}x${meta.height}`.padEnd(10), sizes.map((s) => `${s.w}w:${s.kb}K`).join(" "));
}
await writeFile("src/data/images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log("manifest:", Object.keys(manifest).length, "imágenes");
