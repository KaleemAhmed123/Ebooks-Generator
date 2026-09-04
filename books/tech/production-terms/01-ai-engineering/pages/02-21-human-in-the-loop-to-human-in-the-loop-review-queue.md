## Human in the Loop

*HITL*

An approval gate in front of an agent's consequential actions. The line worth
drawing is reversibility: reading, searching and drafting run freely; sending,
paying, deleting and publishing wait for a person to say yes.

The interface decides whether the gate is real. "The agent wants to continue"
gives the reviewer nothing to judge and earns a reflex click by the second day.
Naming the concrete action — this recipient, this amount, this record — is what
separates review from ceremony.

**A gate people rubber-stamp is worse than no gate.** It manufactures the
appearance of oversight while providing none, and prompting on trivial actions is
how you build one. Keep the number of decisions small enough that each still gets
read: scope them to what is irreversible, and batch the rest.

## Human-in-the-Loop Review Queue

The routing rule that sends low-confidence or validation-failing extractions to a
person and lets the rest through untouched. Its value is arithmetic: when most
items clear automatically, human attention is spent on the remainder rather than
on everything.

<svg viewBox="0 0 460 88" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Extractions above the confidence threshold pass straight through, those below route to a reviewer, and the reviewer's corrections return as labelled training data">
  <rect x="4" y="32" width="82" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="45" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">extraction</text>
  <path d="M86 44 H112" stroke="#1a1a1a" stroke-width="1.2"/><path d="M112 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="114" y="32" width="84" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="156" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">confidence?</text>
  <path d="M198 38 L226 18" stroke="#1a1a1a" stroke-width="1.2"/><path d="M228 17 l-8 1 4 5 z" fill="#1a1a1a"/>
  <rect x="232" y="6" width="106" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="285" y="20" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">passes through</text>
  <path d="M198 50 L226 70" stroke="#c25a35" stroke-width="1.2"/><path d="M228 71 l-4 -7 -4 5 z" fill="#c25a35"/>
  <rect x="232" y="58" width="106" height="22" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="285" y="72" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">reviewer</text>
  <path d="M338 69 H400" stroke="#c25a35" stroke-width="1.2"/><path d="M400 69 l-7 -4 v8 z" fill="#c25a35"/>
  <text x="342" y="64" font-family="Georgia,serif" font-size="8.5" fill="#c25a35">labelled data</text>
  <text x="4" y="76" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the split</text>
  <text x="4" y="86" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">is the economics</text>
</svg>

Throughput is decided by what the reviewer sees, not by the model. A form of
extracted values makes them read the whole document to verify it; the same values
highlighted in place on the page image let them confirm at a glance.

**Watch the review rate, not the accuracy.** A rate that never falls means the
corrections feed nothing, and what you built is a permanent manual process wearing
an automation label.
