## "A PM hands you a vague AI feature request. How do you scope it?"

- **What they're screening for:** turning fuzzy asks into concrete, evaluable engineering — a core AI-eng skill because requirements are usually underspecified.
- **A strong answer shows:**
  - **Clarify the outcome** — what user problem, what success looks like *in numbers*, and what's explicitly out of scope.
  - **Define "good" early** — how will we measure quality? Without an eval target, the feature can't be finished or defended.
  - **Surface constraints** — latency, cost, privacy, volume, accuracy bar.
  - **Name the risks/unknowns** — can the model even do this reliably? What happens when it's wrong?
  - **Propose the smallest valuable slice** — ship a narrow version, measure, expand. Avoid boiling the ocean.
- Essentially: run the requirements + evaluation steps before committing to a design.

:::warn
Weak: start building to the literal ask. Strong: "Before I build, what's the success metric, the accuracy bar, and what do we do when it's wrong? Here's a thin first slice we can evaluate."
:::

:::interview
What's really being tested: that you convert ambiguity into measurable requirements + a small evaluable slice, instead of coding to a vague spec.
:::
