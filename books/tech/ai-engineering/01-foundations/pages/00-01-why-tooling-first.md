# Module 0 - Setup and Tooling

## Why tooling comes first

- Before any math or model, you need a machine that can run the work and a setup you can reproduce tomorrow.
- Most beginners lose their first week to environment errors — mismatched Python versions, missing GPU drivers, "works on my machine" — not to AI. This module removes that week.

### What an AI engineer's setup must do

- **Reproduce.** The same code and data must give the same result on another machine. Randomness is controlled with a fixed seed; dependencies are pinned to exact versions.
- **Isolate.** Each project gets its own dependencies, so upgrading one project cannot break another.
- **Scale.** Run small on a laptop, then move the identical setup to a rented GPU without rewriting anything.

<svg viewBox="0 0 400 66" role="img" aria-label="The tooling stack: hardware and GPU at the base, environment and dependencies above, code and data on top" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="60" y="8" width="280" height="14" fill="#1a3a2a"/><text x="200" y="18" text-anchor="middle" fill="#fff" font-size="8">code + data (what you write)</text>
  <rect x="60" y="24" width="280" height="14" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="34" text-anchor="middle" font-size="8">environment + dependencies (uv, docker)</text>
  <rect x="60" y="40" width="280" height="14" fill="#eafaf0" stroke="#1a3a2a"/><text x="200" y="50" text-anchor="middle" font-size="8">hardware + GPU + drivers</text>
</svg>

:::note
The whole module builds this stack bottom to top: the machine, then Python and isolated environments, then version control, then the GPU, then containers to make it all portable. Skip it and every later chapter fights you.
:::
