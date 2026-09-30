# Tools & Protocols

## Why agents need tools

- A language model is a closed box. It maps text to text and nothing else. It cannot read a file, call an API, run code, query a database, or even check today's date. Everything it "knows" froze the day its training data was cut.
- Three hard limits follow, and tools lift all three:

<svg viewBox="0 0 360 106" role="img" aria-label="Tools give the model current information, actions on the world, and reliable computation" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="120" y="8" width="120" height="26" rx="4" fill="#24405e"/><text x="180" y="25" text-anchor="middle" fill="#fff" font-size="8">the closed box (LLM)</text>
  <rect x="10" y="60" width="104" height="38" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="62" y="75" text-anchor="middle" font-size="6.5">stale knowledge</text><text x="62" y="90" text-anchor="middle" font-size="6" fill="#1a3a2a">→ search, fetch, DB</text>
  <rect x="128" y="60" width="104" height="38" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="75" text-anchor="middle" font-size="6.5">cannot act</text><text x="180" y="90" text-anchor="middle" font-size="6" fill="#1a3a2a">→ send, write, deploy</text>
  <rect x="246" y="60" width="104" height="38" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="298" y="75" text-anchor="middle" font-size="6.5">bad at exact calc</text><text x="298" y="90" text-anchor="middle" font-size="6" fill="#1a3a2a">→ run code, calculator</text>
  <path d="M150 34 L62 58" stroke="#888" marker-end="url(#wt)"/><path d="M180 34 L180 58" stroke="#888" marker-end="url(#wt)"/><path d="M210 34 L298 58" stroke="#888" marker-end="url(#wt)"/>
  <defs><marker id="wt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- A **tool** is a function the model is allowed to call. You describe the function; the model, mid-generation, emits a request to run it with arguments; your code runs it and feeds the result back. The box can now touch the world.
- **This is the line between a chatbot and an agent.** A chatbot answers from what it knows. An agent *does things* — and doing things means calling tools in a loop (Module 14). Tools are the hands; the rest of this booklet is about using them well and safely.

:::note
Tools do not make the model smarter; they make it *capable*. A model with a calculator still reasons the same way — it just stops guessing at arithmetic and asks the calculator. The engineering skill is deciding what to expose as a tool, describing it so the model uses it correctly, and handling the times it uses it wrong.
:::
