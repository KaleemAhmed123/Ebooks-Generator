// Generate the cover set: a master cover for the merged book, a copyright
// page, a contact sheet, and the nine booklet covers.
//
//   node build-set.mjs        -> out/cover-set.pdf
//
// Samples only. Nothing here is wired into the booklets.

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, "..", "..", "..", "out");

const AUTHOR = "Kaleem Ahmed";
const SITE = "kaleemahmed.in";
const YEAR = "2026";
const EDITION = "First edition";
const TOTAL_PAGES = "1,193";

/* ---------------------------------------------------------------- data --- */

const BOOKLETS = [
  {
    n: 1, accent: "#2b5fa8", pages: 85, title: ["TypeScript", "for Backend"],
    banner: "TYPE IT ONCE. TRUST IT EVERYWHERE.",
    kicker: "STRICT MODE · GENERICS · GUARDS · UTILITY TYPES",
    term: [["$ npx tsc --noEmit", 0], ["✓ 0 errors", 1], ["$ npx tsx src/index.ts", 0], ["✓ listening :3000", 1], ["$ _", 2]],
    stack: ["tsc · tsx · tsup", "strict flags", "discriminated unions", "generics · infer", "utility types", "ESM & CJS interop"],
    more: 61,
    face: { brow: "sharp", mouth: "flat", tilt: -3 },
  },
  {
    n: 2, accent: "#121218", pages: 56, title: ["Next.js", "The Backend Half"],
    banner: "SERVER FIRST. CLIENT WHEN NEEDED.",
    kicker: "ROUTE HANDLERS · SERVER ACTIONS · CACHING · RUNTIMES",
    term: [["$ next build", 0], ["✓ 42 static", 1], ["✓ 8 dynamic", 1], ["$ next start", 0], ["$ _", 2]],
    stack: ["Route Handlers", "Server Actions", "the four caches", "instrumentation.ts", "server-only", "edge vs node"],
    more: 43,
    face: { brow: "raised", mouth: "smile", tilt: 2 },
  },
  {
    n: 3, accent: "#3f7a33", pages: 84, title: ["Node.js", "Core"],
    banner: "ONE THREAD. NEVER BLOCK IT.",
    kicker: "EVENT LOOP · STREAMS · WORKERS · SHUTDOWN",
    term: [["$ node --import ./t.js app", 0], ["✓ loop lag 0.4ms", 1], ["$ kill -TERM 1", 0], ["✓ drained, exit 0", 1], ["$ _", 2]],
    stack: ["event loop phases", "streams · backpressure", "worker_threads", "crypto · net", "diagnostics_channel", "SIGTERM handling"],
    more: 61,
    face: { brow: "sharp", mouth: "flat", tilt: 0 },
  },
  {
    n: 4, accent: "#b32d2b", pages: 170, title: ["The Node", "Ecosystem"],
    banner: "KNOW THE BASICS. KNOW THE GOTCHA.",
    kicker: "EXPRESS · ZOD · BULLMQ · PINO · VITEST",
    term: [["$ npm ci --omit=dev", 0], ["✓ 412 packages", 1], ["$ npx vitest run", 0], ["✓ 318 passed", 1], ["$ _", 2]],
    stack: ["Express 5", "Zod · validation", "BullMQ · queues", "pino · logging", "Vitest · testing", "Socket.IO · realtime"],
    more: 90,
    face: { brow: "raised", mouth: "smile", tilt: -2 },
  },
  {
    n: 5, accent: "#2a5673", pages: 52, title: ["Data &", "Messaging"],
    banner: "THE DATA MODEL IS THE SYSTEM.",
    kicker: "POSTGRES · MONGODB · REDIS · RABBITMQ · KAFKA",
    term: [["$ psql -U app", 0], ["✓ 1 row in 2.1ms", 1], ["$ redis-cli ping", 0], ["✓ PONG", 1], ["$ _", 2]],
    stack: ["Postgres · Prisma", "MongoDB · Mongoose", "indexes · query plans", "transactions", "Redis · caching", "queues · the outbox"],
    more: 39,
    face: { brow: "flat", mouth: "flat", tilt: 3 },
  },
  {
    n: 6, accent: "#5b2fa8", pages: 65, title: ["API & Service", "Design"],
    banner: "THE CONTRACT IS WHAT YOU CANNOT CHANGE.",
    kicker: "REST · AUTH · WEBHOOKS · REAL-TIME · WEBRTC",
    term: [["$ curl -i /api/v1/orders", 0], ["✓ 201 Created", 1], ["✓ Idempotency-Key ok", 1], ["✓ 42ms", 1], ["$ _", 2]],
    stack: ["REST · status codes", "cursor pagination", "OAuth · JWT", "idempotency keys", "webhooks · signing", "SSE · WebSockets"],
    more: 49,
    face: { brow: "sharp", mouth: "smile", tilt: -3 },
  },
  {
    n: 7, accent: "#c25a35", pages: 161, title: ["AI SDKs", "for Backend"],
    banner: "A MODEL IS A STATELESS HTTP CALL.",
    kicker: "TOOLS · STREAMING · RAG · AGENTS · COST",
    term: [["$ node agent.js", 0], ["→ tool: get_order", 3], ["✓ 2 steps · 1.2k tok", 1], ["✓ $0.004", 1], ["$ _", 2]],
    stack: ["OpenAI · Anthropic", "AI SDK 7", "tool calling", "prompt caching", "RAG · pgvector", "agents · MCP"],
    more: 103,
    face: { brow: "raised", mouth: "flat", tilt: 2 },
  },
  {
    n: 8, accent: "#d0212f", pages: 383, title: ["Deployment", "& Ops on AWS"],
    banner: "GET IT LIVE. KEEP IT UP.",
    kicker: "DOCKER · VPS · SELF-HOSTING · AWS · MONITORING",
    term: [["$ ssh prod", 0], ["✓ healthy", 1], ["$ ./deploy.sh", 0], ["✓ migrated · 200 OK", 1], ["$ _", 2]],
    stack: ["Docker · Compose", "VPS · Caddy · Nginx", "GitHub Actions", "EC2 · ECS · RDS", "Prometheus · Loki", "Grafana · playbooks"],
    more: 199,
    face: { brow: "sharp", mouth: "flat", tilt: 0 },
  },
  {
    n: 9, accent: "#0d7a7a", pages: 103, title: ["AI-Assisted", "Engineering"],
    banner: "YOU OWN EVERY LINE YOU MERGE.",
    kicker: "AGENTS.MD · SPEC-DRIVEN · REVIEW · SECURITY",
    term: [["$ git diff --stat", 0], ["  6 files, +142 -18", 0], ["$ npx vitest run", 0], ["✓ 20/20 evals pass", 1], ["$ _", 2]],
    stack: ["AGENTS.md", "spec-driven dev", "reviewing AI code", "slopsquatting", "verification loops", "team practice"],
    more: 79,
    face: { brow: "flat", mouth: "smile", tilt: -2 },
  },
  {
    // A standalone companion, not one of the nine. `companion` keeps it off the
    // master cover's contents list and off the "9 booklets" stats strip, and
    // swaps the numbered footer for an unnumbered one.
    n: 10, companion: true,
    label: "COMPANION BOOKLET", setLine: "STANDALONE COMPANION BOOKLET",
    accent: "#8a4bd0", pages: 371, title: ["VPS Deployment", "& Ops"],
    banner: "ONE BOX. NO DOWNTIME. A WAY BACK.",
    kicker: "UBUNTU · DOCKER · NGINX · ACTIONS · BLUE-GREEN · RECOVERY",
    term: [["$ ./deploy.sh", 0], ["  green healthy 14/14", 1], ["  flip -> green", 1], ["✓ 0 dropped requests", 1], ["$ _", 2]],
    stack: ["hardening · ufw", "Docker · Compose", "Nginx · Let's Encrypt", "GitHub Actions · GHCR", "blue-green deploys", "restic · 30-min rebuild"],
    more: 186,
    face: { brow: "raised", mouth: "flat", tilt: 3 },
  },
  {
    n: 11, companion: true,
    label: "COMPANION BOOKLET", setLine: "STANDALONE COMPANION BOOKLET",
    accent: "#1f6f8b", pages: 385, title: ["Frontend", "Mastery"],
    banner: "THE BROWSER IS NOT A BLACK BOX.",
    kicker: "REACT 19 · NEXT 16 · TAILWIND 4 · VITE 8 · A11Y · CSP · OTEL",
    term: [["$ npx vitest run", 0], ["  ✓ 214 passed", 1], ["$ npx playwright test", 0], ["  ✓ 18 passed  3 browsers", 1], ["$ _", 2]],
    stack: ["rendering path · CSS", "closures · the event loop", "React 19 · the compiler", "Next 16 · cache components", "Tailwind 4 · design systems", "vitals · speculation rules", "a11y · the law · CSP", "supply chain · OpenTelemetry"],
    more: 108,
    face: { brow: "flat", mouth: "smile", tilt: -3 },
  },
];

/* ------------------------------------------------------------- helpers --- */

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Shrink a display line until it fits the panel width.
const fit = (text, width, ratio, max) =>
  Math.min(max, Math.floor(width / (text.length * ratio)));

/* ------------------------------------------------------------ drawing --- */

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

/* -------------------------------------------------------- master cover --- */

function masterCover() {
  return `
<section class="sheet">
<svg viewBox="0 0 592 840" xmlns="http://www.w3.org/2000/svg">
  <defs>${paperDefs("M")}</defs>
  <rect width="592" height="840" fill="url(#burstM)"/>
  ${speedLines}

  <!-- title panel -->
  <rect x="26" y="26" width="540" height="204" fill="#faf7ef" stroke="#12121a" stroke-width="4"/>
  <text x="50" y="64" font-family="Consolas, monospace" font-size="9.5" letter-spacing="2.6"
        fill="#6a6a72">A COMPLETE BACKEND REFERENCE · NINE BOOKLETS IN ONE VOLUME</text>
  <text x="50" y="122" font-family="Georgia, serif" font-weight="700" font-size="50"
        fill="#12121a" letter-spacing="-2">TypeScript to</text>
  <text x="50" y="176" font-family="Georgia, serif" font-weight="700" font-size="50"
        fill="#d0212f" letter-spacing="-2">Deployment</text>
  <text x="50" y="212" font-family="Verdana, sans-serif" font-style="italic" font-weight="800"
        font-size="21" fill="#12121a" letter-spacing="-.5">THE ULTIMATE GUIDE</text>

  <!-- character panel -->
  <rect x="26" y="244" width="318" height="330" fill="#fff" stroke="#12121a" stroke-width="4"/>
  <g clip-path="url(#clipM)">
    <rect x="28" y="246" width="314" height="326" fill="url(#toneM)"/>
    <g stroke="#12121a" stroke-width="1.5" opacity=".4">
      <path d="M185 406 L28 260M185 406 L120 246M185 406 L250 246M185 406 L342 272
               M185 406 L342 398M185 406 L342 538M185 406 L200 570M185 406 L40 550M185 406 L28 398"/>
    </g>
    <g transform="translate(185,406) scale(.76) translate(-296,-352)">
      ${character({ brow: "sharp", mouth: "smile", tilt: 0 }, "#d0212f")}
    </g>
  </g>
  <rect x="26" y="244" width="318" height="330" fill="none" stroke="#12121a" stroke-width="4"/>
  <clipPath id="clipM"><rect x="28" y="246" width="314" height="326"/></clipPath>

  <!-- contents panel -->
  <rect x="356" y="244" width="210" height="330" fill="#faf7ef" stroke="#12121a" stroke-width="4"/>
  <text x="374" y="272" font-family="Consolas, monospace" font-size="9" letter-spacing="2.5"
        fill="#6a6a72">INSIDE</text>
  ${BOOKLETS.filter((b) => !b.companion).map((b, i) => `
  <text x="374" y="${296 + i * 26}" font-family="Georgia, serif" font-size="12" fill="#12121a">
    <tspan font-family="Consolas, monospace" font-size="10" font-weight="700"
           fill="${b.accent}">${b.n}</tspan>  ${esc(b.title[0])}</text>
  <text x="392" y="${308 + i * 26}" font-family="Georgia, serif" font-size="9.5"
        fill="#6a6a72">${esc(b.title[1])}</text>`).join("")}

  <!-- stats strip -->
  <rect x="26" y="588" width="540" height="54" fill="#12121a" stroke="#12121a" stroke-width="4"/>
  <text x="52"  y="622" font-family="Verdana, sans-serif" font-weight="800" font-size="20" fill="#ffd166">9</text>
  <text x="74"  y="622" font-family="Consolas, monospace" font-size="9" letter-spacing="1.2" fill="#f4f0e6">BOOKLETS</text>
  <text x="176" y="622" font-family="Verdana, sans-serif" font-weight="800" font-size="20" fill="#ffd166">${TOTAL_PAGES}</text>
  <text x="246" y="622" font-family="Consolas, monospace" font-size="9" letter-spacing="1.2" fill="#f4f0e6">PAGES</text>
  <text x="316" y="622" font-family="Verdana, sans-serif" font-weight="800" font-size="20" fill="#ffd166">750+</text>
  <text x="385" y="622" font-family="Consolas, monospace" font-size="9" letter-spacing="1.2" fill="#f4f0e6">TOPICS</text>
  <text x="436" y="622" font-family="Verdana, sans-serif" font-weight="800" font-size="20" fill="#ffd166">38</text>
  <text x="470" y="622" font-family="Consolas, monospace" font-size="9" letter-spacing="1.2" fill="#f4f0e6">DIAGRAMS</text>

  <!-- banner -->
  <rect x="26" y="650" width="540" height="86" fill="#d0212f" stroke="#12121a" stroke-width="4"/>
  <text x="50" y="692" font-family="Verdana, sans-serif" font-style="italic" font-weight="800"
        font-size="${fit("FROM YOUR FIRST TYPE TO 3AM ON CALL.", 470, 0.62, 26)}"
        fill="#fff" letter-spacing="-.5">FROM YOUR FIRST TYPE TO 3AM ON CALL.</text>
  <text x="50" y="720" font-family="Consolas, monospace" font-size="8.5" letter-spacing="1.1"
        fill="#ffffff" opacity=".85">TYPESCRIPT · NEXT.JS · NODE · DATA · APIS · AI · DOCKER · AWS · OPS</text>

  <!-- footer -->
  <text x="26" y="774" font-family="Verdana, sans-serif" font-weight="700" font-size="26"
        fill="#12121a" letter-spacing="-.5">${AUTHOR}</text>
  <text x="26" y="798" font-family="Consolas, monospace" font-size="13" font-weight="700"
        letter-spacing="2.5" fill="#d0212f">${SITE}</text>
  <text x="566" y="774" text-anchor="end" font-family="Consolas, monospace" font-size="10"
        letter-spacing="2.5" fill="#12121a">${EDITION.toUpperCase()} · ${YEAR}</text>
  <text x="566" y="798" text-anchor="end" font-family="Consolas, monospace" font-size="9"
        letter-spacing="1.6" fill="#4a4a52">© ${YEAR} ${AUTHOR.toUpperCase()} · ALL RIGHTS RESERVED</text>
  <path d="M26 812 H566" stroke="#12121a" stroke-width="3"/>
</svg>
</section>`;
}

/* ----------------------------------------------------- copyright page --- */

function copyrightPage() {
  const para = (y, size, fill, txt, family = "Georgia, serif", weight = "400") =>
    `<text x="50" y="${y}" font-family="${family}" font-weight="${weight}" font-size="${size}" fill="${fill}">${esc(txt)}</text>`;

  return `
<section class="sheet">
<svg viewBox="0 0 592 840" xmlns="http://www.w3.org/2000/svg">
  <rect width="592" height="840" fill="#faf7ef"/>
  <rect x="0" y="0" width="592" height="10" fill="#d0212f"/>

  ${para(78, 24, "#12121a", "TypeScript to Deployment", "Georgia, serif", "700")}
  ${para(104, 15, "#4a4a52", "The Ultimate Guide · Nine booklets in one volume")}

  <path d="M50 126 H542" stroke="#12121a" stroke-width="2"/>

  ${para(158, 12.5, "#12121a", `${EDITION}, ${YEAR}`, "Consolas, monospace")}
  ${para(180, 12.5, "#12121a", `Written and published by ${AUTHOR}`, "Consolas, monospace")}
  ${para(202, 12.5, "#12121a", SITE, "Consolas, monospace", "700")}
  ${para(224, 12.5, "#12121a", `${TOTAL_PAGES} pages · 9 booklets · A5`, "Consolas, monospace")}

  <path d="M50 250 H542" stroke="#c9c4b6" stroke-width="1.5"/>

  ${para(286, 16, "#12121a", `Copyright © ${YEAR} ${AUTHOR}. All rights reserved.`, "Georgia, serif", "700")}

  ${para(322, 12.5, "#2a2a32", "No part of this publication may be reproduced, distributed, stored in a")}
  ${para(342, 12.5, "#2a2a32", "retrieval system, or transmitted in any form or by any means, electronic,")}
  ${para(362, 12.5, "#2a2a32", "mechanical, photocopying, recording, screenshotting or otherwise,")}
  ${para(382, 12.5, "#2a2a32", "without the prior written permission of the author, except for brief")}
  ${para(402, 12.5, "#2a2a32", "quotations in a review, with attribution.")}

  ${para(438, 12.5, "#2a2a32", "This copy is licensed to a single reader. It may not be resold, sub-licensed,")}
  ${para(458, 12.5, "#2a2a32", "rented, lent, uploaded to a file-sharing service, republished under another")}
  ${para(478, 12.5, "#2a2a32", "name, used as course material, or fed into a model for training or resale.")}

  <rect x="50" y="502" width="492" height="52" fill="#fff" stroke="#d0212f" stroke-width="2"/>
  ${para(524, 12.5, "#12121a", "Bought a copy? Thank you. Found one somewhere else?", "Georgia, serif", "700")}
  ${para(544, 12, "#4a4a52", `Get the real one, kept up to date, at ${SITE}`)}

  ${para(590, 12.5, "#2a2a32", "Trademarks and product names are the property of their respective owners")}
  ${para(610, 12.5, "#2a2a32", "and are used for identification only. This book is not affiliated with,")}
  ${para(630, 12.5, "#2a2a32", "endorsed by, or sponsored by any company named in it.")}

  ${para(666, 12.5, "#2a2a32", "Every command, version and configuration was verified at the time of")}
  ${para(686, 12.5, "#2a2a32", "writing. Software moves. Verify against current documentation before")}
  ${para(706, 12.5, "#2a2a32", "running anything against production. The author accepts no liability for")}
  ${para(726, 12.5, "#2a2a32", "loss or damage arising from use of the material in this book.")}

  <path d="M50 762 H542" stroke="#c9c4b6" stroke-width="1.5"/>
  ${para(788, 11, "#6a6a72", `Written by ${AUTHOR}, backend engineer. Contact and updates at ${SITE}`, "Consolas, monospace")}
  ${para(806, 11, "#6a6a72", `Cover, illustration and typesetting by the author.`, "Consolas, monospace")}
</svg>
</section>`;
}

/* ------------------------------------------------------ booklet cover --- */

function cover(b) {
  const [t1, t2] = b.title;
  const term = b.term
    .map(([txt, c], i) =>
      `<text x="372" y="${266 + i * 22}" fill="${TERM_FILL[c]}">${esc(txt)}</text>`)
    .join("\n    ");
  const stack = b.stack
    .map((s, i) => `<text x="374" y="${428 + i * 20}">${esc(s)}</text>`)
    .join("\n    ");

  return `
<section class="sheet">
<svg viewBox="0 0 592 840" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${paperDefs(b.n)}
    <clipPath id="clipChar${b.n}"><rect x="28" y="232" width="314" height="326"/></clipPath>
  </defs>

  <rect width="592" height="840" fill="url(#burst${b.n})"/>
  ${speedLines}

  <!-- panel 1 : title -->
  <rect x="26" y="26" width="540" height="190" fill="#faf7ef" stroke="#12121a" stroke-width="4"/>
  <text x="50" y="66" font-family="Consolas, monospace" font-size="10" letter-spacing="4.5"
        fill="#6a6a72">TYPESCRIPT TO DEPLOYMENT · THE ULTIMATE GUIDE</text>
  <text x="50" y="132" font-family="Georgia, serif" font-weight="700"
        font-size="${fit(t1, 500, 0.52, 54)}" fill="#12121a" letter-spacing="-2">${esc(t1)}</text>
  <text x="50" y="188" font-family="Georgia, serif" font-weight="700"
        font-size="${fit(t2, 500, 0.52, 54)}" fill="${b.accent}" letter-spacing="-2">${esc(t2)}</text>

  <!-- panel 2 : character -->
  <rect x="26" y="230" width="318" height="330" fill="#fff" stroke="#12121a" stroke-width="4"/>
  <g clip-path="url(#clipChar${b.n})">
    <rect x="28" y="232" width="314" height="326" fill="url(#tone${b.n})"/>
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
        letter-spacing="1" fill="${b.accent}">+ ${b.more} MORE TOPICS INSIDE</text>

  <!-- panel 5 : banner -->
  <rect x="26" y="574" width="540" height="94" fill="${b.accent}" stroke="#12121a" stroke-width="4"/>
  <text x="50" y="618" font-family="Verdana, sans-serif" font-style="italic" font-weight="800"
        font-size="${fit(b.banner, 470, 0.63, 30)}" fill="#fff" letter-spacing="-.5">${esc(b.banner)}</text>
  <text x="50" y="648" font-family="Consolas, monospace"
        font-size="${b.kicker.length > 44 ? 9 : 10.5}"
        letter-spacing="${b.kicker.length > 44 ? 1.8 : 3.2}"
        fill="#ffffff" opacity=".85">${esc(b.kicker)}</text>

  <!-- footer -->
  <text x="26" y="716" font-family="Verdana, sans-serif" font-weight="700" font-size="26"
        fill="#12121a" letter-spacing="-.5">${AUTHOR}</text>
  <text x="26" y="740" font-family="Consolas, monospace" font-size="13" font-weight="700"
        letter-spacing="2.5" fill="${b.accent}">${SITE}</text>
  <text x="566" y="716" text-anchor="end" font-family="Consolas, monospace" font-size="12"
        letter-spacing="3" fill="#12121a">${b.label ?? `BOOKLET ${b.n} OF 9`}</text>
  <text x="566" y="740" text-anchor="end" font-family="Consolas, monospace" font-size="10"
        letter-spacing="2" fill="#4a4a52">${b.pages} PAGES</text>
  <path d="M26 758 H566" stroke="#12121a" stroke-width="3"/>
  <text x="26" y="784" font-family="Consolas, monospace" font-size="9" letter-spacing="1.4"
        fill="#4a4a52">© ${YEAR} ${AUTHOR.toUpperCase()} · ALL RIGHTS RESERVED · NOT FOR RESALE</text>
  <text x="26" y="802" font-family="Consolas, monospace" font-size="9" letter-spacing="1.4"
        fill="#4a4a52">${EDITION.toUpperCase()} · ${b.setLine ?? "PART OF A NINE BOOKLET SET"}</text>
</svg>
</section>`;
}

/* ------------------------------------------------------- contact sheet --- */

function contactSheet() {
  const cells = BOOKLETS.map((b, i) => {
    const col = i % 3, row = (i / 3) | 0;
    const x = 34 + col * 178, y = 118 + row * 236;
    return `
    <g transform="translate(${x},${y})">
      <rect width="164" height="220" fill="url(#miniPaper)" stroke="#12121a" stroke-width="2.5"/>
      <rect x="9" y="9" width="146" height="52" fill="#faf7ef" stroke="#12121a" stroke-width="2"/>
      <text x="18" y="28" font-family="Consolas, monospace" font-size="5.5" letter-spacing="1.6"
            fill="#6a6a72">TYPESCRIPT TO DEPLOYMENT</text>
      <text x="18" y="46" font-family="Georgia, serif" font-weight="700" font-size="15"
            fill="#12121a">${esc(b.title[0])}</text>
      <text x="18" y="57" font-family="Georgia, serif" font-weight="700" font-size="10"
            fill="${b.accent}">${esc(b.title[1])}</text>

      <rect x="9" y="68" width="88" height="86" fill="#fff" stroke="#12121a" stroke-width="2"/>
      <rect x="11" y="70" width="84" height="82" fill="url(#miniTone)"/>
      <g transform="translate(53,112) scale(.26) translate(-296,-352)">${character(b.face, b.accent)}</g>
      <rect x="9" y="68" width="88" height="86" fill="none" stroke="#12121a" stroke-width="2"/>

      <rect x="103" y="68" width="52" height="40" fill="#12121a" stroke="#12121a" stroke-width="2"/>
      <text x="109" y="83" font-family="Consolas, monospace" font-size="5" fill="#8de8a6">✓ ok</text>
      <text x="109" y="94" font-family="Consolas, monospace" font-size="5" fill="#f4f0e6">$ _</text>
      <rect x="103" y="114" width="52" height="40" fill="${b.accent}" stroke="#12121a" stroke-width="2"/>
      <text x="109" y="132" font-family="Consolas, monospace" font-size="6.5" fill="#fff">+${b.more} more</text>
      <text x="109" y="144" font-family="Consolas, monospace" font-size="6.5" fill="#fff">${b.pages} pages</text>

      <rect x="9" y="162" width="146" height="30" fill="${b.accent}" stroke="#12121a" stroke-width="2"/>
      <text x="18" y="182" font-family="Consolas, monospace" font-size="8" letter-spacing="1.6"
            fill="#fff">${b.label ?? `BOOKLET ${b.n} OF 9`}</text>
      <text x="18" y="205" font-family="Verdana, sans-serif" font-weight="700" font-size="9.5"
            fill="#12121a">${AUTHOR}</text>
      <text x="18" y="215" font-family="Consolas, monospace" font-size="6.5" font-weight="700"
            letter-spacing=".8" fill="${b.accent}">${SITE}</text>
    </g>`;
  }).join("\n");

  return `
<section class="sheet">
<svg viewBox="0 0 592 840" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="miniPaper" cx=".5" cy=".38" r=".72">
      <stop offset="0" stop-color="#ffe98f"/><stop offset="1" stop-color="#f2b40c"/>
    </radialGradient>
    <pattern id="miniTone" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="1.2" cy="1.2" r="1.1" fill="#12121a" fill-opacity=".35"/>
    </pattern>
    <pattern id="toneDense" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="1.4" cy="1.4" r="1.4" fill="#12121a" fill-opacity=".65"/>
    </pattern>
  </defs>
  <rect width="592" height="840" fill="#faf7ef"/>
  <text x="34" y="56" font-family="Georgia, serif" font-weight="700" font-size="30" fill="#12121a">
    All nine, one theme</text>
  <text x="34" y="82" font-family="Consolas, monospace" font-size="10.5" letter-spacing="3"
        fill="#6a6a72">YELLOW PAPER · MANGA PANELS · ONE ACCENT PER BOOKLET</text>
  ${cells}
  <text x="34" y="818" font-family="Consolas, monospace" font-size="9.5" letter-spacing="2.5"
        fill="#6a6a72">SAMPLES ONLY · NOT WIRED INTO ANY BOOKLET · © ${YEAR} ${AUTHOR.toUpperCase()}</text>
</svg>
</section>`;
}

/* ------------------------------------------------------------- render --- */

const html = `<!doctype html>
<meta charset="utf-8">
<title>Cover set</title>
<style>
  @page { size: 148mm 210mm; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: #fff; }
  .sheet { width: 148mm; height: 210mm; position: relative; overflow: hidden;
           break-after: page; page-break-after: always; }
  .sheet:last-child { break-after: auto; page-break-after: auto; }
  .sheet svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
</style>
${masterCover()}
${copyrightPage()}
${contactSheet()}
${BOOKLETS.map(cover).join("\n")}
`;

await writeFile(path.join(ROOT, "set.html"), html, "utf8");

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].find((p) => existsSync(p));
if (!CHROME) throw new Error("Chrome not found");

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(ROOT, "set.html")).href, { waitUntil: "networkidle0" });
await page.emulateMediaType("print");
await page.pdf({
  path: path.join(OUT, "cover-set.pdf"),
  width: "148mm", height: "210mm", printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});
await browser.close();
console.log("pdf   " + path.join(OUT, "cover-set.pdf"));
