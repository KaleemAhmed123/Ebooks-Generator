## Naming and descriptions

- The **description** is where you win or lose. Two rules carry most of the weight: say **what it does**, and say **when to use it** (and when not to).

:::mint
```text
✗ "Weather tool."
✗ "Gets weather."
✓ "Get the current weather (temperature, conditions) for a city.
   Use when the user asks about current or today's weather.
   Do NOT use for forecasts beyond today — use get_forecast for that."
```
:::

- **Name like a function, clearly and consistently.** `get_weather`, not `weather` or `doWeatherLookup`. Use a verb_noun pattern across all your tools so the model sees a coherent toolbox, not a grab-bag.
- **Descriptions carry the boundaries.** The most valuable sentences tell the model *when not to* call it and *which sibling tool* to prefer instead. That single "do NOT use for X, use Y" line prevents the most common misfire: two overlapping tools the model confuses.
- **Encode preconditions.** "Requires the user's account id — call get_user first if you don't have it." The model reads this and sequences calls correctly, instead of calling with a guessed id.
- **Length is fine when it earns its place.** A tool description can be a short paragraph. Tokens spent here are the cheapest reliability you will ever buy — far cheaper than the failed runs a vague description causes.

<svg viewBox="0 0 360 66" role="img" aria-label="A good description states purpose, when to use, when not to use, and preconditions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="18" width="80" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="48" y="32" text-anchor="middle" font-size="6">what it does</text><text x="48" y="44" text-anchor="middle" font-size="6">when to use</text>
  <rect x="96" y="18" width="80" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="136" y="38" text-anchor="middle" font-size="6">when NOT to</text>
  <rect x="184" y="18" width="80" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="224" y="38" text-anchor="middle" font-size="6">which sibling</text>
  <rect x="272" y="18" width="80" height="34" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="312" y="38" text-anchor="middle" font-size="6">preconditions</text>
</svg>

:::interview
**"A model keeps calling the wrong one of two similar tools. Fix?"** Fix the descriptions, not the model. Make each description state explicitly when to use *this* one and when to prefer the *other* ("use search_web for public info; use search_docs for internal wiki"). Distinct names help too. Overlapping, vague descriptions are the root cause of tool confusion, and the fix is a one-line schema edit.
:::
