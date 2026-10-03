## HTTP/2 — multiplexing

- HTTP/2 keeps the same methods and status codes but changes the wire format: it's **binary and framed**, and it carries many concurrent **streams** over a **single** TCP connection. One connection now does what HTTP/1.1 needed six for — this is **multiplexing**.

<svg viewBox="0 0 360 100" role="img" aria-label="HTTP/1.1 uses several parallel TCP connections, each serial; HTTP/2 uses one connection carrying many interleaved streams" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#0f6e6e">HTTP/1.1 — 6 connections</text>
  <line x1="30" y1="22" x2="30" y2="86" stroke="#bbb"/><line x1="70" y1="22" x2="70" y2="86" stroke="#bbb"/><line x1="110" y1="22" x2="110" y2="86" stroke="#bbb"/><line x1="150" y1="22" x2="150" y2="86" stroke="#bbb"/>
  <rect x="24" y="30" width="12" height="24" fill="#e4f1f1" stroke="#0f6e6e"/><rect x="64" y="34" width="12" height="24" fill="#e4f1f1" stroke="#0f6e6e"/><rect x="104" y="30" width="12" height="20" fill="#e4f1f1" stroke="#0f6e6e"/><rect x="144" y="40" width="12" height="24" fill="#e4f1f1" stroke="#0f6e6e"/>
  <text x="90" y="96" text-anchor="middle" font-size="5.3" fill="#777">each serial · 6× handshakes</text>
  <text x="270" y="12" text-anchor="middle" font-size="6.5" fill="#0f6e6e">HTTP/2 — 1 connection</text>
  <line x1="210" y1="22" x2="330" y2="22" stroke="#0f6e6e"/>
  <rect x="214" y="28" width="26" height="12" fill="#dfeeee" stroke="#0f6e6e"/><text x="227" y="37" text-anchor="middle" font-size="5">s1</text>
  <rect x="244" y="28" width="26" height="12" fill="#e4f1f1" stroke="#0f6e6e"/><text x="257" y="37" text-anchor="middle" font-size="5">s2</text>
  <rect x="274" y="28" width="26" height="12" fill="#dfeeee" stroke="#0f6e6e"/><text x="287" y="37" text-anchor="middle" font-size="5">s3</text>
  <rect x="214" y="44" width="26" height="12" fill="#e4f1f1" stroke="#0f6e6e"/><rect x="244" y="44" width="26" height="12" fill="#dfeeee" stroke="#0f6e6e"/><rect x="274" y="44" width="26" height="12" fill="#e4f1f1" stroke="#0f6e6e"/>
  <text x="270" y="96" text-anchor="middle" font-size="5.3" fill="#777">streams interleaved · 1 handshake</text>
</svg>

- It also compresses headers (**HPACK**), which matters because real requests carry kilobytes of repeated cookies and headers. Server **push** was part of the spec but proved more trouble than help and has been removed in practice.
- The catch you already know from Module 2: all those streams still ride **one TCP connection**, so a single lost packet triggers **TCP-level head-of-line blocking** and stalls *every* stream at once. HTTP/2 solved application-level HOL but inherited transport-level HOL — which is precisely the gap HTTP/3 closes.
