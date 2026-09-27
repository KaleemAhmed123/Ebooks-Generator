// Page heights of the built HTML, measured like tools/build.mjs (print media, 126mm column).
//   node tools/build.mjs 02-pattern-recognition --html
//   node docs/tasks/reference/dsa/scripts/measure.mjs 04-      <- pages whose name starts with 04-
// Prints every page over 186mm, plus a block-by-block breakdown of the matching pages.
import { createRequire } from "node:module";
const puppeteer = createRequire(import.meta.url)("../../../../../tools/node_modules/puppeteer-core");
import { pathToFileURL } from "node:url";
const prefix = process.argv[2] ?? "";
const html = pathToFileURL("dist/tech/DSA/02-pattern-recognition.html").href;
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
await page.emulateMediaType("print");
await page.setViewport({ width: Math.round((126 * 96) / 25.4), height: 900 });
await page.goto(html, { waitUntil: "networkidle0" });
const rows = await page.evaluate((prefix) => {
  const mm = (px) => (px / (96 / 25.4)).toFixed(0);
  return [...document.querySelectorAll(".page[data-src]")].map((s) => {
    const h = s.scrollHeight / (96 / 25.4);
    const detail = s.dataset.src.startsWith(prefix) && prefix
      ? " : " + [...s.children].map((c) => c.tagName + "=" + mm(c.getBoundingClientRect().height)).join(" ")
      : "";
    return h > 186 || detail ? `${h > 186 ? "OVER" : "ok  "} ${s.dataset.src} ${h.toFixed(0)}mm${detail}` : null;
  }).filter(Boolean);
}, prefix);
console.log(rows.join("\n"));
await browser.close();
