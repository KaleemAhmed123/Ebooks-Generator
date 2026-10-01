## Agent vs workflow vs chatbot

- Three things get called "AI apps" and behave very differently. Placing your system correctly decides how you build, test, and budget it.

<svg viewBox="0 0 360 104" role="img" aria-label="Chatbot answers once, workflow follows fixed steps, agent decides its own path" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="16" width="108" height="80" rx="4" fill="#f0f0f5" stroke="#888"/><text x="62" y="30" text-anchor="middle" font-size="7">chatbot</text><text x="62" y="48" text-anchor="middle" font-size="6">in → out</text><text x="62" y="62" text-anchor="middle" font-size="6">no tools, no loop</text><text x="62" y="82" text-anchor="middle" font-size="5.5" fill="#6b6b6b">answers from knowledge</text>
  <rect x="126" y="16" width="108" height="80" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="7">workflow</text><text x="180" y="48" text-anchor="middle" font-size="6">fixed steps you</text><text x="180" y="60" text-anchor="middle" font-size="6">coded, LLM in slots</text><text x="180" y="82" text-anchor="middle" font-size="5.5" fill="#6b6b6b">predictable path</text>
  <rect x="244" y="16" width="108" height="80" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="298" y="30" text-anchor="middle" font-size="7">agent</text><text x="298" y="48" text-anchor="middle" font-size="6">model decides the</text><text x="298" y="60" text-anchor="middle" font-size="6">path, loops on tools</text><text x="298" y="82" text-anchor="middle" font-size="5.5" fill="#6b6b6b">dynamic path</text>
</svg>

| | Chatbot | Workflow | Agent |
|---|---|---|---|
| Control flow | none | you code it | model decides |
| Tools | no | maybe, in fixed spots | yes, model-chosen |
| Loop | no | no (linear) | yes |
| Predictable | fully | mostly | least |
| Cost/latency | lowest | middle | highest (many calls) |
| Right for | Q&A | known multi-step tasks | open-ended tasks |

- **The spectrum is control vs flexibility.** Left = you control everything, cheap and predictable, but rigid. Right = the model controls, flexible enough for open-ended goals, but pricier and harder to make reliable.
- **Pick the leftmost that works.** If the steps are known, a workflow beats an agent — it is cheaper, faster, and testable. Use a true agent only when the path genuinely cannot be predetermined (the task branches on what it discovers).

:::interview
"When would you NOT build an agent?"

Whenever the task has a knowable sequence of steps. If you can draw the flowchart, code it as a workflow with the LLM filling specific slots — you get predictability, lower cost, and easy testing. Reserve agents for open-ended tasks where the next step genuinely depends on runtime discoveries (research, debugging, multi-step tool use with unknown branching). "Use the least autonomy that solves the problem" is the senior answer.
:::
