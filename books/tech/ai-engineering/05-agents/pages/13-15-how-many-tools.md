## How many tools?

- More tools is not more capable. Past a point, extra tools *lower* reliability: the model spends attention distinguishing them, confuses similar ones, and picks wrong. The count is a design decision, not an accident of what APIs you have.

<svg viewBox="0 0 360 92" role="img" aria-label="Accuracy rises then falls as tool count grows, peaking at a modest number" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <line x1="30" y1="72" x2="340" y2="72" stroke="#888"/><line x1="30" y1="12" x2="30" y2="72" stroke="#888"/>
  <path d="M34 66 Q120 20 180 26 Q280 34 336 62" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <text x="150" y="20" font-size="6" fill="#1a3a2a">sweet spot</text>
  <text x="185" y="86" text-anchor="middle" font-size="6" fill="#6b6b6b">number of tools →</text>
  <text x="20" y="42" font-size="6" fill="#6b6b6b" transform="rotate(-90 20 42)">accuracy</text>
  <text x="320" y="56" font-size="6" fill="#a03050">too many</text>
</svg>

- **Symptoms of too many tools:** the model calls plausible-but-wrong tools, ignores the right one, or stalls choosing. Dozens of flat, overlapping tools is the classic over-scoped agent.
- **Fixes, in order:**
  - **Cut and merge.** Do you need `get_user_email` *and* `get_user_phone` *and* `get_user_address`, or one `get_user` returning a profile? Fewer, richer tools beat many thin ones.
  - **Namespace** related tools with a shared prefix — `github_create_issue`, `github_list_prs` — so the model groups them and the naming disambiguates.
  - **Scope by task.** Only expose the tools relevant to the current step. An agent with 100 tools can be given the 8 it needs this phase (dynamic tool selection / tool retrieval).
  - **Sub-agents.** Give specialized sub-agents their own small toolsets rather than one agent holding all tools (Module 16).

:::interview
**"Your agent has 40 tools and keeps picking the wrong one. What do you do?"** Reduce and organize. Merge overlapping tools into fewer richer ones, namespace the rest by domain, and — most importantly — only expose the tools relevant to the current task instead of all 40 at once (tool retrieval or task-scoped toolsets). If the domain genuinely needs 40 tools, split the work across sub-agents that each hold a focused subset. Tool overload is a design smell, not a model limitation.
:::
