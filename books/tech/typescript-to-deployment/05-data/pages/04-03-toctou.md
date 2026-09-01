## The read-check-write race

- The most common way a backend loses money, and it passes code review every time because the code reads correctly
- **TOCTOU** is time-of-check to time-of-use: the gap between checking a condition and acting on it, during which the condition stops being true

:::mint
<svg viewBox="0 0 470 186" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lane { fill: #ffffff; stroke: #b9d9cd; stroke-width: 1; }
    .box  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .who  { font: bold 9px Georgia, serif; fill: #1a1a1a; }
    .ev   { font: 8px Consolas, monospace; fill: #1a1a1a; }
    .bal  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tick { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .ax   { stroke: #9bbfb1; stroke-width: 1; }
    .red  { fill: #ef476e; }
    .redt { font: 9px Georgia, serif; fill: #ef476e; }
    .redm { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>

  <rect class="lane" x="62" y="16" width="400" height="34" rx="4"/>
  <rect class="lane" x="62" y="58" width="400" height="34" rx="4"/>
  <text x="54" y="37" class="who" text-anchor="end">A</text>
  <text x="54" y="79" class="who" text-anchor="end">B</text>

  <line class="ax" x1="62" y1="104" x2="462" y2="104"/>
  <text x="110" y="116" class="tick" text-anchor="middle">t1</text>
  <text x="205" y="116" class="tick" text-anchor="middle">t2</text>
  <text x="300" y="116" class="tick" text-anchor="middle">t3</text>
  <text x="398" y="116" class="tick" text-anchor="middle">t4</text>

  <rect class="box" x="70"  y="22" width="82" height="22" rx="3"/>
  <text x="111" y="37" class="ev" text-anchor="middle">read 500</text>

  <rect class="box" x="164" y="64" width="82" height="22" rx="3"/>
  <text x="205" y="79" class="ev" text-anchor="middle">read 500</text>

  <rect class="box" x="258" y="22" width="88" height="22" rx="3"/>
  <text x="302" y="37" class="ev" text-anchor="middle">write 100</text>

  <rect class="box" x="356" y="64" width="98" height="22" rx="3"/>
  <text x="405" y="79" class="ev" text-anchor="middle">write 100</text>

  <text x="111" y="134" class="bal" text-anchor="middle">500</text>
  <text x="205" y="134" class="bal" text-anchor="middle">500</text>
  <text x="300" y="134" class="bal" text-anchor="middle">100</text>
  <text x="398" y="134" class="redm" text-anchor="middle">100</text>
  <text x="30"  y="134" class="tick">balance</text>

  <text x="235" y="158" class="redt" text-anchor="middle">both read 500, both decided 400 was affordable</text>
  <text x="235" y="176" class="redt" text-anchor="middle">800 left a 500 balance, and nothing raised an error</text>
</svg>
:::

```ts
// every line is correct, and together they are wrong
const wallet = await db.wallet.findUnique({ where: { sellerId } })
if (wallet.balance < amount) throw new Error("insufficient")

await db.wallet.update({
  where: { sellerId },
  data: { balance: wallet.balance - amount },
})
```

- The check and the write are two separate trips to the database, and anything can happen between them
- Adding a transaction at Read committed does **not** fix it, because neither transaction blocks the other
