# LLM Engineering

## Prompt engineering

- The cheapest way to change an LLM's behaviour is not training — it is **the prompt**. Prompt engineering is writing the input so the model reliably produces what you want. It is the first tool to reach for, before fine-tuning or RAG.
- A prompt has parts that each do a job:

:::mint
```
[system]  role, rules, output format          ← sets the frame
[context] retrieved docs, examples, data       ← what to use
[task]    the actual instruction               ← be specific
[input]   the user's content                    ← what to act on
```
:::

- Four moves that reliably help:
  - **Be specific** — "summarise in 3 bullets, ≤15 words each" beats "summarise".
  - **Give a role** — "You are a senior tax accountant" primes the right register and knowledge.
  - **Show the format** — an example of the exact output shape you want.
  - **Let it think** — for hard tasks, ask for reasoning before the answer (page 11-02).

<svg viewBox="0 0 314 46" role="img" aria-label="A vague prompt yields a vague answer; a structured prompt yields a targeted one" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="12" width="130" height="24" rx="3" fill="#fbeaea" stroke="#c0392b"/><text x="75" y="22" text-anchor="middle" fill="#c0392b" font-size="7">"tell me about dogs"</text><text x="75" y="32" text-anchor="middle" font-size="6.5" fill="#6b6b6b">→ rambling essay</text>
  <rect x="174" y="12" width="130" height="24" rx="3" fill="#eafaf0" stroke="#1a3a2a"/><text x="239" y="22" text-anchor="middle" fill="#1a3a2a" font-size="7">role + task + format</text><text x="239" y="32" text-anchor="middle" font-size="6.5" fill="#6b6b6b">→ exactly what you asked</text>
</svg>

:::warn
Prompts are **brittle and model-specific**. Wording that works on one model can fail on another or after a version update, and small phrasings ("think step by step") can swing results. Treat prompts as versioned, tested assets — not throwaway strings. What you cannot fix with a prompt is missing knowledge; that is RAG's job (page 11-07).
:::
