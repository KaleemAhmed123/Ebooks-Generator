## Notebooks vs scripts: when to use which

- Notebooks and plain `.py` scripts are not rivals — they are two phases of the same work. Use the notebook to *discover*, the script to *ship*.

<svg viewBox="0 0 380 70" role="img" aria-label="Exploration in a notebook feeding into production scripts and modules" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="20" y="24" width="130" height="26" fill="#e8f4fd" stroke="#24405e"/><text x="85" y="41" text-anchor="middle">notebook: explore</text>
  <path d="M150 37 L200 37" stroke="#1a1a1a" marker-end="url(#ns)"/><text x="175" y="28" text-anchor="middle" font-size="7" fill="#6b6b6b">harden</text>
  <rect x="200" y="24" width="160" height="26" fill="#1a3a2a"/><text x="280" y="41" text-anchor="middle" fill="#fff">.py scripts: ship</text>
  <defs><marker id="ns" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### The dividing line

| Notebook | Script / module |
|---|---|
| trying ideas, inspecting data | training runs that must repeat |
| plotting, one-off analysis | anything scheduled or automated |
| teaching and demos | code imported by other code |
| results you will throw away | results others depend on |

- Anything that runs more than a few times, runs unattended, or is imported elsewhere belongs in a `.py` file under version control and testing.

:::note
The mature workflow: prototype in a notebook, then move the code that survives into functions in a `.py` module and import it back into the notebook. You keep the interactive feel while the real logic lives in tested, versioned files — not trapped in cells.
:::
