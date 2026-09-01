# Module 7 - Verification

## The loop is the product

- An agent's quality is mostly a function of **how fast and how honest its feedback is**. Given a check it can run, it converges. Given none, it guesses once
- That means investing in tests, types and lint is not hygiene any more. **It is the thing that determines whether delegation works at all**

:::mint
<svg viewBox="0 0 470 175" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="w1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="b" x="14" y="56" width="84" height="26" rx="4"/>
  <text x="56" y="73" class="l" text-anchor="middle">edit</text>
  <rect class="c" x="140" y="56" width="110" height="26" rx="4"/>
  <text x="195" y="73" class="l" text-anchor="middle">run the check</text>
  <rect class="b" x="292" y="20" width="110" height="26" rx="4"/>
  <text x="347" y="37" class="l" text-anchor="middle">green: stop</text>
  <rect class="b" x="292" y="92" width="110" height="26" rx="4"/>
  <text x="347" y="109" class="l" text-anchor="middle">red: read the error</text>

  <line class="a" x1="98" y1="69" x2="136" y2="69" marker-end="url(#w1)"/>
  <line class="a" x1="250" y1="64" x2="288" y2="38" marker-end="url(#w1)"/>
  <line class="a" x1="250" y1="76" x2="288" y2="104" marker-end="url(#w1)"/>
  <line class="a" x1="292" y1="118" x2="56" y2="118"/>
  <line class="a" x1="56" y1="118" x2="56" y2="86" marker-end="url(#w1)"/>

  <text x="195" y="140" class="s" text-anchor="middle">a 3 second check runs 20 times; a 4 minute check runs twice</text>
  <text x="195" y="154" class="s" text-anchor="middle">check speed is the single biggest lever on agent output quality</text>
  <text x="195" y="168" class="s" text-anchor="middle">with no check at all, the loop does not exist and you get one guess</text>
</svg>
:::

- **Every second removed from the check multiplies.** A suite that runs one file in three seconds is worth more to agent output than any prompt technique in Module 4
