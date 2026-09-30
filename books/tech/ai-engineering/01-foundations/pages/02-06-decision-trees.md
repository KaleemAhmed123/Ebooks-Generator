## Decision trees

- A **decision tree** classifies by asking a sequence of yes/no questions, splitting the data at each step until it reaches a confident answer.
- It is the most human-readable model: the path from root to leaf reads like a flowchart you could follow by hand.

<svg viewBox="0 0 320 118" role="img" aria-label="A decision tree splitting on income then on age to reach approve or deny leaves" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="115" y="8" width="90" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="160" y="23" text-anchor="middle">income &gt; 50k?</text>
  <path d="M135 30 L80 52" stroke="#1a1a1a" marker-end="url(#t)"/><text x="95" y="45" fill="#6b6b6b">no</text>
  <path d="M185 30 L235 52" stroke="#1a1a1a" marker-end="url(#t)"/><text x="220" y="45" fill="#6b6b6b">yes</text>
  <rect x="35" y="54" width="70" height="22" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="70" y="69" text-anchor="middle">deny</text>
  <rect x="200" y="54" width="90" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="245" y="69" text-anchor="middle">age &gt; 25?</text>
  <path d="M225 76 L195 98" stroke="#1a1a1a" marker-end="url(#t)"/><path d="M265 76 L285 98" stroke="#1a1a1a" marker-end="url(#t)"/>
  <rect x="150" y="98" width="70" height="18" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="185" y="111" text-anchor="middle">deny</text>
  <rect x="255" y="98" width="60" height="18" rx="3" fill="#eafaf0" stroke="#1a3a2a"/><text x="285" y="111" text-anchor="middle">approve</text>
  <defs><marker id="t" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### How it picks the questions

- At each node it tries every possible split and keeps the one that makes the resulting groups **purest** — most one-sided toward a single class.
- Purity is scored by **Gini impurity** or **entropy** (Module 1). Both measure "how mixed is this group"; the split that reduces it most wins.

:::warn
A single tree grown to full depth memorizes the training data — it overfits badly, carving out a leaf for every quirk. Left unchecked it is one of the highest-variance models there is. The fix is to combine many trees, which is the next two pages.
:::
