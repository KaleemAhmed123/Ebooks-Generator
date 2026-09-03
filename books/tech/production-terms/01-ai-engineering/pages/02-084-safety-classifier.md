## Safety Classifier

A separate model or ruleset screening inputs and outputs, independent of the
main model's instructions.

An output classifier caught a response containing personal data that the system
prompt had explicitly forbidden. The instruction failed; the independent check
did not.

### How it works

A safety classifier inspects input before it reaches the main model, or output
before it reaches the user, as separate code.

**The reason it must be separate is the reason guardrails exist at all.**
Instructions inside a prompt are requests the model weighs against everything
else in its context — including anything an attacker managed to put there. A
rule that can be argued with is not a control.

A classifier runs as code. It does not matter what the main model was persuaded
to produce; the check happens afterwards, independently, and its verdict is not
negotiable by anything in the context.

| | Catches |
|---|---|
| Input classifier | injection attempts, out-of-scope requests, disallowed topics |
| Output classifier | leaked personal data, policy violations, content that should not ship |

### In practice

**Measure the classifier's own error rates in both directions.**

A filter blocking every violation while also blocking a third of legitimate
requests has broken the product — and the safety dashboard will look excellent,
because it counts catches and not the legitimate traffic it destroyed.

False positive rate deserves the same attention as recall, and in most systems
gets none at all.
