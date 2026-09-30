## Token and cost optimization

- LLM cost is **per token** — input and output, priced separately, output usually 3–5× more. At scale this is the biggest line item, and most of it is waste you can cut without hurting quality.
- Know your cost equation before optimising:

:::mint
```
cost per call = (input_tokens × in_price) + (output_tokens × out_price)
monthly = cost_per_call × calls
```
Output tokens dominate — capping length saves the most.
:::

<svg viewBox="0 0 318 58" role="img" aria-label="Cost levers: shorten prompts, cap output, cache prefixes, batch, and route to smaller models" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="18" width="58" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="35" y="32" text-anchor="middle">trim prompt</text>
  <rect x="70" y="18" width="58" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="99" y="32" text-anchor="middle">cap output</text>
  <rect x="134" y="18" width="50" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="159" y="32" text-anchor="middle">cache</text>
  <rect x="190" y="18" width="50" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="215" y="32" text-anchor="middle">batch</text>
  <rect x="246" y="18" width="66" height="22" rx="3" fill="#24405e"/><text x="279" y="32" text-anchor="middle" fill="#fff">route small</text>
</svg>

- The levers, biggest first:
  - **Cap output** — set `max_tokens`, ask for concise answers. Output is the priciest tokens.
  - **Trim input** — cut boilerplate, compress history, retrieve fewer/shorter chunks (context engineering, 11-05).
  - **Prompt caching** — reuse a fixed prefix at ~90% off (next page).
  - **Batch** — group non-urgent jobs; batch APIs run ~50% cheaper.
  - **Route** — send easy requests to a small cheap model, hard ones to the big model (page 11-19).

:::note
Measure before cutting. Log tokens per request and cost per feature, then attack the top line. Most teams discover one bloated system prompt or an uncapped output driving the majority of spend — a one-line fix.
:::

:::warn
Do not optimise cost blind to quality. Trimming context or forcing terse answers can drop accuracy or drop the "I don't know" safety behaviour. Track a quality metric (page 11-16) *alongside* cost, and cut only where quality holds. Cheap and wrong is the most expensive outcome.
:::
