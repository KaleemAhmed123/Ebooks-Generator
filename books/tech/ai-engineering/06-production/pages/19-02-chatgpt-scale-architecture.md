## Mock: ChatGPT-scale chat — architecture

- **Prompt:** "Design a chat assistant serving hundreds of millions of users." **Clarify first:** ~100M DAU, ~15 messages each, streaming chat, 300 ms TTFT P95, multi-turn memory, general knowledge (no per-user RAG), global.

:::mint
```text
API (streaming):
  POST /v1/chat  { conversation_id, message, user_id, stream:true }
    -> SSE token deltas, then { usage, finish_reason }
  conversation_id -> session store (history)   user_id -> rate limit + attribution
```
:::

<svg viewBox="0 0 360 104" role="img" aria-label="Chat architecture: client to regional gateway, session store, prompt cache, serving fleet with KV locality, observability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="8" y="46" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="28" y="57" text-anchor="middle">client</text>
  <rect x="58" y="44" width="52" height="20" rx="3" fill="#24405e"/><text x="84" y="52" text-anchor="middle" fill="#fff">gateway</text><text x="84" y="61" text-anchor="middle" fill="#cdd" font-size="5.5">(per region)</text>
  <rect x="122" y="16" width="60" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="152" y="27" text-anchor="middle">session store</text>
  <rect x="122" y="72" width="60" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="152" y="83" text-anchor="middle">prompt cache</text>
  <rect x="196" y="34" width="80" height="40" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="236" y="48" text-anchor="middle">serving fleet</text><text x="236" y="59" text-anchor="middle" font-size="5.5">vLLM · sticky KV</text><text x="236" y="68" text-anchor="middle" font-size="5.5">spec-decode · FP8</text>
  <rect x="290" y="44" width="62" height="20" rx="3" fill="#24405e"/><text x="321" y="52" text-anchor="middle" fill="#fff" font-size="6">observability</text><text x="321" y="61" text-anchor="middle" fill="#cdd" font-size="5.5">+ safety</text>
  <path d="M48 54 L56 54" stroke="#888" marker-end="url(#c1)"/><path d="M110 50 L120 30" stroke="#888" marker-end="url(#c1)"/><path d="M110 58 L120 78" stroke="#888" marker-end="url(#c1)"/><path d="M110 54 L194 54" stroke="#888" marker-end="url(#c1)"/><path d="M276 54 L288 54" stroke="#888" marker-end="url(#c1)"/>
  <defs><marker id="c1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The spine.** Regional **gateways** (auth, rate limit, safety, routing) near users → **session store** for conversation history → a self-hosted **serving fleet** (vLLM, FP8, speculative decoding) with **sticky KV routing** so each conversation's cache stays warm (17-35) → **observability + safety** wrapping all of it.
- **Two design decisions to state now.** *Self-host open weights* — at this scale the API bill dwarfs GPU cost (proven next page). *No per-user RAG* — it is general knowledge, so no vector DB in the hot path; system prompt is fixed and **prompt-cached**.

:::note
The move that reads as senior here is deferring detail until requirements are pinned, then drawing the *minimal* spine and naming the two big bets (self-host, no-RAG) with a one-line justification each. Everything else — which the next pages fill in — hangs off those two bets. Do not draw a vector DB the requirements did not ask for; the discipline of *not* adding blocks is as much a signal as adding the right ones.
:::
