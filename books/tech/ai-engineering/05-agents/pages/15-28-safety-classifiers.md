## Safety classifiers (Llama Guard)

- A practical guardrail: a dedicated **safety classifier** — a smaller model trained to flag unsafe content — that screens an agent's inputs and outputs. **Llama Guard** (Meta) is the best-known open one; providers ship their own. It is a cheap, fast tripwire around a capable agent.

<svg viewBox="0 0 360 84" role="img" aria-label="A safety classifier screens input before the agent and output before it returns, flagging unsafe content" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="32" width="46" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="31" y="46" text-anchor="middle">input</text>
  <rect x="64" y="28" width="52" height="30" rx="3" fill="#a03050"/><text x="90" y="42" text-anchor="middle" fill="#fff">Guard</text><text x="90" y="52" text-anchor="middle" fill="#fc8" font-size="5">classify</text>
  <rect x="140" y="30" width="60" height="26" rx="4" fill="#24405e"/><text x="170" y="47" text-anchor="middle" fill="#fff">agent</text>
  <rect x="224" y="28" width="52" height="30" rx="3" fill="#a03050"/><text x="250" y="42" text-anchor="middle" fill="#fff">Guard</text><text x="250" y="52" text-anchor="middle" fill="#fc8" font-size="5">classify</text>
  <rect x="300" y="32" width="52" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="326" y="46" text-anchor="middle">output</text>
  <path d="M54 43 L62 43" stroke="#888" marker-end="url(#sc)"/><path d="M116 43 L138 43" stroke="#888" marker-end="url(#sc)"/><path d="M200 43 L222 43" stroke="#888" marker-end="url(#sc)"/><path d="M276 43 L298 43" stroke="#888" marker-end="url(#sc)"/>
  <defs><marker id="sc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What it does:** classify text against a taxonomy of harm categories (violence, self-harm, illegal, privacy, etc.) and return safe/unsafe with the category. You run it on **inputs** (catch a harmful or injection-laden request before the agent acts, 14-80) and on **outputs/proposed actions** (catch a harmful result before it leaves). It is the input/output guardrail of the OpenAI SDK (14-80), as a standalone model.
- **Why a separate small model:** it is **cheap and fast** (run it on every request without much latency/cost), **specialized** (tuned for detection, often better than asking the main model), and **independent** (a second opinion that does not share the main model's exact blind spots). It can run *in parallel* with the agent as a tripwire (14-38 voting/parallel).
- **Its limits:** classifiers have false positives (blocking safe content) and false negatives (missing clever/obfuscated harm), and they cover *content*, not the full *action* semantics (a classifier may not understand that a benign-looking command is destructive in context). So they are **one layer**, not the whole defense — pair with the trained-in alignment (15-26), action constitution (15-27), and hard constraints (14-133).

:::note
Safety classifiers are the pragmatic, deployable piece of the safety stack: an off-the-shelf or fine-tuned guard model you can put in front of and behind any agent today, cheaply, to catch the obvious-unsafe cases. They are not sufficient alone — no single filter is (14-130) — but as one layer in defense-in-depth they meaningfully raise the floor, and their independence from the main model is exactly what makes layered defense work: an attacker must beat *both* the aligned agent and the separate guard.
:::
