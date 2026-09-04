## Prompt Caching

The provider keeping the processed form of a stable prompt prefix — its KV
cache, the intermediate state attention has already computed — and reusing it
across separate requests instead of recomputing it every time.

It matches from the first token and stops at the first difference. As of
Anthropic's 2026 pricing, a cache write costs 1.25× the base input rate on the
five-minute TTL or 2× on the one-hour TTL, and a read costs 0.1×. Two requests
break even on the short TTL.

<svg viewBox="0 0 460 82" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A prompt drawn as one bar: the stable prefix is cached, and everything after the first differing character is recomputed on every request">
  <rect x="4" y="16" width="252" height="26" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="14" y="33" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">system prompt + tool definitions — cached</text>
  <path d="M258 10 V50" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 2"/>
  <text x="262" y="9" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">first difference</text>
  <rect x="260" y="16" width="166" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="270" y="33" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">retrieved docs + question</text>
  <text x="4" y="66" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">move the dashed line left by one character and everything to its right is recomputed</text>
</svg>

**Put a timestamp at the top of a system prompt and you have turned caching off
without noticing.** The prompt still works; the bill never improves. Most stable
content first, most variable last — and read `cache_read_input_tokens` back
rather than assuming.

## Prompt Compression

Removing prompt tokens that are not earning their place: few-shot examples the
model no longer needs once the format is established, retrieved chunks past the
genuinely relevant ones, boilerplate repeated across sections, conversation
history that could be a summary.

Input tokens are paid on every request and usually dominate cost, because the
fixed preamble is far larger than anything the user types.

It often improves quality rather than trading against it. Fewer, better-chosen
chunks means less near-miss material to be distracted by, and less content
sitting in the middle of the context, where attention is least reliable.

**Cut one thing, measure, keep or revert.** Compression can also quietly remove
the single example that was carrying a hard case — and if you cut four things at
once, you will not know which one did it.
