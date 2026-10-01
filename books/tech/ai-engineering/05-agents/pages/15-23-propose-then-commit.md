## Propose-then-commit

- The pattern that makes autonomy safe for consequential work: the agent **proposes** an action or a complete result, and a separate gate (a human, a check, or both) **commits** it. The agent does the work; something else authorizes the effect. It is level-3 autonomy (15-02) made a design principle.

<svg viewBox="0 0 360 82" role="img" aria-label="The agent proposes a change; a review gate commits or rejects it before it takes effect" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="80" height="26" rx="4" fill="#24405e"/><text x="54" y="46" text-anchor="middle" fill="#fff" font-size="6.5">agent proposes</text>
  <rect x="132" y="26" width="90" height="34" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="177" y="40" text-anchor="middle" font-size="6">staged change</text><text x="177" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">diff / draft / plan</text>
  <rect x="256" y="20" width="94" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="303" y="32" text-anchor="middle" font-size="6">commit → takes effect</text>
  <rect x="256" y="44" width="94" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="303" y="56" text-anchor="middle" font-size="6">reject → discard</text>
  <path d="M94 43 L130 43" stroke="#888" marker-end="url(#pc2)"/><path d="M222 40 L254 30" stroke="#888" marker-end="url(#pc2)"/><path d="M222 44 L254 52" stroke="#888" marker-end="url(#pc2)"/>
  <defs><marker id="pc2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The move: separate *doing the work* from *making it real*.** The agent produces a **staged** artifact that has no effect until committed — a git diff (not a push), a draft email (not sent), a proposed plan (not executed), a database transaction (not committed). A reviewer inspects it and commits or rejects.
- **Why it is the sweet spot:** you get most of autonomy's leverage (the agent does the whole task unattended) while keeping the one control that matters (nothing consequential happens without authorization). It reviews the *result*, not every step — far less human effort than approving each action (L2), far more safety than full autonomy (L5).
- **The commit gate can be automated where trust is earned:** for low-risk, well-verified changes, an automated check commits (tests pass → auto-merge); for high-risk, a human. The same pattern scales from "human reviews every PR" to "auto-merge green PRs, human reviews risky ones."
- This is why coding agents converged on the **pull request** as their interface (15-11): a PR *is* propose-then-commit — the agent proposes a diff, a human (or CI) commits the merge.

:::interview
"What's the safest useful autonomy pattern for consequential agent work?"

Propose-then-commit. The agent does the whole task unattended but produces a *staged* artifact with no effect until authorized — a git diff, a draft, a proposed plan, an uncommitted transaction — and a separate gate (human, automated check, or both) reviews and commits or rejects it. You keep autonomy's leverage (unattended work, reviewed by result not by step) while ensuring nothing consequential happens without authorization. It's why coding agents use pull requests: a PR is exactly propose-then-commit, and you can auto-commit low-risk changes while gating risky ones.
:::
