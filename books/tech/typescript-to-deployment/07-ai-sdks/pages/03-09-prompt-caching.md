## Prompt caching

- A support assistant sends the same 20,000 token policy document on every request. Only the last user message differs
- Paying full input price for that identical prefix, thousands of times a day, is the largest avoidable cost in most LLM features
- **Prompt caching** stores the processed prefix on the provider side. A later request with the same prefix reads it instead of reprocessing it
- A cache read costs about a tenth of the normal input price, so the saving is large and takes one line to enable

:::mint
<svg viewBox="0 0 470 170" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>

  <text x="8" y="14" class="t">REQUEST 1</text>
  <rect class="c" x="8" y="20" width="250" height="26" rx="4"/>
  <text x="133" y="37" class="l" text-anchor="middle">system + policy document</text>
  <rect class="b" x="264" y="20" width="110" height="26" rx="4"/>
  <text x="319" y="37" class="l" text-anchor="middle">question</text>
  <text x="382" y="31" class="s">cache write</text>
  <text x="382" y="42" class="s">1.25x price</text>

  <text x="8" y="74" class="t">REQUEST 2</text>
  <rect class="c" x="8" y="80" width="250" height="26" rx="4"/>
  <text x="133" y="97" class="l" text-anchor="middle">identical prefix, byte for byte</text>
  <rect class="b" x="264" y="80" width="110" height="26" rx="4"/>
  <text x="319" y="97" class="l" text-anchor="middle">new question</text>
  <text x="382" y="91" class="s">cache read</text>
  <text x="382" y="102" class="s">0.1x price</text>

  <text x="235" y="132" class="s" text-anchor="middle">the breakpoint marks the end of the cacheable prefix</text>
  <text x="235" y="148" class="s" text-anchor="middle">one changed byte anywhere before it and nothing is reused</text>
</svg>
:::
