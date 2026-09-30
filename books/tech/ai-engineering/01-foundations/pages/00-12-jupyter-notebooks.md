## Jupyter notebooks

- A **Jupyter notebook** is a document of runnable code cells mixed with text and charts. You run a cell, see its output right below, tweak, and run again.
- This tight loop is why notebooks dominate the *exploratory* phase of AI: inspect data, plot a distribution, try a model, all without rerunning a whole script.

<svg viewBox="0 0 320 90" role="img" aria-label="A notebook cell of code with its output chart shown directly beneath it" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="20" y="10" width="280" height="24" fill="#f4f4f4" stroke="#bbb"/><text x="30" y="25" font-family="monospace" font-size="8">In [1]: df.hist("price")</text>
  <rect x="20" y="38" width="280" height="42" fill="#fff" stroke="#e8f4fd"/>
  <rect x="40" y="52" width="14" height="22" fill="#24405e"/><rect x="58" y="46" width="14" height="28" fill="#24405e"/><rect x="76" y="58" width="14" height="16" fill="#24405e"/><rect x="94" y="64" width="14" height="10" fill="#24405e"/>
  <text x="220" y="62" fill="#6b6b6b">output appears inline</text>
</svg>

### The core idea, and its trap

- Cells share one memory (the **kernel**), so a variable set in cell 1 is visible in cell 5.
- But you can run cells **out of order**, and the notebook remembers the last run of each — not the order you would read them top to bottom.

:::warn
Hidden state is the notebook's defining hazard. A notebook that "works" may only work because of a variable defined in a cell you have since deleted or changed. The honesty test: **Restart kernel and run all**. If it fails top-to-bottom, your results were not reproducible.
:::
