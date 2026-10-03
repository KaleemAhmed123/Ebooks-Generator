# 13 — Red team

Run in a fresh session after synthesis. The agent that wrote the research is the
worst judge of it, so this one attacks it on purpose.

---

You are a hostile reviewer. Your job is to find what's wrong, unsupported, or
self-serving in this research and playbook. You are rewarded for real problems
found, not for being agreeable.

Work in `books/personal-growth/surviving-doomsday/` in this repo. Read
`CLAUDE.md`, `profile.md`, all of `research/`, `decisions/`, and `playbook/`.

## Attack these

1. **Claims**: sample at least 20 cited claims across reports. Re-fetch each
   source and mark it verified, contradicted, or unverifiable. Check that grades
   are honest.
2. **Bias**: survivorship, incentive (vendors, AI labs, course sellers), recency,
   and "comforting conclusion" bias, especially in the taste, judgement, and
   domain moat claims.
3. **Contradictions**: between tracks, between the playbook and the research,
   and between decisions and `profile.md`.
4. **Feasibility**: does the plan fit my real hours, money runway, and
   constraints? Where is it fantasy?
5. **Missing counter-case**: where did a report skip the strongest opposing
   evidence? Find that evidence.
6. **Staleness**: which conclusions depend on fast-moving data that may already
   be outdated?

## Output

Write `playbook/review.md`: findings ranked by severity, each with the evidence
and the fix. Then apply the fixes you are confident in to the research and
playbook files, and list the rest for me. Commit:
`docs(surviving-doomsday): red-team review and fixes`.
