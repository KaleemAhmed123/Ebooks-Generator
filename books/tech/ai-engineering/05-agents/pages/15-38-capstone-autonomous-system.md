## Capstone: designing an autonomous system

- Design one autonomous system end to end, choosing an autonomy level and building the matching safety stack. Task: an agent that **triages and fixes low-risk production bugs autonomously overnight**, delivering PRs for review each morning.

<svg viewBox="0 0 360 116" role="img" aria-label="An overnight bug-fix agent with scoped tools, verification, cost governor, kill switch, and PR gate" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="120" y="10" width="120" height="18" rx="4" fill="#24405e"/><text x="180" y="22" text-anchor="middle" fill="#fff">L4: unattended, PR-gated</text>
  <rect x="14" y="40" width="80" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="54" y="52" text-anchor="middle">sandbox + branch</text>
  <rect x="100" y="40" width="80" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="140" y="52" text-anchor="middle">scoped tools</text>
  <rect x="186" y="40" width="80" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="226" y="52" text-anchor="middle">tests = verifier</text>
  <rect x="272" y="40" width="76" height="18" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="310" y="52" text-anchor="middle">durable/resume</text>
  <rect x="40" y="66" width="90" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="85" y="78" text-anchor="middle">cost governor</text>
  <rect x="136" y="66" width="90" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="181" y="78" text-anchor="middle">kill switch</text>
  <rect x="232" y="66" width="90" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="277" y="78" text-anchor="middle">monitoring/traces</text>
  <rect x="110" y="92" width="140" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="104" text-anchor="middle">morning: human reviews PRs (commit gate)</text>
</svg>

- **Autonomy level (15-02):** L4 — runs unattended overnight, but every fix is *proposed* as a PR, not merged (propose-then-commit, 15-23). High leverage, final human gate.
- **Scope + sandbox (14-134, 15-25):** operates only on a whitelisted set of low-risk services, in a git branch, in a sandbox with no production credentials or network — the blast radius is a throwaway branch.
- **Verifier (14-135):** the existing test suite. A fix only counts if tests pass; no verifier, no PR. This is what makes autonomous coding trustworthy (15-11).
- **Durability (15-17):** each bug is a durable workflow; an overnight crash resumes, and idempotency (15-18) prevents duplicate PRs.
- **Cost governor (15-20):** a per-night token/dollar budget; a stuck bug that burns budget is dropped and flagged, not run forever.
- **Kill switch + monitoring (15-21, 14-113):** an external off switch, and traces of every run for the morning review and for evals (14-116).
- **The commit gate (15-23):** each morning a human reviews the proposed PRs and merges the good ones — the one consequential, irreversible action (merging to prod) stays with a person.

:::note
This capstone is the module's thesis in one system: **autonomy is unlocked by a verifier and made safe by a layered stack matched to its level.** The agent does real, valuable, unsupervised work — fixing bugs overnight — precisely because tests give it a ground-truth verifier and because scope, sandbox, cost governor, kill switch, and a final human gate contain every way it could go wrong. Remove the verifier and it cannot be trusted; remove the safety stack and it cannot be deployed. Build both, and you have autonomy that is an asset, not a liability — which is the whole craft of autonomous systems.
:::
