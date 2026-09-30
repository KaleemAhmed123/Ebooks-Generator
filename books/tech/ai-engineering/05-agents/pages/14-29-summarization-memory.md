## Summarization memory

- The simplest long-term memory, and often enough: as the conversation grows, **replace old turns with a running summary**. The context holds a compressed recap of the past plus the recent verbatim turns.

<svg viewBox="0 0 360 92" role="img" aria-label="Old turns collapse into a summary while recent turns stay verbatim, keeping context bounded" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="20" width="120" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="74" y="33" text-anchor="middle" font-size="6">summary of turns 1–40</text>
  <rect x="14" y="46" width="120" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="74" y="56" text-anchor="middle" font-size="5.5">turn 41 (verbatim)</text>
  <rect x="14" y="62" width="120" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="74" y="72" text-anchor="middle" font-size="5.5">turn 42 (verbatim)</text>
  <text x="180" y="50" font-size="7">→</text>
  <rect x="210" y="34" width="140" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="280" y="46" text-anchor="middle" font-size="6">context stays bounded</text><text x="280" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">gist kept, tokens freed</text>
</svg>

- **How it works:** when the transcript nears a token budget, summarize the oldest chunk into a few sentences ("The user is building a CLI in Python; we've set up the parser and are on error handling"), drop the raw turns, and keep the summary + recent turns. Repeat as it grows — a rolling window with a compressed tail.
- **Strengths:** dead simple, model-agnostic, no external store, keeps the *narrative* of a long conversation. It is the default in many chat frameworks (a "conversation summary memory").
- **Weaknesses:** **lossy and lossy-cumulatively.** Each summarization drops detail; summarize a summary enough times and specifics blur into mush. A precise fact from turn 3 ("the API key is in `.env.local`") may survive as "we discussed configuration." It is gist-preserving, not fact-preserving.

:::warn
Summarization memory quietly loses the details that matter most. Because summaries compress and re-compress, exact values — names, numbers, decisions, file paths — degrade into vague paraphrase over a long session. Use it for conversational *continuity*, but back it with a precise store (memory blocks, entity records) for facts that must stay exact. "We decided something about auth" is not a usable memory; "we chose JWT with 15-min expiry" is.
:::
