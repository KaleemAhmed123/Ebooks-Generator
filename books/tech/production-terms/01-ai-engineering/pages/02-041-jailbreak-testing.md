## Jailbreak Testing

Running a maintained corpus of known bypass techniques on every model or prompt
change, because a model update can silently reopen a closed hole.

A prompt refactor that improved answer quality also re-enabled two previously
blocked bypasses. The automated suite caught it before release.

### How it works

Bypass techniques are public, catalogued and continuously evolving: roleplay
framing, hypothetical scenarios, encoding the request, instruction override,
incremental escalation across several turns.

Keeping a corpus of them and running it automatically on every model or prompt
change is straightforward, and it catches a specific problem manual review does
not.

**That problem is silent reopening.** A prompt refactor that improves answer
quality can re-enable a bypass closed months ago, because nothing about the
refactor looked security-relevant to the person making it. A provider model
update can do the same with no change on your side at all.

Tracking bypass rate over time turns this from something you rediscover into a
number you watch.

### In practice

**Keep the corpus current.** Techniques that work today did not exist a year
ago, and a static corpus slowly stops testing anything real while continuing to
report a comfortable pass rate.

**Test the whole system, not the model alone.** A bypass that gets the model to
produce something disallowed is far less serious if the output classifier
catches it before anyone sees it. Recording *which layer held* is what tells you
where the next hour of work should go — and a suite that only reports pass or
fail cannot tell you that.
