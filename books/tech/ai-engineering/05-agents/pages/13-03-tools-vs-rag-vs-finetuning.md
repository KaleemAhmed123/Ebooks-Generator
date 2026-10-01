## Tools vs RAG vs fine-tuning

- "The model doesn't know X" has three fixes, and picking the wrong one wastes weeks. They are not interchangeable.

<svg viewBox="0 0 360 108" role="img" aria-label="Fine-tuning changes weights, RAG adds retrieved context, tools call live functions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="16" width="108" height="80" rx="4" fill="#f0f0f5" stroke="#888"/><text x="62" y="30" text-anchor="middle" font-size="7">fine-tune</text><text x="62" y="46" text-anchor="middle" font-size="6" fill="#6b6b6b">changes weights</text><text x="62" y="62" text-anchor="middle" font-size="6">teaches skills,</text><text x="62" y="72" text-anchor="middle" font-size="6">style, format</text><text x="62" y="88" text-anchor="middle" font-size="5.5" fill="#a03050">static, costly</text>
  <rect x="126" y="16" width="108" height="80" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="7">RAG</text><text x="180" y="46" text-anchor="middle" font-size="6" fill="#6b6b6b">adds context</text><text x="180" y="62" text-anchor="middle" font-size="6">injects known</text><text x="180" y="72" text-anchor="middle" font-size="6">facts/documents</text><text x="180" y="88" text-anchor="middle" font-size="5.5" fill="#1a3a2a">read-only knowledge</text>
  <rect x="244" y="16" width="108" height="80" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="298" y="30" text-anchor="middle" font-size="7">tools</text><text x="298" y="46" text-anchor="middle" font-size="6" fill="#6b6b6b">call functions</text><text x="298" y="62" text-anchor="middle" font-size="6">live data +</text><text x="298" y="72" text-anchor="middle" font-size="6">actions</text><text x="298" y="88" text-anchor="middle" font-size="5.5" fill="#1a3a2a">dynamic, can write</text>
</svg>

- **Fine-tuning** changes the weights. Use it to teach a *skill, style, or format* the model lacks — not to inject facts. Facts go stale; retraining is slow and expensive.
- **RAG** (retrieval-augmented generation, Booklet 4) fetches relevant documents into the prompt. Use it for a large, changing body of *knowledge to read* — docs, tickets, a wiki. Read-only.
- **Tools** call live functions. Use them for anything **dynamic or that acts** — today's price, sending an email, running a query, booking a flight. RAG *reads*; tools can *write*.

- They combine. A production agent often fine-tunes for its domain voice, uses RAG for background knowledge, and calls tools to act — and RAG itself can be *implemented* as a `search` tool the model calls when it decides it needs to look something up (agentic RAG).

:::interview
"The model gives outdated stock prices. RAG or a tool?"

A tool. Stock prices are live, high-frequency data — you want a `get_price` function hitting an API at call time, not documents in a vector store that are stale the moment they're indexed. RAG fits a slowly-changing knowledge base; anything real-time or that must *act* is a tool. Fine-tuning fixes neither — it teaches skills, not current facts.
:::
