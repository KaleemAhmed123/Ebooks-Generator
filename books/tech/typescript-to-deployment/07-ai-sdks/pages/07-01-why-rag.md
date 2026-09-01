# Module 7 - Retrieval

## Why retrieval exists

- A model knows what it was trained on. It does not know your refund policy, your schema, or an order placed this morning
- There are only three ways to change that, and two of them are usually wrong

| Approach | Cost | Fits |
|---|---|---|
| **Fine-tuning** | expensive, slow, stale the day it finishes | teaching a style or a format |
| **Everything in the prompt** | fine under 100k tokens, then impossible | a small, fixed handbook |
| **Retrieval** | one embedding call and a query | facts that change, or do not fit |

- **Retrieval-augmented generation** is the third: find the few passages relevant to this question, put them in the prompt, and ask the question against them
- The model is then reasoning over text it was handed, rather than recalling. That is what makes the answer checkable

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 9px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7.5px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .t { font: bold 8px Consolas, monospace; fill: #ef476e; }
  </style>
  <defs>
    <marker id="r1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <text x="8" y="12" class="t">INDEX, ONCE</text>
  <rect class="b" x="8" y="20" width="88" height="26" rx="4"/>
  <text x="52" y="37" class="l" text-anchor="middle">documents</text>
  <rect class="b" x="116" y="20" width="78" height="26" rx="4"/>
  <text x="155" y="37" class="l" text-anchor="middle">chunks</text>
  <rect class="b" x="214" y="20" width="88" height="26" rx="4"/>
  <text x="258" y="37" class="l" text-anchor="middle">embeddings</text>
  <rect class="b" x="322" y="20" width="96" height="26" rx="4"/>
  <text x="370" y="37" class="l" text-anchor="middle">vector store</text>
  <line class="a" x1="96" y1="33" x2="112" y2="33" marker-end="url(#r1)"/>
  <line class="a" x1="194" y1="33" x2="210" y2="33" marker-end="url(#r1)"/>
  <line class="a" x1="302" y1="33" x2="318" y2="33" marker-end="url(#r1)"/>

  <text x="8" y="78" class="t">ASK, EVERY TIME</text>
  <rect class="b" x="8" y="86" width="88" height="26" rx="4"/>
  <text x="52" y="103" class="l" text-anchor="middle">question</text>
  <rect class="b" x="116" y="86" width="78" height="26" rx="4"/>
  <text x="155" y="103" class="l" text-anchor="middle">embed</text>
  <rect class="b" x="214" y="86" width="88" height="26" rx="4"/>
  <text x="258" y="103" class="l" text-anchor="middle">top k chunks</text>
  <rect class="b" x="322" y="86" width="96" height="26" rx="4"/>
  <text x="370" y="103" class="l" text-anchor="middle">prompt + model</text>
  <line class="a" x1="96" y1="99" x2="112" y2="99" marker-end="url(#r1)"/>
  <line class="a" x1="194" y1="99" x2="210" y2="99" marker-end="url(#r1)"/>
  <line class="a" x1="302" y1="99" x2="318" y2="99" marker-end="url(#r1)"/>
  <line class="a" x1="370" y1="50" x2="370" y2="82" marker-end="url(#r1)"/>

  <text x="213" y="136" class="s" text-anchor="middle">indexing is a background job; retrieval is on the request path</text>
</svg>
:::
