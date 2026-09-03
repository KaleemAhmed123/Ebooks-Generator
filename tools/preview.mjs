// Render one page of a built book to PNG, so a styling change can actually be
// looked at instead of guessed at.
//
//   node tools/build.mjs 03-engineering-practice --html
//   node tools/preview.mjs 03-engineering-practice 4
//
// Writes dist/preview-<book>-<n>.png at the real trim size. `n` is the index
// among the `.page` sections, 1-based; 1 is the cover, 2 the contents.

import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
].find((p) => existsSync(p));

const [book, nRaw = "3", scaleRaw = "2"] = process.argv.slice(2);
const n = Number(nRaw);

const html = [
  path.join(ROOT, "dist/tech/production-terms", book + ".html"),
  path.join(ROOT, "dist/tech", book + ".html"),
  path.join(ROOT, "dist", book + ".html"),
].find((p) => existsSync(p));
if (!html) {
  console.error(`no built html for ${book} — run: node tools/build.mjs ${book} --html`);
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 560, height: 794, deviceScaleFactor: Number(scaleRaw) });
await page.goto("file://" + html.replace(/\\/g, "/"), { waitUntil: "load" });
await page.emulateMediaType("print");

const found = await page.evaluate((i) => {
  const pages = [...document.querySelectorAll(".page")];
  if (!pages[i - 1]) return null;
  // Show one page alone, at the printed trim, with the page margins drawn in.
  document.body.style.background = "#7a7a7a";
  document.body.style.padding = "8mm";
  // Hide the others by removing them, not by setting display — the theme uses
  // display on the page itself (topic dividers are flex), and overriding it
  // here would show a layout the printed book never uses.
  for (const [j, el] of pages.entries()) if (j !== i - 1) el.remove();
  const el = pages[i - 1];
  el.style.width = "148mm";
  el.style.height = "210mm";
  el.style.padding = "13mm 11mm 11mm 11mm";
  el.style.boxShadow = "0 0 0 1px #333";
  return el.dataset.src ?? "(generated)";
}, n);

if (!found) {
  console.error(`page ${n} does not exist in ${book}`);
  await browser.close();
  process.exit(1);
}

const out = path.join(ROOT, "dist", `preview-${book}-${n}.png`);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`${found} -> ${path.relative(ROOT, out)}`);
