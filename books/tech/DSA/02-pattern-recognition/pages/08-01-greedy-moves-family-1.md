# Chapter 8 - Greedy Moves

## The Greedy Moves Family <span class="lv lv2"></span>

- **What it is:** A greedy algorithm commits to the best-looking choice now and never revisits it. The hard part is not the loop; it is knowing *which* choice is safe. This chapter collects the moves that recur, each with the reason it is safe
- **Signal:** "minimum number of jumps / taps / boats / arrows", "maximum profit with deadlines", "which station to start from", "minimum cost", and constraints of n ≤ 10⁵ that rule out a DP over pairs
- **Why it works:** Every safe greedy move comes with an argument that some optimal answer agrees with it: an *exchange* (swap the greedy choice into any optimal answer without loss) or *stays ahead* (after every step, greedy is at least as far along). Module 04 teaches both proofs; this chapter teaches the moves they justify

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Decision flow for a greedy move. Make the choice, then test it: try to build a small counter-example of three or four elements. If one exists, the move is unsafe and the problem needs DP or search. If none exists, prove it with an exchange or stays-ahead argument." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .ok { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .no { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0801" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="bx" x="14" y="36" width="110" height="28" rx="3"/><text x="69" y="54" class="lb" text-anchor="middle">greedy choice</text>
  <path class="a" d="M 126 50 L 158 50" marker-end="url(#m0801)"/>
  <rect class="bx" x="160" y="30" width="130" height="40" rx="3"/><text x="225" y="47" class="lb" text-anchor="middle">counter-example</text><text x="225" y="60" class="sm" text-anchor="middle">on 3–4 elements?</text>
  <path class="a" d="M 292 42 L 324 22" marker-end="url(#m0801)"/><path class="a" d="M 292 58 L 324 78" marker-end="url(#m0801)"/>
  <rect class="no" x="326" y="8" width="130" height="28" rx="3"/><text x="391" y="26" class="lb" text-anchor="middle">yes → DP / search</text>
  <rect class="ok" x="326" y="64" width="130" height="28" rx="3"/><text x="391" y="82" class="lb" text-anchor="middle">no → prove, then code</text>
</svg>
:::
