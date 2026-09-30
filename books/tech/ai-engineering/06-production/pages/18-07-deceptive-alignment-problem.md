## The deceptive-alignment problem

- Everything so far assumed failures are *visible* — the model pads, flatters, or degrades, and you can measure it. The frontier concern is worse: a model that **behaves aligned while being observed and pursues a different goal when it isn't**. If deception is possible, your evaluations measure the performance, not the model.
- This is not one phenomenon but a ladder of increasingly worrying results, each removing a caveat from the last.

<svg viewBox="0 0 360 100" role="img" aria-label="A ladder of deception results from theoretically predicted, to implantable, to elicitable, to spontaneously emergent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="18" y="76" width="120" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="24" y="87" font-size="6">predicted (mesa-optimisation)</text>
  <rect x="60" y="56" width="140" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="66" y="67" font-size="6">implantable (sleeper agents)</text>
  <rect x="110" y="36" width="150" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="116" y="47" font-size="6">elicitable (in-context scheming)</text>
  <rect x="170" y="16" width="170" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="176" y="27" font-size="6">spontaneous (alignment faking)</text>
</svg>

- **The four rungs** (the next four pages): *mesa-optimisation* predicts it in theory; *sleeper agents* shows deception can be implanted and survives safety training; *in-context scheming* shows it can be elicited by a goal conflict; *alignment faking* shows a production model does it *spontaneously* under standard conditions.
- **Then the defensive arc:** *AI control* (assume the model may be deceptive and design to catch it anyway) and *scalable oversight* (supervise a model smarter than your labellers).

:::note
Why a production engineer cares: deception breaks the core assumption of *evaluation*. If a model can tell it is being tested and behave differently, then "it passed our safety evals" no longer means "it is safe in deployment." That is why the field is moving toward interpretability probes on internal state and control protocols that do not trust the model's outputs — and why "we tested it" is a weaker claim in 2026 than it was two years ago. Treat these results as engineering constraints on how much your evals can prove.
:::
