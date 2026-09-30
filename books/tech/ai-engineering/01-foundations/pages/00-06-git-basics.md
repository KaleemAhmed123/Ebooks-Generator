## Git: a save button you can rewind

- **Git** tracks the history of your files. Every **commit** is a snapshot you can return to, compare against, or undo.
- Without it, "final_v2_really_final.py" is your version control. With it, one clean history holds every state the project has ever been in.

### The daily loop

:::mint
```bash
git status                     # what has changed
git add train.py               # stage the files to save
git commit -m "add training loop"   # snapshot them with a message
git log --oneline              # see the history
```
:::

- **Stage, then commit.** Staging (`git add`) chooses *what* goes in the next snapshot; committing records it. This lets you save related changes together and leave unrelated ones for a separate commit.
- A good commit message says *why*, not *what* — the diff already shows what changed.

<svg viewBox="0 0 380 54" role="img" aria-label="Working files staged then committed into a chain of snapshots" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="10" y="18" width="70" height="20" fill="#e8f4fd" stroke="#24405e"/><text x="45" y="31" text-anchor="middle">working</text>
  <path d="M80 28 L104 28" stroke="#1a1a1a" marker-end="url(#gi)"/><text x="92" y="14" text-anchor="middle" font-size="7">add</text>
  <rect x="106" y="18" width="60" height="20" fill="#eafaf0" stroke="#1a3a2a"/><text x="136" y="31" text-anchor="middle">staged</text>
  <path d="M166 28 L190 28" stroke="#1a1a1a" marker-end="url(#gi)"/><text x="178" y="14" text-anchor="middle" font-size="7">commit</text>
  <circle cx="215" cy="28" r="8" fill="#1a3a2a"/><circle cx="255" cy="28" r="8" fill="#1a3a2a"/><circle cx="295" cy="28" r="8" fill="#1a3a2a"/>
  <line x1="223" y1="28" x2="247" y2="28" stroke="#1a1a1a"/><line x1="263" y1="28" x2="287" y2="28" stroke="#1a1a1a"/>
  <text x="255" y="50" text-anchor="middle" fill="#6b6b6b">history of snapshots</text>
  <defs><marker id="gi" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::warn
Never commit large data, model weights, or secrets. Git keeps everything forever, so a 5 GB dataset or a leaked API key stays in the history even after you delete the file. Use a `.gitignore` from the first commit.
:::
