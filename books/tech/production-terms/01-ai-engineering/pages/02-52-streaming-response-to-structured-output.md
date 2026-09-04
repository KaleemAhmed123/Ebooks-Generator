## Streaming Response

Delivering tokens as they are produced instead of after the full answer is
assembled. The transport is server-sent events. Anthropic's Messages API opens
with `message_start`, emits repeated `content_block_delta` events carrying the
text, closes with `message_stop`, and scatters `ping` events throughout.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A server-sent event stream begins with message_start, continues with repeated content_block_delta events and occasional pings, and can carry an error event partway through after the response already returned HTTP 200">
  <rect x="4" y="18" width="80" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="44" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">message_start</text>
  <rect x="88" y="18" width="42" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="109" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">delta</text>
  <rect x="134" y="18" width="42" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="155" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">delta</text>
  <rect x="180" y="18" width="38" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="199" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">ping</text>
  <rect x="222" y="18" width="42" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="243" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">delta</text>
  <rect x="268" y="18" width="76" height="22" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="306" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">error</text>
  <path d="M348 29 H380" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="386" y="32" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">no stop</text>
  <text x="4" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">HTTP 200 was sent before any of this</text>
  <text x="4" y="70" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">an overload can arrive after a hundred tokens are already on screen</text>
</svg>

Failure therefore happens after apparent success: the status code committed
before the model did. Clients need a path for a stream that errors or simply
stops.

**You cannot validate what the user has already read.** Schema checks,
groundedness scoring and output classifiers all need the whole response, so a
streamed answer is either unchecked or checked too late. Buffering is the price
of enforcement.

## Structured Output

*JSON mode, constrained decoding*

Restricting generation to a schema so invalid output cannot be produced. At each
step the decoder zeroes the probability of every token the grammar forbids —
inside a JSON string a closing brace is not legal, so it is never sampled.
Malformed output is not rejected after the fact. It is never generated.

The alternative is asking politely in the prompt, which fails at a small rate
that becomes hundreds of daily incidents at real volume, clustered on the
unusual inputs you cared about.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="At one decoding step the grammar sets the probability of illegal next tokens to zero before sampling, leaving only schema-legal tokens available">
  <text x="4" y="16" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">next-token probabilities, one step inside a JSON string</text>
  <rect x="8" y="24" width="30" height="40" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="23" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">"a"</text>
  <rect x="48" y="34" width="30" height="30" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="63" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">"b"</text>
  <rect x="88" y="44" width="30" height="20" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/><text x="103" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">"c"</text>
  <path d="M128 30 L158 64 M158 30 L128 64" stroke="#1a1a1a" stroke-width="1.2"/><text x="143" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">}</text>
  <path d="M168 30 L198 64 M198 30 L168 64" stroke="#1a1a1a" stroke-width="1.2"/><text x="183" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">,</text>
  <path d="M208 30 L238 64 M238 30 L208 64" stroke="#1a1a1a" stroke-width="1.2"/><text x="223" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">]</text>
  <text x="252" y="42" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">crossed out = set to zero</text>
  <text x="252" y="56" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">before sampling, not after</text>
</svg>

**Valid is not correct.** OpenAI's own guide warns that structured outputs "can
still contain mistakes" and can hallucinate when the input does not match the
schema. Check the values against the source; the schema only fixes the shape.
