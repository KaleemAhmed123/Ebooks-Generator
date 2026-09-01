# Module 3 - Spec-driven development

## The problem it solves

- Describing a task in a sentence and accepting whatever comes back works for small changes and falls apart above them
- The failure is consistent: **code that is plausible, that drifts from what you meant, that invents an API, and that gets worse as the change gets larger**
- The cause is not the model. **A one-sentence request underspecifies the task**, so every ambiguity is resolved by guessing, and there are dozens of them

- **Spec-driven development is writing the specification first, agreeing it, then generating from it.** The specification is the artifact that gets reviewed, and the code follows from it
- It emerged in 2025 as the direct answer to that failure and by 2026 every major tool ships a version of it

:::mint
<svg viewBox="0 0 470 165" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .l { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .s { font: 7px Consolas, monospace; fill: #4a4a4a; }
    .b { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .c { fill: #d9f2e6; stroke: #1a1a1a; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="q1" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
  </defs>

  <rect class="c" x="8" y="36" width="84" height="28" rx="4"/>
  <text x="50" y="54" class="l" text-anchor="middle">spec</text>
  <rect class="c" x="116" y="36" width="84" height="28" rx="4"/>
  <text x="158" y="54" class="l" text-anchor="middle">plan</text>
  <rect class="b" x="224" y="36" width="84" height="28" rx="4"/>
  <text x="266" y="54" class="l" text-anchor="middle">tasks</text>
  <rect class="b" x="332" y="36" width="84" height="28" rx="4"/>
  <text x="374" y="54" class="l" text-anchor="middle">code + tests</text>

  <line class="a" x1="92" y1="50" x2="112" y2="50" marker-end="url(#q1)"/>
  <line class="a" x1="200" y1="50" x2="220" y2="50" marker-end="url(#q1)"/>
  <line class="a" x1="308" y1="50" x2="328" y2="50" marker-end="url(#q1)"/>

  <text x="50" y="82" class="s" text-anchor="middle">you review</text>
  <text x="158" y="82" class="s" text-anchor="middle">you review</text>
  <text x="266" y="82" class="s" text-anchor="middle">generated</text>
  <text x="374" y="82" class="s" text-anchor="middle">generated</text>

  <line class="a" x1="374" y1="68" x2="374" y2="98"/>
  <line class="a" x1="374" y1="98" x2="50" y2="98"/>
  <line class="a" x1="50" y1="98" x2="50" y2="68" marker-end="url(#q1)"/>
  <text x="212" y="112" class="s" text-anchor="middle">what was actually built updates the spec</text>

  <text x="235" y="138" class="s" text-anchor="middle">the two green boxes are where a mistake is cheap to fix</text>
  <text x="235" y="152" class="s" text-anchor="middle">correcting a spec takes a minute; correcting merged code takes a day</text>
</svg>
:::
