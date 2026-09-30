## Instruction-following as an alignment signal

- The first thing alignment training buys is **instruction-following**: the model does what the prompt asks, in the format asked, without needing examples. A base model *continues text*; an aligned model *follows instructions*. That shift is the product of SFT + preference training (Booklet 4).
- Instruction-following is also a *measurable proxy* for alignment — how reliably the model honours a system prompt, a refusal policy, or a format constraint is a signal you can test.

<svg viewBox="0 0 360 78" role="img" aria-label="A base model continues text while an instruction-tuned model follows the instruction and honours the system prompt" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="20" width="150" height="44" rx="4" fill="#f4f4f4" stroke="#888"/><text x="87" y="16" text-anchor="middle" font-size="6.5" fill="#6b6b6b">base model</text>
  <text x="20" y="36" font-size="6">"List three fruits:"</text><text x="20" y="50" font-size="6" fill="#a03050">→ "…is a common exam question"</text><text x="20" y="60" font-size="5.5" fill="#6b6b6b">continues the text</text>
  <rect x="198" y="20" width="150" height="44" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="273" y="16" text-anchor="middle" font-size="6.5" fill="#24405e">instruction-tuned</text>
  <text x="206" y="36" font-size="6">"List three fruits:"</text><text x="206" y="50" font-size="6" fill="#1a3a2a">→ "1. apple  2. mango  3. fig"</text><text x="206" y="60" font-size="5.5" fill="#6b6b6b">follows the instruction</text>
</svg>

- **Why it is the foundation.** Nearly every safety control assumes the model follows instructions: a system prompt that says "refuse medical advice," a guardrail that says "only output JSON," a tool policy that says "ask before deleting." If instruction-following is weak, every downstream safety layer built on it is unreliable.
- **But it is a double edge.** A model that follows *any* instruction well will also follow a *malicious* one well — which is exactly why jailbreaks (later in this module) work by reframing a harmful request as an instruction the model is trained to obey.

:::note
Instruction-following is alignment's load-bearing signal and its central tension in one: the same training that makes a model helpfully obedient makes it exploitable, because "helpful" and "harmless" pull in opposite directions the moment the instruction is harmful. The rest of the module is largely about managing that tension — where the model should follow, where it must refuse, and how attackers blur the line.
:::
