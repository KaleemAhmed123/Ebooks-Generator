# Module 6 - CI/CD with GitHub Actions

## What the pipeline is for

- **Continuous integration** means every push is built and tested automatically, so a broken change is caught in minutes rather than in review
- **Continuous delivery** means the tested artifact is deployed automatically, so shipping is a merge rather than an evening
- The real value is not speed. It is that **the deploy is written down, repeatable and identical every time**, instead of living in one person's shell history

:::mint
<svg viewBox="0 0 470 155" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="c1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="6" y="36" width="58" height="26" rx="4"/>
  <text x="35" y="53" class="l" text-anchor="middle">push</text>
  <rect class="b" x="78" y="36" width="58" height="26" rx="4"/>
  <text x="107" y="53" class="l" text-anchor="middle">lint</text>
  <rect class="b" x="150" y="36" width="58" height="26" rx="4"/>
  <text x="179" y="53" class="l" text-anchor="middle">test</text>
  <rect class="b" x="222" y="36" width="66" height="26" rx="4"/>
  <text x="255" y="53" class="l" text-anchor="middle">build image</text>
  <rect class="b" x="302" y="36" width="58" height="26" rx="4"/>
  <text x="331" y="53" class="l" text-anchor="middle">push ECR</text>
  <rect class="c" x="374" y="36" width="88" height="26" rx="4"/>
  <text x="418" y="53" class="l" text-anchor="middle">deploy</text>

  <line class="a" x1="64" y1="49" x2="74" y2="49" marker-end="url(#c1)"/>
  <line class="a" x1="136" y1="49" x2="146" y2="49" marker-end="url(#c1)"/>
  <line class="a" x1="208" y1="49" x2="218" y2="49" marker-end="url(#c1)"/>
  <line class="a" x1="288" y1="49" x2="298" y2="49" marker-end="url(#c1)"/>
  <line class="a" x1="360" y1="49" x2="370" y2="49" marker-end="url(#c1)"/>

  <text x="107" y="78" class="s" text-anchor="middle">on every push</text>
  <text x="255" y="78" class="s" text-anchor="middle">tagged with the commit SHA</text>
  <text x="418" y="78" class="s" text-anchor="middle">main branch only</text>

  <text x="235" y="108" class="s" text-anchor="middle">one artifact is built once and promoted; staging and production run the same bytes</text>
  <text x="235" y="124" class="s" text-anchor="middle">a rollback is redeploying the previous SHA, not rebuilding an older commit</text>
  <text x="235" y="140" class="s" text-anchor="middle">nothing in the pipeline holds a long-lived AWS key</text>
</svg>
:::
