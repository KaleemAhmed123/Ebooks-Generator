## Constitutional AI

- **Constitutional AI (CAI)** (Anthropic, 2022) is a method for making a model's *behavior* safer by training it against an explicit set of written principles — a **constitution** — instead of relying only on human feedback for every case. You met it in Booklet 4's alignment; here is why it matters for autonomous agents.

<svg viewBox="0 0 360 88" role="img" aria-label="The model critiques and revises its own outputs against a written constitution, then trains on the revisions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="34" width="70" height="24" rx="3" fill="#24405e"/><text x="45" y="49" text-anchor="middle" fill="#fff" font-size="6">draft answer</text>
  <rect x="104" y="30" width="86" height="32" rx="4" fill="#a03050"/><text x="147" y="44" text-anchor="middle" fill="#fff" font-size="6">critique vs</text><text x="147" y="54" text-anchor="middle" fill="#fc8" font-size="5.5">constitution</text>
  <rect x="214" y="34" width="70" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="249" y="49" text-anchor="middle" font-size="6">revise</text>
  <rect x="304" y="34" width="46" height="24" rx="3" fill="#24405e"/><text x="327" y="49" text-anchor="middle" fill="#fff" font-size="6">train</text>
  <path d="M80 46 L102 46" stroke="#888" marker-end="url(#ca2)"/><path d="M190 46 L212 46" stroke="#888" marker-end="url(#ca2)"/><path d="M284 46 L302 46" stroke="#888" marker-end="url(#ca2)"/>
  <defs><marker id="ca2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** write a **constitution** — a set of principles ("do not help with X", "be honest about uncertainty", "respect user autonomy"). The model **critiques its own outputs** against these principles and **revises** them; training on those revisions teaches the model to follow the constitution. Much of the human labor of RLHF is replaced by the model applying written rules to itself (RLAIF — reinforcement learning from AI feedback).
- **Why it matters for autonomy:** an autonomous agent acts *without a human checking each output*, so its *built-in* dispositions — what it will and won't do on its own — are the first line of safety. A model trained to refuse harmful actions and respect boundaries is safer to run unsupervised than one relying on an external filter alone. The constitution makes those dispositions **explicit and inspectable** — you can read what the model was trained to value.
- **The advantage over pure human feedback:** it *scales* (rules apply to endless cases without per-case labels) and is *transparent* (the principles are written down, debatable, and revisable) — important for governing agents whose behavior you must be able to reason about and defend.

:::note
Constitutional AI shifts safety from "hope the model behaves" toward "train the model against stated principles you can inspect." For agents, this is foundational: the safety stack in this module (gates, sandboxes, kill switches) contains *what an agent does*, but CAI shapes *what an agent wants to do* — its intrinsic refusals and values. Both layers matter: a well-aligned model reduces how often the containment is tested, and containment protects against the cases where alignment fails. Autonomy safety is alignment *and* containment, not either alone.
:::
