## Outcome, trajectory, and component evals

- Agents can be evaluated at three levels, and you need all three because each catches failures the others miss.

<svg viewBox="0 0 360 96" role="img" aria-label="Three eval levels: final outcome, the trajectory of steps, and individual components" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="66" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="64" y="30" text-anchor="middle" font-size="6.5">outcome</text><text x="64" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">was the final</text><text x="64" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">answer right?</text><text x="64" y="68" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"what"</text>
  <rect x="126" y="16" width="108" height="66" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="6.5">trajectory</text><text x="180" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">right steps,</text><text x="180" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">right tools?</text><text x="180" y="68" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"how"</text>
  <rect x="242" y="16" width="108" height="66" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="30" text-anchor="middle" font-size="6.5">component</text><text x="296" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">each step /</text><text x="296" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">tool correct?</text><text x="296" y="68" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"where"</text>
</svg>

- **Outcome eval** — did the agent get the **final answer** right? The bottom line, and the easiest to score when there is a ground truth (the math is correct, the bug is fixed, the field is extracted). But it hides *why* a failure happened.
- **Trajectory eval** — did the agent take the **right path**: call the right tools, in a sensible order, without wasteful detours? An agent can get the right answer by luck through a bad path (fragile) or fail despite a good path (a tool broke). Trajectory catches process problems outcome misses.
- **Component eval** — is each **individual piece** correct: does the retriever fetch the right docs, does the router classify correctly, does one tool return valid data? This localizes failures to a specific step (13-44) so you fix the actual broken part, not the symptom.
- **Use all three:** outcome tells you *if* it works, trajectory tells you *how well* it works, component tells you *where* it breaks. Optimizing only outcome yields agents that are right by accident and fragile under change.

:::interview
"How do you evaluate an agent beyond just checking the final answer?"

At three levels. Outcome — was the final result correct (the bottom line, but it hides why). Trajectory — did it take a sensible path, calling the right tools in the right order (catches agents that are right by luck or fail from a process error). Component — is each step correct in isolation: retriever, router, individual tools (localizes the failure so you fix the real cause). You need all three: outcome for *if*, trajectory for *how well*, component for *where*. Outcome-only evals reward fragile agents that happen to land the right answer.
:::
