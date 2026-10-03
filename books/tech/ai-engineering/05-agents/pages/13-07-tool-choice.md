## Tool choice: auto, any, forced, none

- By default the model *decides* whether to call a tool. Sometimes you need to override that decision. **Tool choice** is the control.

| Setting | Behavior | Use when |
|---|---|---|
| **auto** (default) | Model chooses: text or any tool | Normal agents — let it decide |
| **any / required** | Must call *some* tool, model picks which | You know a tool is needed this turn |
| **forced** (`tool: name`) | Must call *this specific* tool | Structured extraction; a fixed first step |
| **none** | No tools this turn, text only | You want a plain answer, tools off |

<svg viewBox="0 0 360 92" role="img" aria-label="Tool choice narrows from free choice to a single forced tool" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="76" height="32" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="46" y="44" text-anchor="middle" font-size="6.5">auto</text><text x="46" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">text or tool</text>
  <rect x="98" y="30" width="76" height="32" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="136" y="44" text-anchor="middle" font-size="6.5">any</text><text x="136" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">some tool</text>
  <rect x="188" y="30" width="76" height="32" rx="3" fill="#d5e8fb" stroke="#24405e"/><text x="226" y="44" text-anchor="middle" font-size="6.5">forced</text><text x="226" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">this tool</text>
  <rect x="278" y="30" width="76" height="32" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="316" y="44" text-anchor="middle" font-size="6.5">none</text><text x="316" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">text only</text>
  <text x="180" y="80" text-anchor="middle" font-size="6" fill="#6b6b6b">free ————————————————→ constrained</text>
</svg>

- **Forced tool choice is the trick behind structured extraction.** Want guaranteed JSON out of a model? Define a tool whose schema *is* your output shape and force it. The model must "call" it, so it must produce arguments matching your schema — you get validated structured data, not prose you have to parse (13-11).
- **Caution with `any`/`forced`:** if you require a tool call every turn, the model can never say "I'm done." Agents that loop on forced tool choice never terminate. Use `auto` for the loop; use forced only for a specific one-shot step.

:::warn
A classic infinite-loop bug: an agent set to `tool_choice: any` so it "always does something." It can never emit the final text answer, because every turn it is compelled to call a tool — so it calls tools forever, or picks a nonsense one. The natural stop signal of an agent is the model choosing *text* over a tool; forcing tools removes the brake.
:::
