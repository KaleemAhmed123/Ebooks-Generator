## Red-team tooling: PyRIT

- **PyRIT** (Python Risk Identification Tool, Microsoft/Azure) is a red-teaming *framework* rather than a fixed probe set. Where garak runs a catalogue of known attacks, PyRIT gives you composable pieces to build *adaptive, multi-turn* attacks — including the PAIR-style attacker-LLM loop (18-15) against your specific target.
- Four building blocks compose an attack:

<svg viewBox="0 0 360 84" role="img" aria-label="PyRIT pipeline: orchestrator drives a target through converters, and a scorer judges whether the attack succeeded" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="34" width="66" height="22" rx="3" fill="#24405e"/><text x="43" y="43" text-anchor="middle" font-size="6" fill="#fff">orchestrator</text><text x="43" y="52" text-anchor="middle" font-size="5" fill="#cdd">drives strategy</text>
  <rect x="92" y="34" width="66" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="125" y="43" text-anchor="middle" font-size="6">converter</text><text x="125" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">obfuscate prompt</text>
  <rect x="174" y="34" width="66" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="207" y="43" text-anchor="middle" font-size="6">target</text><text x="207" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">model under test</text>
  <rect x="256" y="34" width="66" height="22" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="289" y="43" text-anchor="middle" font-size="6">scorer</text><text x="289" y="52" text-anchor="middle" font-size="5" fill="#6b6b6b">did it break?</text>
  <path d="M76 45 L90 45" stroke="#888" marker-end="url(#py)"/><path d="M158 45 L172 45" stroke="#888" marker-end="url(#py)"/><path d="M240 45 L254 45" stroke="#888" marker-end="url(#py)"/>
  <path d="M289 56 Q289 74 160 74 Q43 74 43 58" fill="none" stroke="#a03050" stroke-dasharray="3 2" marker-end="url(#py)"/><text x="165" y="72" text-anchor="middle" font-size="5" fill="#a03050">score feeds next attempt</text>
  <defs><marker id="py" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Orchestrator** drives the attack strategy (single-shot, multi-turn, PAIR-style refinement). **Converters** transform prompts to evade filters (base64, ASCII-art, translation — the encoding-gap attacks). **Targets** wrap the system under test (a model, an endpoint, a whole agent). **Scorers** judge whether an attempt succeeded, often an LLM-as-judge, feeding the result back to the orchestrator.
- **Why a framework, not a catalogue:** your *system* has attacks garak's generic probes will not find — an injection through your retrieval pipeline, a jailbreak specific to your system prompt. PyRIT lets you script those, run them multi-turn, and measure the success rate against *your* deployment.

:::note
The division of labour is the lesson: **garak for breadth** (is the model robust to known attacks, as a fast regression gate), **PyRIT for depth** (is *my system* robust to adaptive, multi-turn, product-specific attacks). Serious safety programs run both — garak in CI on every model bump, PyRIT campaigns before major launches and against the agent's real tool surface. Neither replaces human red-teamers probing the worst-case for your specific product.
:::
