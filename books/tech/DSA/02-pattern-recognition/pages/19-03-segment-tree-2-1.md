:::mint
<svg viewBox="0 0 470 168" role="img" aria-label="A segment tree over array 2, 5, 1, 4, 9, 3 storing minimums. Root covers 0 to 5 with min 1. Its children cover 0 to 2 (min 1) and 3 to 5 (min 3). A query for the minimum over 1 to 4 is covered by three nodes: the cell at index 1 (value 5), the block 2 to 2 inside the left (value 1), and block 3 to 4 (value 4). Merging gives min 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .nd { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .hit { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.5; }
    .rt { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .lb { font: 8.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .ed { stroke: #9aa; stroke-width: 0.8; }
  </style>
  <line class="ed" x1="200" y1="22" x2="110" y2="58"/><line class="ed" x1="200" y1="22" x2="300" y2="58"/>
  <line class="ed" x1="110" y1="72" x2="70" y2="108"/><line class="ed" x1="110" y1="72" x2="160" y2="108"/>
  <line class="ed" x1="300" y1="72" x2="260" y2="108"/><line class="ed" x1="300" y1="72" x2="340" y2="108"/>
  <line class="ed" x1="70" y1="122" x2="50" y2="150"/><line class="ed" x1="70" y1="122" x2="92" y2="150"/>
  <line class="ed" x1="260" y1="122" x2="240" y2="150"/><line class="ed" x1="260" y1="122" x2="282" y2="150"/>
  <rect class="rt" x="176" y="10" width="48" height="22" rx="3"/><text x="200" y="25" class="lb" text-anchor="middle">[0,5]=1</text>
  <rect class="nd" x="86" y="58" width="48" height="22" rx="3"/><text x="110" y="73" class="lb" text-anchor="middle">[0,2]=1</text>
  <rect class="nd" x="276" y="58" width="48" height="22" rx="3"/><text x="300" y="73" class="lb" text-anchor="middle">[3,5]=3</text>
  <rect class="hit" x="46" y="108" width="48" height="22" rx="3"/><text x="70" y="123" class="lb" text-anchor="middle">[0,1]</text>
  <rect class="hit" x="136" y="108" width="48" height="22" rx="3"/><text x="160" y="123" class="lb" text-anchor="middle">[2,2]=1</text>
  <rect class="hit" x="236" y="108" width="48" height="22" rx="3"/><text x="260" y="123" class="lb" text-anchor="middle">[3,4]=4</text>
  <rect class="nd" x="316" y="108" width="48" height="22" rx="3"/><text x="340" y="123" class="lb" text-anchor="middle">[5,5]=3</text>
  <rect class="nd" x="30" y="150" width="40" height="16" rx="2"/><text x="50" y="162" class="lb" text-anchor="middle">2</text>
  <rect class="hit" x="72" y="150" width="40" height="16" rx="2"/><text x="92" y="162" class="lb" text-anchor="middle">5</text>
  <rect class="nd" x="220" y="150" width="40" height="16" rx="2"/><text x="240" y="162" class="lb" text-anchor="middle">9</text>
  <rect class="nd" x="262" y="150" width="40" height="16" rx="2"/><text x="282" y="162" class="lb" text-anchor="middle">3</text>
  <text x="372" y="96" class="sm">query [1,4] →</text>
  <text x="372" y="108" class="sm">cell 5, block</text>
  <text x="372" y="120" class="sm">[2,2]=1, [3,4]=4</text>
  <text x="372" y="132" class="sm">min = 1</text>
</svg>
:::
