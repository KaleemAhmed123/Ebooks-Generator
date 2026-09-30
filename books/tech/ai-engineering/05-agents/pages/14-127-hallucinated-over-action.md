## Hallucinated actions and over-action

- Two *action* failures — the agent does something it should not, either because it invented the action or because it acted when it should have stopped.

- **Hallucinated actions.** The agent calls a tool that does not exist, passes arguments it made up, or claims it did something it did not. It might "call" `refund_order` with an invented order id, or report "I've sent the email" when no email tool ran. Cause: the model confabulates, as models do — now with a tool interface to act on the confabulation. Fixes: **validate every tool call** against the real schema and reject unknown tools/args (13-10); make tools return **explicit confirmations** the agent must see ("email queued, id 4471"); never let the agent *claim* an action succeeded without a tool result proving it.

<svg viewBox="0 0 360 72" role="img" aria-label="A hallucinated tool call is caught by schema validation before it can execute" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="24" width="90" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="55" y="36" text-anchor="middle">refund(id="???")</text><text x="55" y="45" text-anchor="middle" font-size="5.5" fill="#a03050">made-up</text>
  <rect x="130" y="22" width="80" height="28" rx="4" fill="#24405e"/><text x="170" y="39" text-anchor="middle" fill="#fff">validate</text>
  <rect x="240" y="24" width="110" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="295" y="39" text-anchor="middle">reject → error to model</text>
  <path d="M100 36 L128 36" stroke="#888" marker-end="url(#ha)"/><path d="M210 36 L238 36" stroke="#888" marker-end="url(#ha)"/>
  <defs><marker id="ha" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Over-action.** The agent does *more* than asked — deletes extra files, emails the whole team when told to draft one message, "helpfully" takes irreversible steps beyond its mandate. Cause: an eager model interpreting a goal too broadly, with tools powerful enough to act on the over-reach. Fixes: **scope tools tightly** (least privilege, 13-15), **human approval** on consequential/irreversible actions (14-52), and clear instructions on *boundaries* ("draft only, do not send").
- Both failures share a root: an agent's **actions are as unreliable as its reasoning**, but with real consequences. The defenses are the same discipline — validate, confirm, scope, gate.

:::warn
The most dangerous agent bug is a *confident wrong action* on something irreversible — a deletion, a payment, an email to a customer. Reasoning errors you can catch in review; an executed irreversible action you cannot take back. This is why the propose-then-commit pattern (Module 15), tight tool scopes, and human gates on consequential actions are not optional polish — they are the line between an agent that is useful and one that is a liability. Give an agent only the power it needs, and gate the power that can hurt.
:::
