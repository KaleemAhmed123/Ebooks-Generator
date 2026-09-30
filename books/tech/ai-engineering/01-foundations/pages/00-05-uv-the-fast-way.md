## uv: one tool for the whole setup

- **uv** is a Python package and project manager written in Rust. It replaces `pip`, `venv`, `pyenv`, `pipx`, and `pip-tools` with a single fast binary.
- As of September 2026 it is the de facto standard for new Python projects. It is maintained by Astral (now part of OpenAI), MIT/Apache licensed, with no paid tier and no telemetry.
- The draw is speed: package resolution and install run roughly 8–10× faster than pip cold, and up to ~100× faster with a warm cache.

### The five commands that cover most days

:::mint
```bash
uv init myproject          # start a project (creates pyproject.toml)
uv add torch numpy         # add dependencies, pinned in a lockfile
uv run python train.py     # run inside the project env, auto-synced
uv sync                    # make the env match the lockfile exactly
uv python install 3.14     # install a Python version, no pyenv needed
```
:::

- **`uv add`** records the exact versions in a **lockfile** (`uv.lock`). Commit it, and anyone who runs `uv sync` gets a byte-for-byte identical environment. That is reproducibility, solved.

:::note
uv manages Python itself, so you no longer install Python separately, then a version manager, then a package manager, then an environment tool. One binary does all four. For a beginner in 2026, start here and skip the older stack entirely.
:::
