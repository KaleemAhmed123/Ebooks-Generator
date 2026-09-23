// Temporary: screenshot named .page elements from a --html build so new pages
// can actually be looked at. Deleted before commit.
//   node tools/shot.mjs <html> <out-dir> <data-src> [<data-src> ...]
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { mkdirSync } from "node:fs";

const [html, outDir, ...srcs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 1700, deviceScaleFactor: 2 });
await page.goto(pathToFileURL(path.resolve(html)).href, { waitUntil: "networkidle0" });

for (const src of srcs) {
  const el = await page.$(`section.page[data-src="${src}"]`);
  if (!el) { console.log(`MISSING ${src}`); continue; }
  await el.screenshot({ path: `${outDir}/${src}.png` });
  console.log(`ok ${src}`);
}
await browser.close();
