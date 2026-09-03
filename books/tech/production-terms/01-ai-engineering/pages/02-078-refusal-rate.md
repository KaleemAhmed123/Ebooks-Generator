## Refusal Rate

How often the system declines. Both directions are failures — over-refusal makes
a product unusable, under-refusal makes it unsafe.

A support assistant refused 14% of legitimate billing questions because the
safety prompt was written too broadly. The fix was narrowing the policy, not
removing it.

### How it works

Refusals are the policy counterpart of abstention: cases where the system
declines on rules rather than for lack of information.

**Both directions are failures, and teams typically measure only one.**

Under-refusal is the direction everyone watches, because a policy violation
reaching a user is visible and embarrassing and someone will screenshot it.

Over-refusal is invisible on a safety dashboard and frequently more damaging.
An assistant that refuses a normal billing question does not generate an
incident report. It generates users who stop trusting the tool and start routing
around it, and that erosion is quiet, gradual and hard to reverse once it has
happened.

The fix for over-refusal is almost always **narrowing the policy rather than
removing it** — which requires knowing which requests were refused, and why.

### In practice

Log every refusal with the triggering request and the reason, and read a sample
weekly.

Patterns emerge fast: a keyword that is innocuous in your domain, a topic scoped
too broadly, a phrasing that trips a classifier. Each is a small fix, and each
one recovers legitimate use you were silently losing without any signal that it
was happening.
