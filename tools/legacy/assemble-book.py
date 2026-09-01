"""Assemble the single combined volume.

    python assemble-book.py        -> out/typescript-to-deployment.pdf

Order:
    1  master cover                (cover-set p1)
    2  copyright                   (cover-set p2)
    3  what is inside              (cover-set p3)
    4  preface                     (frontmatter p2)
    5+ master contents             (generated here, module level, with pages)
       per booklet: its manga cover, then the booklet's pages
       glossary and the final note (backmatter)

Each booklet's own plain cover is dropped, because the manga cover replaces
it. Booklets keep their own n / total numbering, exactly as the source book
does. The master contents numbers are volume pages, not booklet pages.

Run first:
    node build-set.mjs
    node build.mjs --all
    node build.mjs frontmatter
    node build.mjs 10-backmatter
"""

import re
import subprocess
import sys
from pathlib import Path

import fitz

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = ROOT / "out"

BOOKLETS = [
    ("01-typescript", "TypeScript for Backend", "#2b5fa8"),
    ("02-nextjs", "Next.js, The Backend Half", "#121218"),
    ("03-node-core", "Node.js Core", "#3f7a33"),
    ("04-ecosystem", "The Node Ecosystem", "#b32d2b"),
    ("05-data", "Data & Messaging", "#2a5673"),
    ("06-api-design", "API & Service Design", "#5b2fa8"),
    ("07-ai-sdks", "AI SDKs for Backend", "#c25a35"),
    ("08-deployment", "Deployment & Ops on AWS", "#d0212f"),
    ("09-ai-practices", "AI-Assisted Engineering", "#0d7a7a"),
]

EBOOK = ROOT / "docs" / "ebook"


def need(p: Path, how: str) -> Path:
    if not p.exists():
        sys.exit(f"missing {p.name}  ->  {how}")
    return p


covers_pdf = need(OUT / "cover-set.pdf", "node build-set.mjs")
front_pdf = need(OUT / "frontmatter.pdf", "node build.mjs frontmatter")
back_pdf = need(OUT / "10-backmatter.pdf", "node build.mjs 10-backmatter")
for d, _, _ in BOOKLETS:
    need(OUT / f"{d}.pdf", "node build.mjs --all")


def sections_of(dir_name: str):
    """Module and part openers, read from the markdown rather than the PDF.

    One markdown file is one printed page, so a file's position in the sorted
    list is its position in the booklet. The contents pages sit between the
    cover and the first content page, and their count is whatever is left over.
    """
    src = EBOOK / dir_name
    files = sorted(f for f in src.iterdir()
                   if f.suffix == ".md" and not f.name.startswith("00-cover"))
    with fitz.open(OUT / f"{dir_name}.pdf") as d:
        toc_pages = d.page_count - 1 - len(files)
    toc_pages = max(1, toc_pages)

    out = []
    for i, f in enumerate(files):
        lines = [l.rstrip() for l in f.read_text(encoding="utf-8").splitlines()]
        # A "# " line inside a fenced block is a shell comment, not a heading.
        h1, fence = None, False
        for l in lines:
            if l.lstrip().startswith("```"):
                fence = not fence
                continue
            if not fence and l.startswith("# "):
                h1 = l[2:].strip()
                break
        if not h1:
            continue
        part = next((l for l in lines if 'class="part-num"' in l), None)
        if part:
            label = re.sub(r"<[^>]+>", "", part).strip()
            h1 = f"{label}: {h1}"
        out.append((h1, 1 + toc_pages + i + 1))
    return out


def build_master_toc(starts, toc_pages):
    """One HTML file, rendered by covers/render.mjs at A5."""
    rows = []
    for (d, title, accent), start in zip(BOOKLETS, starts):
        rows.append(
            f'<div class="b"><span class="n" style="color:{accent}">'
            f'{BOOKLETS.index((d, title, accent)) + 1}</span>'
            f'<span class="t">{title}</span><span class="dots"></span>'
            f'<span class="p">{start}</span></div>'
        )
        for head, off in sections_of(d):
            head = head.replace("&", "&amp;").replace("<", "&lt;")
            rows.append(
                f'<div class="s"><span class="t">{head}</span>'
                f'<span class="dots"></span><span class="p">{start + off - 1}</span></div>'
            )
    body = "\n".join(rows)
    html = f"""<!doctype html>
<meta charset="utf-8"><title>Contents</title>
<style>
  @page {{ size: 148mm 210mm; margin: 13mm 11mm 11mm 11mm; }}
  * {{ margin:0; padding:0; box-sizing:border-box; }}
  body {{ font-family: Georgia, serif; color:#1a1a1a; }}
  h1 {{ font-family: Georgia, serif; font-size: 20pt; margin-bottom: 5mm;
       padding-bottom: 2.5mm; border-bottom: 1.2pt solid #1a1a1a; }}
  .b, .s {{ display:flex; align-items:baseline; }}
  .b {{ margin-top: 3.4mm; font-size: 9.4pt; font-weight: 700; }}
  .s {{ font-size: 7.8pt; color:#3a3a42; padding-left: 6mm; margin-top: .5mm; }}
  .n {{ font-family: Consolas, monospace; font-weight:700; font-size: 8.4pt;
        width: 5mm; flex: 0 0 auto; }}
  .t {{ flex: 0 1 auto; }}
  .dots {{ flex:1 1 auto; min-width:3mm; margin:0 1.5mm;
           border-bottom: .5pt dotted #bcbcbc; transform: translateY(-.5mm); }}
  .p {{ flex:0 0 auto; font-family: Consolas, monospace; font-size: 7pt; color:#6a6a72; }}
  .b .p {{ font-size: 8pt; font-weight:700; color:#1a1a1a; }}
</style>
<h1>Contents</h1>
{body}
"""
    (HERE / "master-toc.html").write_text(html, encoding="utf-8")
    subprocess.run(["node", "render.mjs", "master-toc.html"], cwd=HERE,
                   check=True, capture_output=True)
    with fitz.open(OUT / "cover-master-toc.pdf") as d:
        return d.page_count


# ---- work out how long the master contents runs, then settle the numbers ----
FRONT_FIXED = 4          # master cover, copyright, what is inside, preface
toc_pages = 2
for _ in range(4):
    starts, cursor = [], FRONT_FIXED + toc_pages + 1
    for d, _, _ in BOOKLETS:
        starts.append(cursor)
        with fitz.open(OUT / f"{d}.pdf") as b:
            cursor += b.page_count        # 1 manga cover replaces 1 plain cover
    measured = build_master_toc(starts, toc_pages)
    if measured == toc_pages:
        break
    toc_pages = measured

# ---- assemble ---------------------------------------------------------------
book = fitz.open()
toc = []
covers = fitz.open(covers_pdf)

for idx, label in [(0, "Cover"), (1, "Copyright"), (2, "What Is Inside")]:
    toc.append([1, label, book.page_count + 1])
    book.insert_pdf(covers, from_page=idx, to_page=idx)

with fitz.open(front_pdf) as f:
    toc.append([1, "Preface", book.page_count + 1])
    book.insert_pdf(f, from_page=1, to_page=1)          # preface only

toc.append([1, "Contents", book.page_count + 1])
with fitz.open(OUT / "cover-master-toc.pdf") as t:
    book.insert_pdf(t)

for i, (d, title, _) in enumerate(BOOKLETS):
    start = book.page_count + 1
    toc.append([1, f"{i + 1}. {title}", start])
    book.insert_pdf(covers, from_page=3 + i, to_page=3 + i)
    with fitz.open(OUT / f"{d}.pdf") as b:
        book.insert_pdf(b, from_page=1, to_page=b.page_count - 1)
    toc.append([2, "Table Of Content", start + 1])
    print(f"  {d:<18} p{start:<5} {title}")

with fitz.open(back_pdf) as bm:
    toc.append([1, "Glossary", book.page_count + 1])
    toc.append([1, "A Final Note", book.page_count + bm.page_count])
    book.insert_pdf(bm)

covers.close()
book.set_toc(toc)
book.set_metadata({
    "title": "TypeScript to Deployment: The Ultimate Guide",
    "author": "Kaleem Ahmed",
    "subject": "Backend engineering, from a type annotation to production on AWS",
    "keywords": "typescript, node, nextjs, postgres, redis, api, ai, docker, aws, devops",
    "creator": "kaleemahmed.in",
    "producer": "kaleemahmed.in",
})

dest = OUT / "typescript-to-deployment.pdf"
book.save(dest, garbage=4, deflate=True, deflate_images=True,
          deflate_fonts=True, clean=True)

print()
print(f"pdf    {dest}")
print(f"       {book.page_count} pages, {dest.stat().st_size / 1024 / 1024:.1f} MB, "
      f"{len(toc)} bookmarks, contents runs {toc_pages} pages")
