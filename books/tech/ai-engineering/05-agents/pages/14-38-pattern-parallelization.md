## Pattern: parallelization

- **Parallelization** runs multiple LLM calls at once and combines their outputs. Two flavors: **sectioning** (split a task into independent parts done in parallel) and **voting** (run the *same* task several times and aggregate).

<svg viewBox="0 0 360 104" role="img" aria-label="Sectioning splits subtasks in parallel; voting runs the same task multiple times and aggregates" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">sectioning</text>
  <rect x="14" y="18" width="40" height="14" rx="2" fill="#eef6fb" stroke="#24405e"/><rect x="14" y="36" width="40" height="14" rx="2" fill="#eef6fb" stroke="#24405e"/><rect x="14" y="54" width="40" height="14" rx="2" fill="#eef6fb" stroke="#24405e"/>
  <text x="34" y="27" text-anchor="middle" font-size="5">part A</text><text x="34" y="45" text-anchor="middle" font-size="5">part B</text><text x="34" y="63" text-anchor="middle" font-size="5">part C</text>
  <rect x="110" y="34" width="50" height="18" rx="3" fill="#24405e"/><text x="135" y="46" text-anchor="middle" fill="#fff" font-size="5.5">combine</text>
  <path d="M54 25 L108 40" stroke="#888" marker-end="url(#pp)"/><path d="M54 43 L108 43" stroke="#888" marker-end="url(#pp)"/><path d="M54 61 L108 46" stroke="#888" marker-end="url(#pp)"/>
  <line x1="185" y1="12" x2="185" y2="92" stroke="#eee"/>
  <text x="275" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">voting</text>
  <rect x="210" y="18" width="60" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><rect x="210" y="36" width="60" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><rect x="210" y="54" width="60" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/>
  <text x="240" y="27" text-anchor="middle" font-size="5">run 1</text><text x="240" y="45" text-anchor="middle" font-size="5">run 2</text><text x="240" y="63" text-anchor="middle" font-size="5">run 3</text>
  <rect x="300" y="36" width="50" height="18" rx="3" fill="#1a3a2a"/><text x="325" y="48" text-anchor="middle" fill="#fff" font-size="5.5">vote</text>
  <path d="M270 25 L298 42" stroke="#888" marker-end="url(#pp)"/><path d="M270 43 L298 45" stroke="#888" marker-end="url(#pp)"/><path d="M270 61 L298 48" stroke="#888" marker-end="url(#pp)"/>
  <defs><marker id="pp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Sectioning** — break a task into independent subtasks, run them concurrently, merge. Example: review code for security, performance, and style as three parallel calls, then combine. Faster (parallel, not sequential) and each call focuses on one lens, improving quality.
- **Voting** — run the same task multiple times (or with different prompts) and aggregate — majority vote, take-any-that-passes, or average. Example: ask "is this code vulnerable?" five times and flag if any says yes. Raises reliability on tasks where one shot is unreliable, at N× the cost.
- **When to use:** sectioning when independent aspects benefit from separate focused calls; voting when a single call is too unreliable and you can afford redundancy for confidence.

:::interview
"How can you make an unreliable LLM judgment more trustworthy?"

Voting (parallelization). Run the same judgment several times — with sampling variation or varied prompts — and aggregate: majority vote, or "flag if *any* run catches the problem" for high-recall safety checks. It trades N× cost for higher reliability and gives you a confidence signal (unanimity vs split). Its sibling, sectioning, instead splits *different* aspects of a task into parallel focused calls for speed and quality.
:::
