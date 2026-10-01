## Structured output vs tool calls

- Two features look similar and get confused. Both make the model emit JSON. They solve different problems.
- **Tool calling:** the model *chooses* to call a function and you *run* it — an action with a side effect and a result fed back. **Structured output:** you force the model's *final answer* into a fixed JSON shape — no function runs, you just want parseable data out.

<svg viewBox="0 0 360 96" role="img" aria-label="Tool calling runs a function and loops, structured output just returns typed JSON" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="14" width="168" height="76" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="92" y="30" text-anchor="middle" font-size="7">tool calling</text><text x="92" y="46" text-anchor="middle" font-size="6">model asks → you run →</text><text x="92" y="58" text-anchor="middle" font-size="6">result back → loop</text><text x="92" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">an action happens</text>
  <rect x="184" y="14" width="168" height="76" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="268" y="30" text-anchor="middle" font-size="7">structured output</text><text x="268" y="46" text-anchor="middle" font-size="6">model emits JSON matching</text><text x="268" y="58" text-anchor="middle" font-size="6">a schema → you parse</text><text x="268" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">no function runs</text>
</svg>

- **How to force structure** (Booklet 4's constrained decoding, applied): a response-format / JSON-schema parameter that constrains generation so the output *must* validate, or the forced-tool-choice trick (13-07) where the tool's schema is your output shape. Either way you get typed data, not prose to regex.
- **When to use which:**
  - Need the model to *do* something (search, send, compute) → **tool calling**.
  - Need the model's answer as clean data for your code (extract fields, classify, return a form) → **structured output**.
  - Extracting fields from a document into JSON → structured output, even though people reach for a "tool."

:::interview
"Structured output or a tool for extracting fields from an invoice into JSON?"

Structured output. Nothing needs to *run* — you want the model's answer shaped as validated JSON. Constrain the response to your schema (or force a single extraction tool whose schema is the output). Reserve tool calling for when a function with a side effect must actually execute and return a result the model then reasons over.
:::
