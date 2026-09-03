## Prompt Versioning

Treating prompts as versioned artifacts with history, diffs and rollback, rather
than strings edited in a database or buried in a handler.

Quality dropped last Tuesday. Without version history nobody can say what
changed. With it, the diff is one line someone edited while fixing something
else.

### How it works

A prompt determines output as directly as code does, and is routinely treated
with far less care — edited live, stored as a string in a config table, changed
by whoever happened to be debugging.

The consequence appears the first time quality drops. "It got worse sometime
last week" is an unanswerable statement without a record of what the prompt was
and when it changed.

Versioning means every change carries a diff, a timestamp, an author, and
ideally the evaluation delta it produced. You can see what changed, compare, and
revert.

**The simplest implementation that works is keeping prompts in the repository as
files.** They then inherit git history, review and rollback for free, and no new
system exists to be maintained. Reach for a database-backed registry only when
you specifically need to change prompts without deploying.

### In practice

**Version the prompt together with the model and the retrieval settings**, not
separately.

A prompt tuned for one model version can perform noticeably worse on another, so
"prompt v14" alone does not describe a reproducible system. What you want to be
able to restore is the whole configuration in one step — which is also what you
want to be able to point at when someone asks what changed.
