// One-time migration: docs/ebook  ->  books/<domain>/<series>/<book>/pages
//
//   node tools/migrate.mjs
//
// COPIES. The source tree is never touched, so this is fully reversible by
// deleting books/. Merges the three duplicated book lists (book.config.json,
// covers/build-set.mjs, covers/assemble-book.py) into one meta.json per book.

import { readFile, writeFile, mkdir, readdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "docs", "ebook");
const BOOKS = path.join(ROOT, "books");

// The nine numbered booklets are one series. The rest stand alone.
const SERIES = "typescript-to-deployment";
const IN_SERIES = ["01-typescript", "02-nextjs", "03-node-core", "04-ecosystem",
  "05-data", "06-api-design", "07-ai-sdks", "08-deployment", "09-ai-practices"];
const STANDALONE = ["frontend-mastery", "vps-mastery", "react-ai"];

const config = JSON.parse(await readFile(path.join(SRC, "book.config.json"), "utf8"));

// build-set.mjs holds the cover art data as a plain array literal. Pull it out
// rather than importing, because the module renders a PDF on import.
const setSrc = await readFile(path.join(SRC, "covers", "build-set.mjs"), "utf8");
const arr = setSrc.match(/const BOOKLETS = (\[[\s\S]*?\n\];)/)[1].replace(/;$/, "");
const covers = eval(`(${arr})`);

// Cover entries carry a title as ["TypeScript", "for Backend"], not a dir.
// Match them to directories through book.config.json's titles.
const coverFor = (dir) => {
  const joined = (config.booklets.find((b) => b.dir === dir)?.title ?? "").toLowerCase();
  return covers.find((c) => {
    const t = c.title.join(" ").toLowerCase();
    // Keep hyphens. Stripping them turned "AI-Assisted" into "aiassisted",
    // which matched nothing, and booklet 9 silently lost its cover.
    return t.startsWith(joined.split(" ")[0]);
  });
};

async function copyPages(fromDir, toDir) {
  const files = (await readdir(fromDir)).filter((f) => f.endsWith(".md"));
  await mkdir(toDir, { recursive: true });
  for (const f of files) await copyFile(path.join(fromDir, f), path.join(toDir, f));
  return files.length;
}

async function writeJson(file, obj) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(obj, null, 2) + "\n");
}

async function migrateBook(dir, destFolder) {
  const entry = config.booklets.find((b) => b.dir === dir);
  const c = coverFor(dir);
  const n = await copyPages(path.join(SRC, dir), path.join(destFolder, "pages"));

  const meta = { title: entry?.title ?? dir, subtitle: entry?.cover || undefined };
  if (c) {
    // `pages` and `more` were hand-typed and go stale on every rebuild.
    // The new build computes them, so they are deliberately not copied.
    meta.cover = {
      accent: c.accent, title: c.title, banner: c.banner, kicker: c.kicker,
      term: c.term, stack: c.stack, face: c.face,
      companion: c.companion || undefined,
      label: c.label, setLine: c.setLine,
    };
  }
  await writeJson(path.join(destFolder, "meta.json"), meta);
  console.log(`  ${dir}  ->  ${path.relative(ROOT, destFolder)}  (${n} pages)`);
}

// ---- domain -----------------------------------------------------------
await writeJson(path.join(BOOKS, "tech", "meta.json"), {
  name: "Tech",
  blocks: ["mint", "note", "interview"],
});

// ---- the nine-booklet series -------------------------------------------
const seriesDir = path.join(BOOKS, "tech", SERIES);
await writeJson(path.join(seriesDir, "meta.json"), {
  title: config.title,
  subtitle: config.subtitle,
  masterVolume: true,
  order: IN_SERIES,
});
for (const dir of IN_SERIES) await migrateBook(dir, path.join(seriesDir, dir));

await copyPages(path.join(SRC, "frontmatter"), path.join(seriesDir, "frontmatter"));
await copyPages(path.join(SRC, "10-backmatter"), path.join(seriesDir, "backmatter"));
console.log("  frontmatter + backmatter copied");

// ---- standalone books (a series with its own pages/) --------------------
for (const dir of STANDALONE) await migrateBook(dir, path.join(BOOKS, "tech", dir));

console.log("\ndone. docs/ebook is untouched.");
