## The isolation problem

- Project A needs PyTorch 2.10; project B needs 2.13. Install both globally and one breaks the other. This is **dependency hell**.
- A **virtual environment** solves it: a private, per-project folder holding that project's exact packages and Python version. Activate it and you see only that project's world.

<svg viewBox="0 0 400 74" role="img" aria-label="Two isolated environments each holding different package versions, both sitting on the same system Python" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="20" y="8" width="160" height="34" fill="#e8f4fd" stroke="#24405e"/><text x="100" y="22" text-anchor="middle" font-weight="bold">project A env</text><text x="100" y="35" text-anchor="middle" fill="#6b6b6b">torch 2.10 · numpy 2.1</text>
  <rect x="220" y="8" width="160" height="34" fill="#eafaf0" stroke="#1a3a2a"/><text x="300" y="22" text-anchor="middle" font-weight="bold">project B env</text><text x="300" y="35" text-anchor="middle" fill="#6b6b6b">torch 2.13 · numpy 2.3</text>
  <rect x="20" y="50" width="360" height="16" fill="#f4f4f4" stroke="#bbb"/><text x="200" y="61" text-anchor="middle" fill="#6b6b6b">one machine · isolated, no conflict</text>
</svg>

### Your options

- **venv** — built into Python, zero install. Fine, but slow to install packages and does not manage Python versions.
- **conda** — also handles non-Python dependencies (CUDA libraries, compilers). Common in research; heavier and slower.
- **uv** — the modern default: one fast tool that manages environments, packages, *and* Python versions. The next page.

:::warn
The number-one beginner error is installing packages globally with `pip install` and no environment. Six projects later, nothing works and no one can tell why. Make an environment before you install anything — always.
:::
