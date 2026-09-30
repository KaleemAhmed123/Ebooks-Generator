## Git workflow for AI engineers

- **Commit** — a snapshot of the project at a point in time, not just the changed files. Every experiment gets a commit; every failed run does too
- **Branch** — a pointer to a commit that moves forward as you work. Branches cost nothing; the penalty for not using them is working on broken `main`
- An AI project's `main` branch should always run. Experiments, hyperparameter sweeps, and model architecture changes live on feature branches

### The AI engineer's daily loop

<svg viewBox="0 0 460 88" role="img" aria-label="Data flow from working directory through staging and local repo to remote on GitHub" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="24" width="88" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="48" y="42" text-anchor="middle">Working dir</text>
  <rect x="116" y="24" width="88" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="160" y="42" text-anchor="middle">Staging</text>
  <rect x="228" y="24" width="88" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="272" y="42" text-anchor="middle">Local repo</text>
  <rect x="340" y="24" width="88" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="384" y="42" text-anchor="middle">Remote</text>
  <path d="M92 38 L116 38" stroke="#1a1a1a" fill="none" marker-end="url(#arr)"/>
  <path d="M204 38 L228 38" stroke="#1a1a1a" fill="none" marker-end="url(#arr)"/>
  <path d="M316 38 L340 38" stroke="#1a1a1a" fill="none" marker-end="url(#arr)"/>
  <text x="100" y="30" font-size="8.5" fill="#6b6b6b" text-anchor="middle">git add</text>
  <text x="213" y="30" font-size="8.5" fill="#6b6b6b" text-anchor="middle">git commit</text>
  <text x="325" y="30" font-size="8.5" fill="#6b6b6b" text-anchor="middle">git push</text>
  <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### What to commit and what to exclude

| Commit | Exclude |
|--------|---------|
| `pyproject.toml`, `uv.lock` | `.venv/` (regenerate from lockfile) |
| training scripts, configs | `*.pt`, `*.pth`, `*.safetensors` (use model registries) |
| evaluation results (text/JSON) | raw datasets over 100 MB (use DVC or HF Hub) |
| `.env.example` with placeholder keys | `.env` with real keys |
