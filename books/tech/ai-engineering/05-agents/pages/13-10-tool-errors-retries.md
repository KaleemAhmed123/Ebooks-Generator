## Tool errors, retries, and timeouts

- Tools fail: the API is down, the argument is invalid, the query times out, the model hallucinated a nonexistent tool. How you handle failure decides whether the agent recovers or spirals. The key move: **tell the model, don't crash.**

<svg viewBox="0 0 360 96" role="img" aria-label="A tool error is returned to the model as a tool_result so the model can retry or adapt" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="36" width="70" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="43" y="48" text-anchor="middle" font-size="6">tool fails</text><text x="43" y="57" text-anchor="middle" font-size="5.5" fill="#a03050">timeout/500</text>
  <rect x="104" y="34" width="104" height="28" rx="3" fill="#f4f4f4" stroke="#888"/><text x="156" y="48" text-anchor="middle" font-size="6">tool_result:</text><text x="156" y="57" text-anchor="middle" font-size="5.5">is_error, "rate limited"</text>
  <rect x="238" y="36" width="60" height="24" rx="4" fill="#24405e"/><text x="268" y="51" text-anchor="middle" fill="#fff" font-size="6">model</text>
  <rect x="316" y="30" width="38" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="335" y="42" text-anchor="middle" font-size="5.5">retry</text>
  <rect x="316" y="52" width="38" height="18" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="335" y="64" text-anchor="middle" font-size="5.5">adapt</text>
  <path d="M78 48 L102 48" stroke="#888" marker-end="url(#te)"/><path d="M208 48 L236 48" stroke="#888" marker-end="url(#te)"/><path d="M298 44 L314 40" stroke="#888" marker-end="url(#te)"/><path d="M298 52 L314 58" stroke="#888" marker-end="url(#te)"/>
  <defs><marker id="te" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Return errors as tool results, marked as errors.** Most APIs let a `tool_result` carry an `is_error` flag. Put a *useful* message in it — "city not found, try a valid city name" — and the model can correct itself: fix the argument, try another tool, or tell the user. A raw stack trace teaches it nothing; a plain-English reason lets it recover.
- **Retry the transient, not the logical.** A timeout or 503 → retry with backoff (in *your* code, silently). An invalid-argument or not-found → return to the model to fix, since retrying the same bad call repeats the failure.
- **Always set timeouts.** A tool that hangs hangs the whole agent. Cap every call; on timeout, return an error result so the loop continues.
- **Validate before executing.** Check the model's arguments against the schema first. Reject a hallucinated tool name or a missing required field with a clear error result rather than passing garbage to your function.

:::interview
**"An agent calls a tool that returns a 500. What should happen?"** Distinguish transient from logical. A 500/timeout is transient — retry a few times with exponential backoff in your own code, invisibly. If it still fails, return an *error tool_result* with a readable message so the model can adapt (try an alternative, or tell the user) rather than the process crashing. Never let a tool failure throw and kill the loop; convert every failure into an observation the model can reason about.
:::
