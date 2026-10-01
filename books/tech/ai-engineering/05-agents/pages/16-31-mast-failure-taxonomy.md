## The multi-agent failure taxonomy (MAST)

- Multi-agent systems fail in ways single agents cannot — failures *of coordination*, not just of individual agents. Research cataloging real multi-agent failures (the **MAST** taxonomy, 2025) found that most failures are *specification and coordination* problems, not model incapability. Knowing the taxonomy is how you design against it. **[VERIFY]**

<svg viewBox="0 0 360 92" role="img" aria-label="Three failure categories: specification, inter-agent misalignment, and verification gaps" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="60" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="64" y="30" text-anchor="middle" font-size="6.5">specification</text><text x="64" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">unclear roles/tasks</text><text x="64" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">bad decomposition</text><text x="64" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">step out of order</text>
  <rect x="126" y="16" width="108" height="60" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="180" y="30" text-anchor="middle" font-size="6.5">coordination</text><text x="180" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">agents disagree</text><text x="180" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">talk past each other</text><text x="180" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">info not shared</text>
  <rect x="242" y="16" width="108" height="60" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="296" y="30" text-anchor="middle" font-size="6.5">verification</text><text x="296" y="44" text-anchor="middle" font-size="5.5" fill="#6b6b6b">no one checks</text><text x="296" y="54" text-anchor="middle" font-size="5.5" fill="#6b6b6b">premature stop</text><text x="296" y="66" text-anchor="middle" font-size="5.5" fill="#6b6b6b">errors propagate</text>
</svg>

- **Three broad categories** (from the research):
  - **Specification failures** — the *setup* is wrong: roles are unclear or overlapping (16-10), the task is decomposed badly, an agent does steps out of order, or the system does not follow the intended flow. The most common category — the design, not the models, is at fault.
  - **Inter-agent misalignment** — the *coordination* breaks: agents disagree without resolving it, talk past each other (16-04), fail to share information one needed, or an agent ignores another's input. The agents are individually fine but do not *work together*.
  - **Verification failures** — the *checking* is absent: no agent verifies the result, the system stops prematurely (thinks it is done when it is not), or an early error propagates unchecked through the pipeline (error compounding across agents, 14-125).
- **The headline finding:** most multi-agent failures are *not* "the model was too weak" — they are *engineering* failures of specification, coordination, and verification. This is empowering: it means better *design* (clear roles, structured communication, verification steps) fixes most failures, not a better model.

:::interview
"Why do multi-agent systems fail, according to the research?"

Mostly from coordination and specification, not model weakness. The MAST taxonomy groups failures into three: specification (unclear or overlapping roles, bad task decomposition, wrong flow — the most common), inter-agent misalignment (agents disagree unresolved, talk past each other, fail to share needed info), and verification (no agent checks the result, the system stops prematurely, or an early error propagates unchecked). The key takeaway is that most multi-agent failures are *engineering* problems fixable by better design — sharp non-overlapping roles, structured communication, and explicit verification steps — rather than by a stronger model.
:::
