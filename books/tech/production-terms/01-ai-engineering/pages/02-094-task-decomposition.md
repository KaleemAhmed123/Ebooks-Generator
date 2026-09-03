## Task Decomposition

Splitting a complex request into smaller model calls that can each be validated,
rather than one prompt asked to do everything at once.

One prompt doing extraction, validation and summarisation scored 68%. Three
chained calls, each individually checkable, scored 89% — and could be debugged.

### How it works

A single prompt asked to extract, validate, summarise and format has four ways
to fail and gives you one output to inspect. When it is wrong, you cannot tell
which part broke.

Decomposition splits it into separate calls with defined interfaces between
them. Extract. Validate the extraction. Summarise the validated data.

Two things improve:

**Accuracy**, because each call has a narrower job and the intermediate results
can be checked before anything proceeds on top of them.

**Debuggability**, because a failure is localised to one step with visible
inputs and outputs, rather than being somewhere inside a single opaque call.

The cost is more calls, more latency, and orchestration you have to write. It is
worth it when a single prompt has plateaued below the quality you need, and
unnecessary when it is already meeting the bar.

### In practice

Decomposition also lets you **route each step independently** — a small model
for extraction, a large one for the reasoning step that genuinely needs it.

That frequently recovers the extra cost of multiple calls and then some, while
keeping the accuracy improvement. The chain ends up both better and cheaper than
the single prompt it replaced, which is not the trade most people expect going
in.
