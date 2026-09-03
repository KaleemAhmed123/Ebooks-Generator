// Build any book in books/ into a styled PDF.
//
//   node tools/build.mjs --all               every book, every domain
//   node tools/build.mjs 01-typescript       one book
//   node tools/build.mjs tech                every book in a domain
//   node tools/build.mjs 01-typescript --html    stop at HTML, no Chrome
//   node tools/build.mjs 01-typescript --split   re-pack pages that overflow
//
// A folder is a book because it has a pages/ directory. Nothing lists the
// books anywhere; the build walks books/ and finds them. Settings and styles
// cascade down the folder chain: shared -> domain -> series -> book.

import { readFile, readdir, writeFile, mkdir, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";
import puppeteer from "puppeteer-core";
import { execSync } from "node:child_process";

const TOOLS = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(TOOLS, "..");
const BOOKS = path.join(ROOT, "books");
const SHARED = path.join(ROOT, "shared");

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => existsSync(p));

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const isDir = async (p) => existsSync(p) && (await stat(p)).isDirectory();

/* ------------------------------------------------------------ discovery ---
   Walk books/ and collect every folder that has a pages/ directory. The chain
   of folders above it is what the settings and styles cascade through. */

async function discover(dir, chain) {
  const found = [];
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if (!(await isDir(full)) || name === "pages") continue;
    const next = [...chain, full];
    if (await isDir(path.join(full, "pages"))) {
      found.push({
        rel: path.relative(BOOKS, full).split(path.sep).join("/"),
        dir: full,
        chain: next,
      });
    }
    // A series may also publish itself as one merged volume. It has no pages/
    // of its own — its pages are its children's, in `order`, with a divider
    // before each. `masterVolume` names the output, so building the series by
    // name still means the individual booklets and nothing else.
    const meta = path.join(full, "meta.json");
    if (existsSync(meta)) {
      const m = JSON.parse(await readFile(meta, "utf8"));
      if (m.masterVolume) {
        const mv = typeof m.masterVolume === "string" ? { name: m.masterVolume } : m.masterVolume;
        found.push({
          rel: path.join(path.relative(BOOKS, path.dirname(full)), mv.name ?? name)
            .split(path.sep)
            .join("/"),
          dir: full,
          chain: next,
          master: mv,
        });
      }
    }
    // A one-book series has its own pages/ and no children. A multi-book
    // series has children and no pages/. Recursing either way costs one
    // wasted readdir and saves a special case.
    found.push(...(await discover(full, next)));
  }
  return found;
}

/* ---------------------------------------------------------- the cascade ---
   Every folder in the chain may hold a meta.json and a theme.css. Both merge
   from the top down, so the deepest one wins. */

const mergePage = (a = {}, b = {}) => ({ ...a, ...b, margin: { ...a.margin, ...b.margin } });

async function cascade(chain) {
  let config = JSON.parse(await readFile(path.join(SHARED, "defaults.json"), "utf8"));
  let css = await readFile(path.join(SHARED, "base.css"), "utf8");
  // The deepest cover.mjs wins, same as everything else. A domain usually
  // supplies one; a series may override it for a different look.
  let coverModule = null;
  // A series lists its books in `order`, which is where a booklet's
  // "N of M" comes from. A standalone book has no order and is 1 of 1.
  let order = null;
  for (const folder of chain) {
    const meta = path.join(folder, "meta.json");
    if (existsSync(meta)) {
      const next = JSON.parse(await readFile(meta, "utf8"));
      if (next.order) order = next.order;
      config = { ...config, ...next, page: mergePage(config.page, next.page) };
    }
    const theme = path.join(folder, "theme.css");
    if (existsSync(theme)) css += "\n\n" + (await readFile(theme, "utf8"));
    const cov = path.join(folder, "cover.mjs");
    if (existsSync(cov)) coverModule = cov;
  }
  return { config, css, coverModule, order };
}

/* ------------------------------------------------- markdown extensions ---
   :::note / :::verse / whatever the domain declares becomes a styled block.
   A pre-pass, so the Markdown inside still renders normally. */

function containers(md, blocks) {
  if (!blocks.length) return md;
  const re = new RegExp(
    "^:::(" + blocks.join("|") + ")[ \\t]*\\n([\\s\\S]*?)^:::[ \\t]*$",
    "gm"
  );
  return md.replace(re, (_, kind, body) => `<div class="${kind}">\n\n${body}\n</div>\n`);
}

// Raw <svg> blocks must survive untouched. Markdown splits on blank lines, and
// an SVG written readably has plenty of them, which tears the element apart.
function protectSvg(md) {
  const kept = [];
  const out = md.replace(/<svg[\s\S]*?<\/svg>/g, (m) => {
    kept.push(m);
    return `<!--SVG${kept.length - 1}-->`;
  });
  return [out, kept];
}

/* ------------------------------- one markdown file -> one printed page --- */

async function renderPage(file, headings, pageIdx, blocks, term, accent, recolor) {
  const raw = await readFile(file, "utf8");
  const name = path.basename(file, ".md");
  const isCover = name.startsWith("00-cover");
  const isPart = /^\d+-00-part/.test(name);
  const isTopic = /^\d+-00-topic/.test(name);
  // Term pages are the `02-` files. Their h2s are the entries that get a
  // counter; an opener page's h2 is a section title and gets none.
  const isTerm = /^02-/.test(name) && !!term;

  const [guarded, svgs] = protectSvg(containers(raw, blocks));
  let html = marked.parse(guarded, { mangle: false, headerIds: false });
  // A diagram's accent is written into the SVG as a literal colour, where no
  // stylesheet can reach it. When a book is reprinted under a different accent
  // — a booklet inside the merged volume — its diagrams are remapped here, so
  // the markdown keeps a real, previewable colour and the build decides what
  // is actually printed.
  html = html.replace(/<!--SVG(\d+)-->/g, (_, i) => {
    const svg = svgs[Number(i)];
    return recolor && recolor.from && recolor.from !== recolor.to
      ? svg.replaceAll(recolor.from, recolor.to).replaceAll(recolor.from.toUpperCase(), recolor.to)
      : svg;
  });

  const anchored = html.replace(/<h([123])>([\s\S]*?)<\/h\1>/g, (m, lvl, text) => {
    const plain = text.replace(/<[^>]+>/g, "").trim();
    const id = `${name}-${slug(plain)}`;
    // The contents page lists parts and page titles only. Sub-sections and a
    // "- continued" page add length without helping anyone find anything.
    const inToc = !isCover && Number(lvl) <= 2 && !/-\s*continued$/i.test(plain);
    if (inToc) headings.push({ lvl: Number(lvl), text: plain, id, page: pageIdx });
    // "TERM 35/57" — where this entry sits in its own topic. Counted here, so
    // it can never disagree with what is actually on the page.
    const badge =
      isTerm && Number(lvl) === 2
        ? `<p class="termno">Term ${++term.n}/${term.total}</p>\n`
        : "";
    return `${badge}<h${lvl} id="${id}">${text}</h${lvl}>`;
  });

  const cls =
    "page" + (isCover ? " cover" : "") + (isPart ? " part" : "") + (isTopic ? " topic" : "");
  // Every topic owns a colour. Setting it on the section rather than on :root
  // is what lets the merged volume change accent as the topic changes.
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<section class="${cls}" data-src="${name}"${style}>\n${anchored}\n</section>`;
}

function tocPage(headings, before) {
  if (!headings.length) return "";
  let html = '<section class="page toc">\n<h2>Table Of Content</h2>\n';
  let open = 0;
  for (const h of headings) {
    while (open < h.lvl) { html += "<ul>\n"; open++; }
    while (open > h.lvl) { html += "</ul>\n"; open--; }
    const n = before + h.page + 1;
    html += `<li class="lvl${h.lvl}"><a href="#${h.id}">${h.text}</a>` +
            `<span class="dots"></span><span class="p">${n}</span></li>\n`;
  }
  while (open-- > 0) html += "</ul>\n";
  return html + "</section>";
}

/* ------------------------------------------------- the merged volume ---
   Every topic in `order`, in one book: a divider page announcing the topic,
   then that topic's own pages. Each topic keeps its own accent colour and its
   own term counter, so "Term 35/57" still means position inside the topic and
   the page furniture changes colour when the subject changes.

   The child booklets are read straight off disk rather than resolved through
   discovery, so the volume cannot drift from what the booklets actually build. */

async function buildMaster(book) {
  const headings = [];
  const pages = [];
  const blocks = book.config.blocks ?? [];
  const order = book.config.order ?? [];
  const topics = [];
  // One accent for the whole volume. Colouring each topic differently made a
  // single book look like eight books stapled together — the divider told you
  // the topic had changed already, and the colour change only broke the set.
  // The booklets keep their own accents; each is internally consistent and
  // matches its own cover.
  const accent = book.config.cover?.accent ?? null;

  for (const [i, child] of order.entries()) {
    const dir = path.join(book.dir, child);
    const meta = JSON.parse(await readFile(path.join(dir, "meta.json"), "utf8"));
    const src = path.join(dir, "pages");
    const files = (await readdir(src))
      .filter((f) => f.endsWith(".md") && !f.startsWith("00-cover"))
      .sort();

    const names = [];
    for (const f of files.filter((f) => /^02-/.test(f))) {
      for (const m of (await readFile(path.join(src, f), "utf8")).matchAll(/^## (.+)$/gm)) {
        names.push(m[1].trim());
      }
    }
    const total = names.length;
    const term = total ? { n: 0, total } : null;
    topics.push({ title: meta.title, terms: total, accent });

    // The divider is generated, not a file. Nothing to keep in sync by hand,
    // and its term count is counted rather than typed.
    //
    // The teaser is an even spread across the topic's alphabet rather than the
    // first few, so it samples the whole subject instead of everything filed
    // under A.
    const teaser = Array.from({ length: Math.min(9, total) }, (_, k) =>
      names[Math.round((k * (total - 1)) / Math.max(1, Math.min(9, total) - 1))]
    ).filter((v, k, a) => a.indexOf(v) === k);

    const id = `topic-${slug(meta.title)}`;
    headings.push({ lvl: 1, text: meta.title, id, page: pages.length });
    pages.push(
      `<section class="page topic" data-src="topic-${child}" style="--accent:${accent}">\n` +
        `<p class="topic-no">Topic ${i + 1} of ${order.length}</p>\n` +
        `<h1 id="${id}">${meta.title}</h1>\n` +
        (meta.subtitle ? `<p>${meta.subtitle}</p>\n` : "") +
        `<ul class="topic-terms">${teaser.map((t) => `<li>${t}</li>`).join("")}</ul>\n` +
        `<p class="topic-count">${total} terms · alphabetical</p>\n</section>`
    );

    // The booklet's own accent is what its diagrams were drawn in; the volume's
    // is what they are printed in here.
    const recolor = { from: meta.cover?.accent ?? null, to: accent };
    for (const f of files) {
      pages.push(
        await renderPage(path.join(src, f), headings, pages.length, blocks, term, accent, recolor)
      );
    }
  }

  // The volume's own cover page, replaced by the drawn cover afterwards.
  const c = book.config;
  const coverHtml =
    `<section class="page cover" data-src="00-cover">\n` +
    `<p class="cover-book">${c.seriesLine ?? ""}</p>\n` +
    `<h1>${c.title}</h1>\n` +
    `<p class="cover-sub">${c.subtitle ?? ""}</p>\n</section>`;

  book.topics = topics;
  book.termTotal = topics.reduce((a, t) => a + t.terms, 0);
  return { coverHtml, pages, headings };
}

async function buildBook(book) {
  if (book.master) return buildMaster(book);
  const src = path.join(book.dir, "pages");
  const files = (await readdir(src)).filter((f) => f.endsWith(".md")).sort();
  if (!files.length) throw new Error(`no markdown pages in ${book.rel}`);

  const blocks = book.config.blocks ?? [];
  const headings = [];
  const pages = [];
  const cover = files.find((f) => f.startsWith("00-cover"));
  const rest = files.filter((f) => f !== cover);

  // The counter's denominator is every term in this topic, so it has to be
  // known before the first page renders. Counted from the files themselves.
  let total = 0;
  for (const f of rest.filter((f) => /^02-/.test(f))) {
    total += ((await readFile(path.join(src, f), "utf8")).match(/^## /gm) ?? []).length;
  }
  const term = total ? { n: 0, total } : null;
  const accent = book.config.cover?.accent ?? null;

  const coverHtml = cover ? await renderPage(path.join(src, cover), [], 0, blocks, null, accent) : "";
  for (let i = 0; i < rest.length; i++) {
    pages.push(await renderPage(path.join(src, rest[i]), headings, i, blocks, term, accent));
  }
  return { coverHtml, pages, headings };
}

// A content page's printed number is the cover, plus however many pages the
// contents runs to, plus its own position. One markdown file is one printed
// page, which is what makes this arithmetic possible at all.
//
// The book always renders its own plain 00-cover.md as page 1, so the printed
// page numbers in the footer are right. When the domain has a cover generator,
// that plain page is swapped for the drawn cover afterwards — a replacement,
// not an insertion, so the count and the numbering never move.
function assemble({ coverHtml, pages, headings }, tocPages) {
  const before = (coverHtml ? 1 : 0) + tocPages;
  return [coverHtml, tocPage(headings, before), ...pages].filter(Boolean).join("\n");
}

function document(body, book) {
  const p = book.config.page, m = p.margin;
  // Page geometry is generated last so it always wins, and always agrees with
  // the size handed to Chrome below. A domain theme sets the look, not the trim.
  const geometry =
    `@page { size: ${p.width} ${p.height}; margin: ${m.top} ${m.right} ${m.bottom} ${m.left}; }`;
  // Any declared block is a single logical unit and must never be torn in two.
  const names = (book.config.blocks ?? []).map((b) => "." + b).join(", ");
  const guards = names ? `${names} { break-inside: avoid; page-break-inside: avoid; }` : "";
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${book.config.title ?? book.rel}</title>
<style>${book.css}\n${guards}\n${geometry}</style></head>
<body>${body}</body></html>`;
}

/* ------------------------------------------------------------ measuring ---
   One markdown file must fit on one printed page. Anything taller is the
   signal to split the idea. The generated contents page is exempt. */

const printableH = (c) =>
  parseFloat(c.page.height) - parseFloat(c.page.margin.top) - parseFloat(c.page.margin.bottom);
const printableW = (c) =>
  parseFloat(c.page.width) - parseFloat(c.page.margin.left) - parseFloat(c.page.margin.right);

// Measure at the printed column width and in print media, or the text wraps
// differently and every height is wrong.
async function prepare(page, config) {
  await page.emulateMediaType("print");
  await page.setViewport({
    width: Math.round((printableW(config) * 96) / 25.4),
    height: 900,
  });
}

async function measure(page) {
  return page.evaluate(() => {
    const pxPerMm = 96 / 25.4;
    return [...document.querySelectorAll(".page")]
      .filter((el) => el.dataset.src)
      .map((el) => {
        const top = el.getBoundingClientRect().top;
        const heads = [...el.querySelectorAll("h1, h2, h3")].map(
          (h) => (h.getBoundingClientRect().top - top) / pxPerMm
        );
        return { src: el.dataset.src, mm: el.scrollHeight / pxPerMm, heads };
      });
  });
}

/* ------------------------------------------------------------- splitting ---
   Fill each page, do not balance it. A new topic always starts a fresh page;
   its sub-sections flow on until the page is genuinely full. */

function cutBeforeHeading(md, headingIndex) {
  const lines = md.split("\n");
  const headingLines = [];
  let inFence = false;
  for (const [i, line] of lines.entries()) {
    if (/^```/.test(line)) inFence = !inFence;
    if (!inFence && /^#{1,3} /.test(line)) headingLines.push(i);
  }
  const at = headingLines[headingIndex];
  if (at === undefined || at === 0) return null;
  return [lines.slice(0, at).join("\n").trim(), lines.slice(at).join("\n").trim()];
}

// Last resort when a single section is taller than a page on its own: cut at
// the blank line nearest the point where the page ran out of room.
function cutAtBlankLine(md, fraction, blocks) {
  const kinds = blocks.length ? blocks.join("|") : "\\w+";
  const chunks = md.split(/\n\n+/);
  if (chunks.length < 2) return null;
  const target = md.length * fraction;
  let seen = 0, at = 1;
  for (const [i, b] of chunks.entries()) {
    seen += b.length + 2;
    if (seen >= target) { at = Math.max(1, i); break; }
  }
  // Do not leave a sliver on the second page.
  const tail = (from) => chunks.slice(from).join("").length;
  while (at > 1 && tail(at) < md.length * 0.3) at--;

  // Never cut inside a :::block or an inline <svg>. Both are single logical
  // units, and half a diagram on each of two pages is worse than a tall page.
  const openRe = new RegExp("^:::(" + kinds + ")", "gm");
  const balanced = (n) => {
    const h = chunks.slice(0, n).join("\n\n");
    const opens = (h.match(openRe) ?? []).length;
    const closes = (h.match(/^:::\s*$/gm) ?? []).length;
    return opens === closes &&
           (h.match(/<svg/g) ?? []).length === (h.match(/<\/svg>/g) ?? []).length;
  };
  if (!balanced(at)) {
    let back = at;
    while (back > 1 && !balanced(back)) back--;
    let fwd = at;
    while (fwd < chunks.length && !balanced(fwd)) fwd++;
    // Prefer moving forward, which keeps the diagram with the prose above it.
    if (fwd < chunks.length && balanced(fwd)) at = fwd;
    else if (back > 1 && balanced(back)) at = back;
    else return null;
  }

  let head = chunks.slice(0, at).join("\n\n").trim();
  let rest = chunks.slice(at).join("\n\n").trim();

  // The cut can land inside a fenced code block. That leaves part one with an
  // unclosed fence, and turns part two's comment lines into headings that then
  // pollute the contents page. Close the fence and reopen it with the same
  // language on the way in.
  const fences = head.match(/^```.*$/gm) ?? [];
  if (fences.length % 2 === 1) {
    const info = (fences[fences.length - 1].match(/^```(.*)$/) ?? [, ""])[1];
    head += "\n```";
    rest = "```" + info + "\n" + rest;
  }

  const title = (md.match(/^## (.+)$/m) ?? [, "Continued"])[1];
  return [head, `## ${title} - continued\n\n` + rest];
}

// Parts are named `<base>-1.md`, `<base>-2.md` ... so they sort in order and
// can always be merged back by stripping the trailing `-<n>` groups.
const baseName = (name) => name.replace(/(-\d+)+$/, "");

// Undo a previous split so a re-split starts from the original page.
async function mergeParts(book) {
  const src = path.join(book.dir, "pages");
  const files = (await readdir(src)).filter((f) => f.endsWith(".md")).sort();
  const groups = new Map();
  for (const f of files) {
    const name = path.basename(f, ".md");
    if (name === baseName(name)) continue;
    const g = groups.get(baseName(name)) ?? [];
    g.push(f);
    groups.set(baseName(name), g);
  }
  for (const [base, parts] of groups) {
    const bodies = [];
    for (const [i, p] of parts.entries()) {
      let body = (await readFile(path.join(src, p), "utf8")).trim();
      // Drop the synthetic "continued" heading a previous split added, or it
      // reappears in the middle of the merged page.
      if (i > 0) body = body.replace(/^##[^\n]*continued[^\n]*\n+/gm, "").trim();
      bodies.push(body);
      await rm(path.join(src, p));
    }
    await writeFile(path.join(src, `${base}.md`), bodies.join("\n\n") + "\n");
  }
  if (groups.size) console.log(`  merged ${groups.size} previously split pages`);
}

async function autoSplit(book) {
  if (!CHROME) throw new Error("Chrome not found");
  await mergeParts(book);
  const H = printableH(book.config);
  const blocks = book.config.blocks ?? [];

  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  await prepare(page, book.config);

  let cuts = 0;
  for (let pass = 1; pass <= 12; pass++) {
    await page.setContent(document(assemble(await buildBook(book), 1), book), {
      waitUntil: "load",
    });
    const over = (await measure(page)).filter((p) => p.mm > H);
    if (!over.length) {
      console.log(`  packed in ${pass - 1} passes, ${cuts} cuts`);
      break;
    }
    for (const o of over) {
      const file = path.join(book.dir, "pages", `${o.src}.md`);
      const md = await readFile(file, "utf8");

      // Fill the page: keep every heading that fitted, cut before the first
      // one that did not.
      let lastFitting = -1;
      for (let i = 1; i < o.heads.length; i++) if (o.heads[i] <= H) lastFitting = i;
      // A greedy fill can strand a short section alone on the next page.
      if (lastFitting > 1 && o.mm - o.heads[lastFitting] < H * 0.22) lastFitting -= 1;
      // Refuse a cut that would leave almost nothing on the first page.
      const firstChunkFits = lastFitting >= 1 && o.heads[lastFitting] >= H * 0.35;
      const parts = firstChunkFits
        ? cutBeforeHeading(md, lastFitting)
        : cutAtBlankLine(md, H / o.mm, blocks);

      if (!parts) continue;
      await writeFile(path.join(book.dir, "pages", `${o.src}-1.md`), parts[0] + "\n");
      await writeFile(path.join(book.dir, "pages", `${o.src}-2.md`), parts[1] + "\n");
      await rm(file);
      cuts++;
    }
  }
  await browser.close();
}

// The contents page is the one section allowed to run past a single page, so
// its height decides how many printed pages sit before the first content page.
async function measureTocPages(html, config) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  await prepare(page, config);
  await page.setContent(html, { waitUntil: "networkidle0" });
  const mm = await page.evaluate(() => {
    const el = document.querySelector(".page.toc");
    return el ? el.getBoundingClientRect().height / (96 / 25.4) : 0;
  });
  await browser.close();
  return Math.max(1, Math.ceil(mm / printableH(config)));
}

async function toPdf(html, outFile, book) {
  if (!CHROME) throw new Error("Chrome not found — set the path in tools/build.mjs");
  const c = book.config, H = printableH(c);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  await prepare(page, c);
  await page.setContent(html, { waitUntil: "networkidle0" });

  for (const o of (await measure(page)).filter((p) => p.mm > H)) {
    console.warn(`  overflow  ${o.src}  ${o.mm.toFixed(0)}mm of ${H}mm — run --split`);
  }

  const m = c.page.margin;
  await page.pdf({
    path: outFile,
    // A 300-page booklet takes longer than Puppeteer's 30s default.
    timeout: 0,
    width: c.page.width,
    height: c.page.height,
    margin: m,
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family:Georgia,serif;font-size:6.5pt;color:#1a1a1a;
      width:100%;padding:0 14mm;display:flex;justify-content:space-between;">
      <span>${c.runningHeader ?? ""}</span>
      <span style="font-weight:700;letter-spacing:0.06em;">${c.title ?? ""}</span></div>`,
    footerTemplate: `<div style="font-family:Georgia,serif;font-size:6.5pt;color:#1a1a1a;
      width:100%;text-align:center;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await browser.close();
}

/* --------------------------------------------------------------- covers ---
   A drawn cover has to reach the paper edge and carry no running header or
   page number. Chrome applies a header to every page it prints and gives no
   way to skip one, so the cover is printed on its own with zero margins and
   swapped in for page 1 afterwards.

   Swapping rather than inserting is what keeps the footer numbers honest: the
   book already printed its plain 00-cover.md as page 1 of N. */

async function renderCoverPdf(book, svg, outFile) {
  const c = book.config;
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  await page.setContent(
    // Sized in absolute units, not percentages. A percentage height resolves
    // against a body that has none, which let the artwork spill onto a second
    // printed page.
    `<!doctype html><meta charset="utf-8"><style>
      @page { size: ${c.page.width} ${c.page.height}; margin: 0; }
      html, body { margin: 0; padding: 0; overflow: hidden;
                   width: ${c.page.width}; height: ${c.page.height}; }
      svg { display: block; width: ${c.page.width}; height: ${c.page.height}; }
    </style>${svg}`,
    { waitUntil: "load" }
  );
  await page.emulateMediaType("print");
  await page.pdf({
    path: outFile,
    timeout: 0,
    width: c.page.width,
    height: c.page.height,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    printBackground: true,
    displayHeaderFooter: false,
  });
  await browser.close();
}

// PyMuPDF does the swap. It is already installed and already what the previous
// cover pipeline used, so this adds no dependency.
function swapFirstPage(bookPdf, coverPdf) {
  execSync(
    `python "${path.join(TOOLS, "swap-cover.py")}" "${bookPdf}" "${coverPdf}"`,
    { stdio: "pipe" }
  );
}

// PDF is the product. EPUB is a plain unstyled bonus, only built on --epub,
// and skipped silently when pandoc is not installed.
async function toEpub(htmlFile, outFile) {
  try {
    execSync(`pandoc "${htmlFile}" -o "${outFile}"`);
    console.log(`epub  ${path.relative(ROOT, outFile)}`);
  } catch {
    console.log("  (skipping epub: pandoc not installed)");
  }
}

/* ----------------------------------------------------------------- main --- */

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const names = args.filter((a) => !a.startsWith("--"));
const htmlOnly = flags.includes("--html");
const doSplit = flags.includes("--split");
const doEpub = flags.includes("--epub");
const outRoot = path.join(ROOT, flags.find((a) => a.startsWith("--out="))?.split("=")[1] ?? "dist");

let books = await discover(BOOKS, []);
for (const b of books) {
  Object.assign(b, await cascade(b.chain));
  // "BOOKLET 3 OF 9" comes from the series' order list. A standalone book is
  // 1 of 1, and its cover data usually carries its own label anyway.
  const name = path.basename(b.dir);
  b.index = b.order ? b.order.indexOf(name) + 1 || 1 : 1;
  b.seriesTotal = b.order ? b.order.length : 1;
  // A merged volume is not a booklet and must not wear a booklet's cover. It
  // names its own generator, which is the one case where the cascade's
  // deepest-wins rule gives the wrong answer.
  if (b.master?.cover) b.coverModule = path.join(b.dir, b.master.cover);
  // A drawn cover needs both halves: the domain's generator and this book's
  // cover data. Missing either, the book's own 00-cover.md page is used.
  b.cover = b.coverModule && b.config.cover
    ? (await import(pathToFileURL(b.coverModule).href)).cover
    : null;
}

if (flags.includes("--list")) {
  for (const b of books) console.log(`${b.rel}  ${b.config.page.width}x${b.config.page.height}  [${(b.config.blocks ?? []).join(" ")}]`);
  process.exit(0);
}

if (!flags.includes("--all")) {
  if (!names.length) {
    console.error("usage: node tools/build.mjs --all | <domain|series|book> [--html] [--split] [--epub]");
    console.error("known books:\n  " + books.map((b) => b.rel).join("\n  "));
    process.exit(1);
  }
  books = books.filter((b) => names.some((n) => b.rel.split("/").includes(n)));
  if (!books.length) {
    console.error(`no book matches: ${names.join(", ")}`);
    process.exit(1);
  }
}

for (const book of books) {
  console.log(book.rel);
  if (doSplit) await autoSplit(book);
  const parts = await buildBook(book);

  // The contents' own length shifts every page number after it, so measure it
  // first, then assemble with the numbers that result. Two passes settle it.
  let tocPages = 1;
  if (!htmlOnly) {
    for (let pass = 0; pass < 3; pass++) {
      const measured = await measureTocPages(document(assemble(parts, tocPages), book), book.config);
      if (measured === tocPages) break;
      tocPages = measured;
    }
  }
  const html = document(assemble(parts, tocPages), book);

  const out = path.join(outRoot, book.rel);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out + ".html", html);

  if (htmlOnly) {
    console.log(`html  ${path.relative(ROOT, out)}.html`);
    continue;
  }
  await toPdf(html, out + ".pdf", book);

  if (book.cover && !flags.includes("--no-cover")) {
    const c = book.config;
    const svg = book.cover(c, {
      author: c.author,
      site: c.site,
      year: c.year,
      edition: c.edition,
      seriesLine: c.seriesLine ?? "",
      // Both of these were typed by hand in the old cover data and went stale
      // on every rebuild. They are counted here instead.
      pages: 1 + tocPages + parts.pages.length,
      more: Math.max(0, (book.termTotal ?? parts.headings.length) - (c.cover.stack?.length ?? 0)),
      index: book.index,
      total: book.seriesTotal,
      // Only a merged volume has these. Counted from what was actually built,
      // so the number on the cover cannot disagree with the book behind it.
      topics: book.topics ?? null,
      terms: book.termTotal ?? null,
    });
    const coverPdf = out + ".cover.pdf";
    await renderCoverPdf(book, svg, coverPdf);
    swapFirstPage(out + ".pdf", coverPdf);
    await rm(coverPdf);
    console.log(`      cover drawn, ${1 + tocPages + parts.pages.length} pages`);
  }

  console.log(`pdf   ${path.relative(ROOT, out)}.pdf`);
  if (doEpub) await toEpub(out + ".html", out + ".epub");
}
