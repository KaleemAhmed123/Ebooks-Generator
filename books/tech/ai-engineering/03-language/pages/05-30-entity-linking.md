## Entity linking

- NER (page 05-18) finds that *"Apple"* is an organization. **Entity linking** goes one step further: it connects that mention to a **specific entry** in a knowledge base — Apple Inc., not the fruit, not Apple Records.
- Two sub-steps:
  - **Candidate generation** — pull all knowledge-base entries a mention *could* refer to (`Apple` → Apple Inc., Apple Records, apple the fruit…).
  - **Disambiguation** — pick the right one using context (nearby words like *iPhone*, *Cupertino*, *stock*).

<svg viewBox="0 0 360 74" role="img" aria-label="The mention Apple maps to several candidates, and context selects Apple Inc." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="12" y="28" width="70" height="20" rx="3" fill="#24405e"/><text x="47" y="42" text-anchor="middle" fill="#fff">"Apple"</text>
  <path d="M84 34 L120 18" stroke="#1a1a1a" marker-end="url(#el)"/><path d="M84 38 L120 38" stroke="#1a1a1a" marker-end="url(#el)"/><path d="M84 42 L120 60" stroke="#1a1a1a" marker-end="url(#el)"/>
  <rect x="124" y="10" width="96" height="16" rx="3" fill="#1a3a2a"/><text x="172" y="22" text-anchor="middle" fill="#fff">Apple Inc. ✓</text>
  <rect x="124" y="30" width="96" height="16" rx="3" fill="#eee"/><text x="172" y="42" text-anchor="middle">Apple Records</text>
  <rect x="124" y="50" width="96" height="16" rx="3" fill="#eee"/><text x="172" y="62" text-anchor="middle">apple (fruit)</text>
  <text x="290" y="20" font-size="7" fill="#6b6b6b">context:</text><text x="290" y="31" font-size="7" fill="#6b6b6b">"iPhone",</text><text x="290" y="42" font-size="7" fill="#6b6b6b">"Cupertino"</text>
  <defs><marker id="el" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::note
Entity linking is what turns loose text into **grounded, queryable facts**. "Apple hired someone" is a string; "Apple Inc. (Q312) hired someone" is a fact you can join against everything else you know about that entity. It is the bridge from NER to the knowledge graphs on the next page, and a key defense against an LLM confusing two same-named things.
:::
