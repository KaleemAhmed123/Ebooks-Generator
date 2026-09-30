## Notebooks vs scripts — the reproducibility divide

- A **notebook** (`.ipynb`) is a document containing cells: code, outputs, and markdown interleaved. The **kernel** is the Python process executing those cells — it persists between runs and holds all variable state
- Cells run in any order you click. A notebook where you run cells out of order may produce results the file cannot reproduce — the output is a function of history, not the file
- **The rule**: explore in notebooks, ship in scripts. Once an experiment produces a result worth keeping, extract the logic into a `.py` file that runs top-to-bottom from a clean state

### When each is right

<svg viewBox="0 0 460 88" role="img" aria-label="Notebooks suit exploration and visualization; scripts suit production, CI, and reproducible pipelines" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="8" width="220" height="72" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="114" y="26" text-anchor="middle" font-weight="bold">Notebooks (.ipynb)</text>
  <text x="114" y="42" text-anchor="middle" fill="#6b6b6b">Exploration · EDA · visualization</text>
  <text x="114" y="56" text-anchor="middle" fill="#6b6b6b">Inline plots · quick prototyping</text>
  <text x="114" y="70" text-anchor="middle" fill="#6b6b6b">Teaching · documentation</text>
  <rect x="236" y="8" width="220" height="72" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="346" y="26" text-anchor="middle" font-weight="bold">Scripts (.py)</text>
  <text x="346" y="42" text-anchor="middle" fill="#6b6b6b">Production · CI pipelines</text>
  <text x="346" y="56" text-anchor="middle" fill="#6b6b6b">Reproducible training runs</text>
  <text x="346" y="70" text-anchor="middle" fill="#6b6b6b">Scheduled jobs · imports</text>
</svg>

### Useful notebook magic commands

:::mint
```python
%timeit np.random.randn(10_000)  # microbenchmark (many runs, averaged)
%%time                            # cell-level wall-clock time (single run)
%matplotlib inline                # render plots in cell output, not a window
%load_ext autoreload              # auto-reload imported modules on change
%autoreload 2
```
:::

### Making notebooks reproducible

- **Restart & Run All** before saving results. If it fails, the notebook has hidden state
- Set seeds at the top of every notebook: `np.random.seed(42)`, `torch.manual_seed(42)`
- Pin the kernel version in the venv; commit `pyproject.toml` and `uv.lock`
- `nbstripout` — a git filter that strips cell outputs before committing, keeping diffs readable

:::warn
A notebook that only works when you run cells in a specific order is not a reproducible artifact — it is a description of one session. Production systems that depend on notebooks fail silently when the kernel is restarted. The symptom: "it worked on my machine."
:::
