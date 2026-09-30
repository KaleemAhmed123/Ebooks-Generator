## Chatbots, rule to neural

- Conversational systems have three generations, each fixing the last one's core weakness.
- **Rule-based (1966–).** ELIZA matched patterns and reflected them back — *"I feel X"* → *"Why do you feel X?"* No understanding, just templates. Brittle: one unexpected phrasing and it breaks.
- **Retrieval-based (2010s).** Store thousands of canned responses; for each user message, retrieve the closest one by similarity. Always fluent (a human wrote every reply) but cannot say anything not already in the bank.
- **Generative (2020s–).** An LLM writes each reply token by token. Handles anything, stays on topic across turns — the ChatGPT generation.

<svg viewBox="0 0 360 60" role="img" aria-label="Three generations of chatbots from rules to retrieval to generation, rising in capability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="34" width="100" height="18" rx="3" fill="#c9d6e5"/><text x="64" y="47" text-anchor="middle">rules (ELIZA)</text>
  <rect x="128" y="24" width="100" height="28" rx="3" fill="#6a9bd0"/><text x="178" y="42" text-anchor="middle">retrieval</text>
  <rect x="242" y="10" width="104" height="42" rx="3" fill="#24405e"/><text x="294" y="35" text-anchor="middle" fill="#fff">generative (LLM)</text>
  <text x="180" y="59" text-anchor="middle" fill="#6b6b6b">capability →</text>
</svg>

:::warn
Generation traded reliability for flexibility. A rule-based bot is *predictable* — it only ever says what you wrote, so it never goes off the rails or invents policy. A generative bot can say **anything**, including confidently wrong facts, off-brand statements, or content it was tricked into (prompt injection). Production chat systems in 2026 wrap the LLM in guardrails, retrieval for grounding, and refusal rules — reintroducing, deliberately, some of the control the rule-based era had for free.
:::
