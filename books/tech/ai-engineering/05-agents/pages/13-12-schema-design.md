## Tool-schema design: the model reads your schema

- The model's only knowledge of your tool is its schema. **Schema design is the highest-leverage, most-neglected part of building agents.** A brilliant function with a poor schema is a tool the model misuses; a mediocre function with a crisp schema just works.
- Treat the schema as a **prompt aimed at the model**, because that is exactly what it is. Every field is read at decision time to answer two questions: *should I call this now?* and *with what arguments?*

<svg viewBox="0 0 360 92" role="img" aria-label="A schema answers should-I-call-this and with-what-arguments for the model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="28" width="120" height="40" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="70" y="44" text-anchor="middle" font-size="7">your schema</text><text x="70" y="57" text-anchor="middle" font-size="6" fill="#6b6b6b">name·desc·params</text>
  <rect x="230" y="14" width="122" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="291" y="30" text-anchor="middle" font-size="6.5">should I call it now?</text>
  <rect x="230" y="52" width="122" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="291" y="68" text-anchor="middle" font-size="6.5">with what arguments?</text>
  <path d="M130 42 L228 28" stroke="#888" marker-end="url(#sd)"/><path d="M130 54 L228 64" stroke="#888" marker-end="url(#sd)"/>
  <defs><marker id="sd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The failures a bad schema causes are specific and diagnosable:
  - **Not called when it should be** → the description does not match how the user phrases the need.
  - **Called at the wrong time** → the description overclaims or is vague about scope.
  - **Wrong arguments** → parameter names/types/enums are ambiguous or under-described.
  - **Confused with another tool** → two tools overlap and the model cannot tell them apart.
- The next pages fix each, in order: descriptions, parameters, tool count, and a worked before/after.

:::note
The discipline: after writing a tool, read *only its schema* and ask, "if this sentence were all I knew, would I call it correctly?" If you cannot, the model cannot. Most tool bugs are fixed in the schema, not the code — and a schema edit ships in seconds where a model change takes weeks.
:::
