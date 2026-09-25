# Chapter 3 - Prefix & Running State

## The Running State Family <span class="lv lv1"></span>

- **What it is:** One left-to-right pass that carries a small summary of everything seen so far. Each new element is answered from that summary in O(1), then folded into it
- **The signal:** "subarray sum", "divisible by k", "equal number of…", "best pair i < j", "product of all others", "water trapped above each bar"
- **The mechanism:** A brute force re-reads the past for every index: O(n²). The whole chapter is one question: *what is the smallest summary of the prefix that still answers my question?*

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="A pass over the array from left to right. At each index the algorithm reads a summary of the prefix, answers the question for this index, then updates the summary. The summary can be a running sum, a map of seen prefixes, a best-so-far value, or a running maximum." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .cur { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0301" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="hi" x="20" y="12" width="150" height="24"/><text x="95" y="28" class="lb" text-anchor="middle">seen: a[0 .. i−1]</text>
  <rect class="cur" x="170" y="12" width="34" height="24"/><text x="187" y="28" class="lb" text-anchor="middle">a[i]</text>
  <rect class="bx" x="204" y="12" width="90" height="24"/><text x="249" y="28" class="sm" text-anchor="middle">not seen yet</text>
  <rect class="hi" x="40" y="62" width="110" height="36" rx="4"/><text x="95" y="78" class="lb" text-anchor="middle">summary</text><text x="95" y="91" class="sm" text-anchor="middle">O(1) or a map</text>
  <path class="a" d="M 95 38 L 95 60" marker-end="url(#m0301)"/>
  <path class="a" d="M 152 80 L 180 40" marker-end="url(#m0301)"/><text x="170" y="64" class="sm">1. answer</text>
  <path class="a" d="M 187 40 C 187 90, 170 92, 154 88" marker-end="url(#m0301)"/><text x="192" y="86" class="sm">2. fold in</text>
  <text x="310" y="22" class="sm">running sum → range sums</text>
  <text x="310" y="38" class="sm">map of prefixes → equal pairs</text>
  <text x="310" y="54" class="sm">best-so-far → best pair i &lt; j</text>
  <text x="310" y="70" class="sm">running max/min → restarts</text>
  <text x="310" y="86" class="sm">left pass + right pass → both sides</text>
</svg>
:::
