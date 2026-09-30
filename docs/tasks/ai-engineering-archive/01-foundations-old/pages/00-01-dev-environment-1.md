# Module 0 — Setup & Tooling

## Python env, uv, and the AI tool chain

- An AI engineering environment has four layers: **system foundation** → **package manager** → **language runtime** → **AI libraries**. Install bottom-up; each layer depends on the one below
- **uv** (from Astral, as of September 2026) is the standard Python package manager in AI workflows — written in Rust, 10–100× faster than pip, and handles virtual environments, Python version pinning, and lockfiles in one tool
- **Virtual environment**: an isolated directory containing its own Python interpreter and packages, separate from the system Python. Every project gets one; sharing environments causes CUDA version conflicts
- **Lockfile** (`uv.lock`): pins every package and transitive dependency to exact versions. Commit it to git so anyone who clones the repo gets an identical install

### Four-layer stack

<svg viewBox="0 0 420 148" role="img" aria-label="Four-layer AI environment stack: system at the bottom, then package manager, language runtime, and AI libraries at the top" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <rect x="8" y="112" width="404" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="210" y="130" text-anchor="middle" font-weight="bold">1 · System Foundation</text>
  <text x="210" y="142" text-anchor="middle" font-size="8.5" fill="#6b6b6b">OS · shell · git · GPU drivers</text>
  <rect x="8" y="80" width="404" height="28" rx="3" fill="#d4eafd" stroke="#24405e"/>
  <text x="210" y="98" text-anchor="middle" font-weight="bold">2 · Package Manager</text>
  <text x="210" y="110" text-anchor="middle" font-size="8.5" fill="#6b6b6b">uv (Python) · pnpm (Node) · cargo (Rust)</text>
  <rect x="8" y="48" width="404" height="28" rx="3" fill="#b8dafd" stroke="#24405e"/>
  <text x="210" y="66" text-anchor="middle" font-weight="bold">3 · Language Runtime</text>
  <text x="210" y="78" text-anchor="middle" font-size="8.5" fill="#6b6b6b">Python 3.12+ · Node 22 · Rust stable</text>
  <rect x="8" y="16" width="404" height="28" rx="3" fill="#24405e"/>
  <text x="210" y="34" text-anchor="middle" font-weight="bold" fill="#fff">4 · AI / ML Libraries</text>
  <text x="210" y="46" text-anchor="middle" font-size="8.5" fill="#b8dafd">PyTorch · JAX · transformers · scikit-learn</text>
</svg>

### Setting up Python with uv

:::mint
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh   # install uv
uv python install 3.12                              # pin Python version
uv venv && source .venv/bin/activate               # isolated env
uv pip install torch numpy scikit-learn            # AI libraries
```
:::
