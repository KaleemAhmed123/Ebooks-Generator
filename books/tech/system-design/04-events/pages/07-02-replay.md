## Replay

- Because the records are still there, a consumer can go back. **Replay** is resetting a group's offset, to zero, to a timestamp, or to a specific offset, and letting a consumer reread what it already read

<svg viewBox="0 0 460 150" role="img" aria-label="Replay. A partition holds records at offsets 0 to 9. The group's committed offset is 10, at the end. An arrow moves the cursor back to 0, and the consumer rereads all ten records into a rebuilt table. The records themselves are unchanged." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="20" y="20">partition, retained records</text>
  <g stroke="#333" fill="#fff">
    <rect x="20" y="30" width="34" height="22"/><rect x="58" y="30" width="34" height="22"/><rect x="96" y="30" width="34" height="22"/><rect x="134" y="30" width="34" height="22"/><rect x="172" y="30" width="34" height="22"/>
    <rect x="210" y="30" width="34" height="22"/><rect x="248" y="30" width="34" height="22"/><rect x="286" y="30" width="34" height="22"/><rect x="324" y="30" width="34" height="22"/><rect x="362" y="30" width="34" height="22"/>
  </g>
  <g text-anchor="middle" font-size="7.5">
    <text x="37" y="45">0</text><text x="75" y="45">1</text><text x="113" y="45">2</text><text x="151" y="45">3</text><text x="189" y="45">4</text>
    <text x="227" y="45">5</text><text x="265" y="45">6</text><text x="303" y="45">7</text><text x="341" y="45">8</text><text x="379" y="45">9</text>
  </g>
  <line x1="405" y1="26" x2="405" y2="56" stroke="#333"/>
  <text x="405" y="68" text-anchor="middle" font-size="7.5">committed: 10</text>
  <path d="M405 76 C 300 118, 120 118, 24 76" fill="none" stroke="#bf4c28" stroke-dasharray="4 2" marker-end="url(#g)"/>
  <text x="215" y="130" text-anchor="middle" fill="#bf4c28" font-size="7.5">reset the group's offset to 0 (or to a timestamp)</text>
  <text x="20" y="144" font-size="7.5" fill="#555">reread 0 to 9 into a fresh table; every side effect in the handler fires again unless it is idempotent</text>
  <defs><marker id="g" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker></defs>
</svg>

- What replay is for: a bug in the handler that wrote wrong rows for a week; a new read model that must be built from history (Module 9); a new consumer joining late that needs everything. Each is "run this fold again over the same input", which a queue cannot offer because its input is gone
- Two conditions. The group is stopped while its offsets are reset; a running member would commit over the reset. And the consumer must be prepared to see records it has seen: the same idempotency as Module 5, page 7, applied to a million records in a row
- Replay into a fresh table beats replay into the old one: build `orders_v2`, verify, switch reads, drop the old. The old table keeps serving during the rebuild, and a failed replay costs nothing

### The failure

- Replay re-fires side effects. The handler that updates the row also sends the shipping email. Reset to zero, and a week of customers get a week of emails again. Anything in the handler that reaches outside the database needs a guard for replay: skip, or route to a sink that knows it is a replay. Module 9, page 2 is the same trap in event sourcing
