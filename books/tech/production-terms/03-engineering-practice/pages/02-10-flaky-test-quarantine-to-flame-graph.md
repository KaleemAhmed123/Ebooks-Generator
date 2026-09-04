## Flaky Test Quarantine

Moving a known-flaky test out of the blocking suite so it stops failing releases,
while still running it and recording the result.

Keeping it running is the point. A quarantined test tells you when it has become
reliable again — and when it starts failing every single time, which means the
bug it was pointing at is now real.

**Quarantine without an expiry date is deletion with extra paperwork.** Every
entry needs an owner and a date; a quarantine list that only grows is an
inventory of things nobody intends to fix.

## Flame Graph

Sampled stacks, merged and drawn. The y-axis is stack depth. Box width is how
often that frame appeared in the samples. The top edge is what was on-CPU and
everything under it is its ancestry.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A flame graph: boxes stacked by call depth, where each box is a stack frame and its width is the share of samples containing that frame, with the horizontal axis showing sample population rather than elapsed time">
  <rect x="4" y="72" width="286" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="83.5" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">main</text>
  <rect x="4" y="52" width="104" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="12" y="63.5" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">parse</text>
  <rect x="110" y="52" width="180" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="118" y="63.5" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">handle</text>
  <rect x="110" y="32" width="40" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="115" y="43.5" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">auth</text>
  <rect x="152" y="32" width="138" height="16" fill="#e2fcf3" stroke="#0d7a7a" stroke-width="1.4"/>
  <text x="160" y="43.5" font-family="Consolas,monospace" font-size="8.5" fill="#0d7a7a">serialise</text>
  <rect x="152" y="12" width="86" height="16" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="160" y="23.5" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">Marshal</text>
  <path d="M292 40 H316" stroke="#0d7a7a" stroke-width="1.2"/>
  <text x="322" y="43" font-family="Georgia,serif" font-size="9" fill="#0d7a7a">38% of samples</text>
  <text x="322" y="20" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">top edge = on-CPU</text>
  <text x="322" y="83" font-family="Georgia,serif" font-size="8.5" fill="#6b6b6b">x-axis is not time</text>
</svg>

**Frames are sorted alphabetically so identical stacks merge.** A wide box means
"often on-CPU", never "ran for a long stretch", and reading left to right as a
sequence is the standard mistake. That picture is a flame chart, where the x-axis really is time, and it is a
different tool.
