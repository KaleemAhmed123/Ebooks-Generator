## Evaluating multi-agent systems

- Evaluating a multi-agent system is harder than evaluating one agent (14-116), because you must assess not just *outcomes* but *coordination* — and failures hide in the interaction. The eval must look at the system, not just the parts. **[VERIFY]**

- **What to measure, beyond single-agent evals:**
  - **Outcome** — did the *system* produce the right result (14-117)? The bottom line, but insufficient alone.
  - **Per-agent contribution** — is each agent actually *helping*? An agent that adds cost but not quality should be cut (16-02). Ablate agents (remove one, re-measure) to see who matters.
  - **Coordination quality** — did agents communicate well, avoid conflict, share information, and terminate cleanly (the MAST categories, 16-31)? This is where multi-agent-specific failures live, and it needs trajectory-level analysis (14-117) of the *interactions*, not just the answer.
  - **Cost/latency efficiency** — quality *per dollar and second*, because multi-agent's overhead (16-30) must be justified.
- **The essential comparison — the single-agent baseline.** Always evaluate the multi-agent system against a *strong single agent* on the same task. This is the check that catches the most common multi-agent mistake: a system that is more complex and expensive but *no better* (or worse) than one well-designed agent. If the multi-agent version does not clearly win on quality-per-cost, it is over-engineering (16-42).
- **Observability at the system level** (16-36) — trace the whole multi-agent run (every agent, every message) so you can *see* coordination failures, not just infer them from a bad outcome.

:::interview
"How do you evaluate a multi-agent system?"

Beyond single-agent outcome evals, you assess the *system*: per-agent contribution (ablate each agent — does removing it hurt? if not, cut it), coordination quality (did agents communicate, avoid conflict, share info, and terminate cleanly — the MAST failure categories, found via trajectory analysis of the interactions), and cost/latency efficiency (quality per dollar and second). Critically, you always compare against a *strong single-agent baseline* on the same task — the check that catches the most common failure: a more complex, expensive system that's no better than one good agent. And you trace the whole run at the system level so coordination failures are visible, not just inferred from a bad result.
:::
