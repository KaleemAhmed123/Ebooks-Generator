# Agent Engineering

## What an agent is

- An **agent** is a language model in a **loop with tools**, choosing its own next step toward a goal. That is the whole definition. Everything else — memory, planning, multi-agent — is elaboration on those three words: *loop*, *tools*, *goal*.

<svg viewBox="0 0 360 112" role="img" aria-label="An agent loops: the model thinks, calls a tool, observes the result, and repeats until done" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <circle cx="180" cy="40" r="22" fill="#24405e"/><text x="180" y="37" text-anchor="middle" fill="#fff" font-size="7">model</text><text x="180" y="47" text-anchor="middle" fill="#cdd" font-size="6">(decides)</text>
  <rect x="70" y="82" width="80" height="22" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="110" y="96" text-anchor="middle" font-size="6.5">act (tool)</text>
  <rect x="210" y="82" width="80" height="22" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="250" y="96" text-anchor="middle" font-size="6.5">observe result</text>
  <path d="M160 56 L120 80" stroke="#888" marker-end="url(#al1)"/><path d="M150 93 L208 93" stroke="#888" marker-end="url(#al1)"/><path d="M250 82 Q235 56 200 50" stroke="#888" fill="none" marker-end="url(#al1)"/>
  <text x="300" y="40" font-size="6.5" fill="#1a3a2a">…until goal met</text>
  <defs><marker id="al1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- The leap from Modules 12–13: there you gave the model *eyes* (perception) and *hands* (tools). Here you give it **agency** — the ability to decide *which* hand to use *when*, in sequence, without you scripting each step. The model, not your code, drives the control flow.
- **Why this is different from ordinary software.** Normal code has a fixed path you wrote. An agent's path is *decided at runtime by the model* — it might call three tools or ten, in an order you did not predetermine, adapting to what it observes. That flexibility is the power and the danger of agents: they handle open-ended tasks, and they can also loop, wander, or act wrongly in ways fixed code cannot.

:::note
Hold this distinction for the whole module: a **workflow** follows a path *you* coded (predictable, testable, cheap); an **agent** follows a path the *model* decides (flexible, powerful, harder to control). Most "agent" products should be mostly workflow with agency only where the task truly needs it (the Anthropic patterns, later). Reaching for a fully autonomous agent when a workflow would do is the most common — and most expensive — beginner mistake.
:::
