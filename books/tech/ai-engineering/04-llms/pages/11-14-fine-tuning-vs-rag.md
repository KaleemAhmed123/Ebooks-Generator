## Fine-tuning vs RAG

- The most common design question: to make a model know your domain, do you **fine-tune** it or use **RAG**? They solve different problems, and the wrong choice wastes weeks.
- The rule: **RAG changes what the model knows; fine-tuning changes how it behaves.**

<svg viewBox="0 0 324 74" role="img" aria-label="RAG injects knowledge at query time; fine-tuning bakes behaviour into the weights" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="10" width="148" height="56" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="82" y="24" text-anchor="middle" font-size="8" fill="#24405e">RAG — knowledge</text><text x="82" y="38" text-anchor="middle">facts, docs, fresh data</text><text x="82" y="49" text-anchor="middle">private, citable</text><text x="82" y="60" text-anchor="middle" fill="#6b6b6b">update = edit the docs</text>
  <rect x="168" y="10" width="148" height="56" rx="3" fill="#24405e"/><text x="242" y="24" text-anchor="middle" font-size="8" fill="#fff">fine-tune — behaviour</text><text x="242" y="38" text-anchor="middle" fill="#fff">style, format, tone</text><text x="242" y="49" text-anchor="middle" fill="#fff">a skill or task shape</text><text x="242" y="60" text-anchor="middle" fill="#ccd">update = retrain</text>
</svg>

- **Reach for RAG when** the need is knowledge: facts that change, private documents, anything that must be **cited** or kept current. Cheaper, faster to update, and the source is auditable.
- **Reach for fine-tuning when** the need is behaviour: a consistent output format, a specific voice, a narrow task done reliably, or lower latency by avoiding long prompts.
- **Often both**: fine-tune for the format and tone, RAG for the facts. They are complementary, not rivals.

:::note
Try in this order: **prompt → RAG → fine-tune.** Each step costs more effort and money than the last. Most needs are solved by a good prompt plus RAG; fine-tuning is the last resort when those genuinely fall short, not the first move.
:::

:::warn
Fine-tuning to add **facts** is the classic mistake. Models don't reliably absorb new facts from a fine-tune the way they absorb style — you get expensive, unreliable memorisation, and the facts still go stale. If the answer is "the model needs to *know* X," that is RAG, not fine-tuning.
:::
