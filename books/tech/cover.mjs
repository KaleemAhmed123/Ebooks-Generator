// Cover generator for the tech domain — the manga panel look.
//
// Ported from docs/ebook/covers/build-set.mjs, which drew all covers into one
// separate PDF that then had to be stapled onto each booklet. This draws one
// cover for one book and hands it back as SVG, so the build can print it as
// page 1 of the book itself. No second render, no PDF merging.
//
// A domain supplies its own cover.mjs. The build looks for one along the
// folder chain and uses the deepest it finds. No cover.mjs means the book's
// own 00-cover.md page is used instead.
//
// export cover(meta, ctx) -> SVG string, drawn on a 592x840 canvas
//   meta  the book's meta.json
//   ctx   { author, site, year, edition, pages, more, index, total }
//         pages and more are COMPUTED by the build, never typed by hand.

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Shrink a display line until it fits the panel width.
const fit = (text, width, ratio, max) =>
  Math.min(max, Math.floor(width / (text.length * ratio)));

const brows = {
  sharp: `<path d="M262 328 L288 336" stroke="#12121a" stroke-width="6" stroke-linecap="round"/>
          <path d="M304 336 L330 328" stroke="#12121a" stroke-width="6" stroke-linecap="round"/>`,
  raised: `<path d="M262 330 L288 322" stroke="#12121a" stroke-width="6" stroke-linecap="round"/>
           <path d="M304 322 L330 330" stroke="#12121a" stroke-width="6" stroke-linecap="round"/>`,
  flat: `<path d="M262 328 L288 326" stroke="#12121a" stroke-width="6" stroke-linecap="round"/>
         <path d="M304 326 L330 328" stroke="#12121a" stroke-width="6" stroke-linecap="round"/>`,
};

const mouths = {
  flat: `<path d="M287 391 H305" stroke="#12121a" stroke-width="3" stroke-linecap="round"/>`,
  smile: `<path d="M285 388 Q296 399 307 388" stroke="#12121a" stroke-width="3" fill="none" stroke-linecap="round"/>`,
};

const character = (f, accent) => `
  <g transform="rotate(${f.tilt} 296 352)">
    <path d="M188 570 Q192 466 272 436 L296 462 L320 436 Q400 466 404 570 Z" fill="#12121a"/>
    <path d="M198 570 Q202 482 272 452 L296 476 L320 452 Q390 482 394 570 Z" fill="#fff"/>
    <path d="M198 570 Q202 482 272 452 L296 476 L320 452 Q390 482 394 570 Z" fill="url(#toneDense)"/>
    <path d="M278 402 L278 440 L314 440 L314 402 Z" fill="#fff" stroke="#12121a" stroke-width="3"/>
    <path d="M240 300 Q234 220 296 214 Q358 220 352 300 L352 340 L240 340 Z" fill="#12121a"/>
    <path d="M240 288 L192 250 L242 262 Z" fill="#12121a"/>
    <path d="M240 320 L188 316 L242 300 Z" fill="#12121a"/>
    <path d="M352 288 L400 250 L350 262 Z" fill="#12121a"/>
    <path d="M352 320 L404 316 L350 300 Z" fill="#12121a"/>
    <path d="M252 288 L252 348 Q252 386 296 408 Q340 386 340 348 L340 288 Z"
          fill="#fff" stroke="#12121a" stroke-width="3.5"/>
    <path d="M246 290 L272 330 L286 288 L296 328 L306 288 L320 330 L346 290
             Q346 258 296 254 Q246 258 246 290 Z" fill="#12121a"/>
    ${brows[f.brow]}
    <path d="M264 352 L288 346 L288 368 L266 366 Z" fill="#12121a"/>
    <path d="M304 346 L328 352 L326 366 L304 368 Z" fill="#12121a"/>
    <rect x="269" y="350" width="7" height="8" fill="#fff"/>
    <rect x="314" y="351" width="7" height="8" fill="#fff"/>
    ${mouths[f.mouth]}
    <path d="M236 306 Q240 212 296 206 Q352 212 356 306"
          stroke="${accent}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <rect x="220" y="296" width="28" height="50" rx="11" fill="${accent}"/>
    <rect x="344" y="296" width="28" height="50" rx="11" fill="${accent}"/>
  </g>`;

const paperDefs = (id) => `
    <radialGradient id="burst${id}" cx=".5" cy=".38" r=".72">
      <stop offset="0" stop-color="#ffe98f"/><stop offset="1" stop-color="#f2b40c"/>
    </radialGradient>
    <pattern id="tone${id}" width="7" height="7" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.5" fill="#12121a" fill-opacity=".38"/>
    </pattern>
    <pattern id="toneDense" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.4" fill="#12121a" fill-opacity=".65"/>
    </pattern>`;

const speedLines = `
  <g fill="#12121a" opacity=".10">
    <path d="M296 390 L-40 76 L-6 40 Z"/><path d="M296 390 L118 -70 L168 -80 Z"/>
    <path d="M296 390 L300 -92 L350 -78 Z"/><path d="M296 390 L476 -66 L516 -22 Z"/>
    <path d="M296 390 L650 70 L676 112 Z"/><path d="M296 390 L694 330 L702 380 Z"/>
    <path d="M296 390 L-100 330 L-106 382 Z"/><path d="M296 390 L-76 560 L-98 506 Z"/>
    <path d="M296 390 L670 560 L694 510 Z"/>
  </g>`;

const TERM_FILL = ["#f4f0e6", "#8de8a6", "#ffd166", "#7de7f7"];

export function cover(meta, ctx) {
  const b = meta.cover;
  const id = ctx.index || 1;
  const [t1, t2] = b.title;
  const kicker = b.kicker ?? "";
  const seriesLine = ctx.seriesLine ?? "";

  const term = (b.term ?? [])
    .map(([txt, c], i) =>
      `<text x="372" y="${266 + i * 22}" fill="${TERM_FILL[c]}">${esc(txt)}</text>`)
    .join("\n    ");
  const stack = (b.stack ?? [])
    .map((s, i) => `<text x="374" y="${428 + i * 20}">${esc(s)}</text>`)
    .join("\n    ");

  return `<svg viewBox="0 0 592 840" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${paperDefs(id)}
    <clipPath id="clipChar${id}"><rect x="28" y="232" width="314" height="326"/></clipPath>
  </defs>

  <rect width="592" height="840" fill="url(#burst${id})"/>
  ${speedLines}

  <!-- panel 1 : title -->
  <rect x="26" y="26" width="540" height="190" fill="#faf7ef" stroke="#12121a" stroke-width="4"/>
  <text x="50" y="66" font-family="Consolas, monospace" font-size="10" letter-spacing="4.5"
        fill="#6a6a72">${esc(seriesLine.toUpperCase())}</text>
  <text x="50" y="132" font-family="Georgia, serif" font-weight="700"
        font-size="${fit(t1, 500, 0.52, 54)}" fill="#12121a" letter-spacing="-2">${esc(t1)}</text>
  <text x="50" y="188" font-family="Georgia, serif" font-weight="700"
        font-size="${fit(t2, 500, 0.52, 54)}" fill="${b.accent}" letter-spacing="-2">${esc(t2)}</text>

  <!-- panel 2 : character -->
  <rect x="26" y="230" width="318" height="330" fill="#fff" stroke="#12121a" stroke-width="4"/>
  <g clip-path="url(#clipChar${id})">
    <rect x="28" y="232" width="314" height="326" fill="url(#tone${id})"/>
    <g stroke="#12121a" stroke-width="1.5" opacity=".4">
      <path d="M185 392 L28 246M185 392 L120 232M185 392 L250 232M185 392 L342 258
               M185 392 L342 384M185 392 L342 524M185 392 L200 556M185 392 L40 536M185 392 L28 384"/>
    </g>
    <g transform="translate(185,392) scale(.74) translate(-296,-352)">
      ${character(b.face, b.accent)}
    </g>
  </g>
  <rect x="26" y="230" width="318" height="330" fill="none" stroke="#12121a" stroke-width="4"/>

  <!-- panel 3 : terminal -->
  <rect x="356" y="230" width="210" height="158" fill="#12121a" stroke="#12121a" stroke-width="4"/>
  <g font-family="Consolas, monospace" font-size="10.5">
    ${term}
  </g>

  <!-- panel 4 : topics -->
  <rect x="356" y="402" width="210" height="158" fill="#faf7ef" stroke="#12121a" stroke-width="4"/>
  <g font-family="Georgia, serif" font-size="12.5" fill="#12121a">
    ${stack}
  </g>
  <text x="374" y="550" font-family="Consolas, monospace" font-size="10" font-weight="700"
        letter-spacing="1" fill="${b.accent}">+ ${ctx.more} MORE TOPICS INSIDE</text>

  <!-- panel 5 : banner -->
  <rect x="26" y="574" width="540" height="94" fill="${b.accent}" stroke="#12121a" stroke-width="4"/>
  <text x="50" y="618" font-family="Verdana, sans-serif" font-style="italic" font-weight="800"
        font-size="${fit(b.banner, 470, 0.63, 30)}" fill="#fff" letter-spacing="-.5">${esc(b.banner)}</text>
  <text x="50" y="648" font-family="Consolas, monospace"
        font-size="${kicker.length > 44 ? 9 : 10.5}"
        letter-spacing="${kicker.length > 44 ? 1.8 : 3.2}"
        fill="#ffffff" opacity=".85">${esc(kicker)}</text>

  <!-- footer -->
  <text x="26" y="716" font-family="Verdana, sans-serif" font-weight="700" font-size="26"
        fill="#12121a" letter-spacing="-.5">${esc(ctx.author)}</text>
  <text x="26" y="740" font-family="Consolas, monospace" font-size="13" font-weight="700"
        letter-spacing="2.5" fill="${b.accent}">${esc(ctx.site)}</text>
  <text x="566" y="716" text-anchor="end" font-family="Consolas, monospace" font-size="12"
        letter-spacing="3" fill="#12121a">${esc(b.label ?? `BOOKLET ${ctx.index} OF ${ctx.total}`)}</text>
  <text x="566" y="740" text-anchor="end" font-family="Consolas, monospace" font-size="10"
        letter-spacing="2" fill="#4a4a52">${ctx.pages} PAGES</text>
  <path d="M26 758 H566" stroke="#12121a" stroke-width="3"/>
  <text x="26" y="784" font-family="Consolas, monospace" font-size="9" letter-spacing="1.4"
        fill="#4a4a52">© ${ctx.year} ${esc(ctx.author).toUpperCase()} · ALL RIGHTS RESERVED · NOT FOR RESALE</text>
  <text x="26" y="802" font-family="Consolas, monospace" font-size="9" letter-spacing="1.4"
        fill="#4a4a52">${esc(ctx.edition).toUpperCase()} · ${esc(b.setLine ?? `PART OF A ${ctx.total} BOOKLET SET`)}</text>
</svg>`;
}
