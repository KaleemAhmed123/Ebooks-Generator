## Human in the Loop

Requiring approval before consequential actions. The difference between a useful
agent and an incident report.

Read-only tools run freely. Anything that sends an email, moves money or deletes
data requires explicit confirmation showing the exact action.

### How it works

The design question for an agent is not how autonomous it can be. It is which
actions require a human to say yes.

**The useful line is reversibility.** Reading, searching and drafting are all
reversible and fine to run automatically. Sending, paying, deleting and
publishing cannot be undone, and each should require confirmation.

The approval interface matters as much as the policy. "The agent wants to
continue" gives the reviewer nothing to evaluate, and people click through it
within a day. Showing the concrete action — this recipient, this amount, this
record — is what makes the review real rather than ceremonial.

**An approval step people rubber-stamp is worse than none**, because it
manufactures the appearance of oversight while providing none of it.

### In practice

Approval fatigue is the failure mode to design against. If every trivial action
prompts, people stop reading the prompts, and the ones that mattered get the
same reflex click as the rest.

Three things keep the number of decisions small enough that they get real
attention: scope approvals to what is genuinely consequential, allow standing
approvals for low-risk repeated actions, and batch related actions into a single
review rather than a sequence of them.

The goal is a small number of decisions someone actually thinks about.
