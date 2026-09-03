## Model Deprecation Migration

Providers retire models on their schedule, not yours. Migration needs a
rehearsed process, because the deadline is not negotiable.

A deprecation notice gave three months. Teams with pinned versions, an eval
harness and a gateway migrated in a day. Teams without spent the quarter.

### How it works

You get notice — typically a few months — and then the model stops working
whether or not you are ready. Nothing about that is negotiable, and the
difference between teams is entirely in what already existed.

A prepared team runs the evaluation set against the replacement, sees exactly
which cases regressed, fixes those prompts, shadows briefly and cuts over. Days.

An unprepared team has no way to know whether the replacement is worse, no way
to find which prompts break, and model identifiers scattered across six
services. They spend the whole notice period on it, and frequently ship a
quality regression anyway — because nobody could measure the difference to catch
it.

**The deadline is identical for both. The preparation is not.**

### In practice

Treat it as routine dependency maintenance and do it early rather than at the
deadline.

Migrating with weeks of margin means a problem is an inconvenience. Migrating in
the final week means a problem is an incident, on a date somebody else chose.
The work is the same either way; only the risk profile differs, and that is
entirely within your control.
