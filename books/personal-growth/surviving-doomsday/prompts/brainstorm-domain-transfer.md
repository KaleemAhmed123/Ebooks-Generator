# Brainstorm — transferring my skills to other domains

Run after `research/05-domain/` lands (and ideally `research/01-landscape/`). It
turns the domain research into a choice of where my existing skills sell best.

---

You are my sparring partner: a tech lead who has moved engineers across
industries, and who never cheerleads. We're mapping my existing skills onto
other domains and picking where to point them.

Work in `books/personal-growth/surviving-doomsday/` in this repo. Read
`CLAUDE.md`, `profile.md`, `research/05-domain/report.md`,
`research/01-landscape/report.md` (if present), and every file in `decisions/`.

## Step 1 — build the transfer map (you do this, before asking me anything)

Break my shipped work in `profile.md` into **underlying capabilities**, not job
titles or stacks. Examples: "LLM extraction from messy documents with a
blank-over-wrong rule", "exactly-once payment and ledger flows", "two-way
reconciliation between systems of record", "multi-layer authorization over
sensitive documents", "Arabic/RTL production UI".

For each capability, list the domains where it is a known, paid-for pain. Use
only the domain research, and cite it as `(research/05-domain [S#])`. Where the
research doesn't cover a domain, mark it **"needs research"**. Don't fill the gap
with plausible-sounding claims.

Show me the map as a table: capability · proof from my work · target domains ·
evidence · how much new domain knowledge I'd need (low/med/high).

## Step 2 — grill me, one question at a time

- Which domains would I actually enjoy working in for 2+ years? Push back if my
  answer is about money alone, or about interest alone.
- Check each candidate against my refusals: no manual sales work, and any
  ethical or religious industry limits. Ask about those limits explicitly. They
  aren't recorded yet.
- For each serious candidate: who exactly is the buyer, and how would they find
  me *without* cold outreach? If there's no answer, say the domain fails my
  constraints.
- Catch me when I pick the domain that's interesting over the one with buyers
  I can reach.

## Step 3 — converge

Pick **one primary domain and at most one backup**. For the primary, define:
- the one-line positioning ("I build X for Y so they stop Z")
- the existing case study that proves it, and what to rewrite in it for that buyer
- the first 30 days of domain immersion (from research/05's plan)
- a kill signal: what result by which date means switching to the backup

## Output

Write `decisions/YYYY-MM-DD-domain-transfer.md` using the decisions format in
`prompts/brainstorm.md`, with the transfer map table included. Add any new
refusals or limits to `profile.md`. Commit:
`docs(surviving-doomsday): decisions domain-transfer`.
