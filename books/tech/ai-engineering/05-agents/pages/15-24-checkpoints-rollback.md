## Checkpoints and rollback

- Even with gates, an autonomous agent will sometimes take a wrong turn. **Checkpoints** and **rollback** let you *undo* — return the system to a known-good state — so a mistake is recoverable rather than permanent. It is the safety net beneath propose-then-commit.

<svg viewBox="0 0 360 78" role="img" aria-label="Checkpoints along a run let you roll back to the last good state after a bad action" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="20" y1="34" x2="320" y2="34" stroke="#888"/>
  <g fill="#1a3a2a"><circle cx="50" cy="34" r="5"/><circle cx="130" cy="34" r="5"/><circle cx="210" cy="34" r="5"/></g><circle cx="290" cy="34" r="5" fill="#a03050"/>
  <text x="50" y="24" text-anchor="middle" font-size="5.5">✓</text><text x="130" y="24" text-anchor="middle" font-size="5.5">✓</text><text x="210" y="24" text-anchor="middle" font-size="5.5">✓ good</text><text x="290" y="24" text-anchor="middle" font-size="5.5" fill="#a03050">✗ bad</text>
  <path d="M290 42 Q250 64 210 44" stroke="#a03050" fill="none" marker-end="url(#rb)"/><text x="250" y="70" text-anchor="middle" font-size="5.5" fill="#a03050">roll back to last good</text>
  <defs><marker id="rb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Checkpoint the *world*, not just the agent.** The agent's own state checkpointing (14-50) lets *it* resume; rollback safety also needs the *system's* state to be restorable — a git commit before edits, a database snapshot/transaction, a backup before a migration. Then a bad action can be reverted to the pre-action state.
- **Design for reversibility upfront.** The best time to enable rollback is *before* the risky action: work in a branch (not main), a transaction (not autocommit), a copy (not the original), a staging environment (not production). This is the isolation of scope contracts (14-134) turned toward recovery — the agent operates on something you can throw away.
- **Rollback vs prevention:** gates (15-23) try to *prevent* bad actions; rollback *recovers* from the ones that slip through. You need both, because neither is perfect — a gate can approve a subtly-wrong change, and rollback limits how much damage that does.
- **The hard limit: some actions cannot be rolled back.** A sent email, a real-world physical action, an external payment — no snapshot restores those. For genuinely irreversible actions, prevention (human gate, 15-14) is the *only* protection; rollback does not exist. Knowing which actions are irreversible is a core part of the design.

:::note
Reversibility is the quiet organizing principle of autonomous-agent safety, appearing everywhere: permission modes gate by it (15-14), propose-then-commit stages it (15-23), rollback recovers it, and idempotency protects it under resume (15-18). The design discipline is to **make as much of the agent's work reversible as possible** — branches, transactions, drafts, copies, sandboxes — so that mistakes are cheap to undo, and to reserve the heavy human gates for the small set of actions that are genuinely irreversible.
:::
