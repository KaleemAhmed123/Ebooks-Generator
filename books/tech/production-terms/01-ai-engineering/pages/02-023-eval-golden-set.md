## Eval / Golden Set

A fixed set of inputs with known-good outputs, run on every prompt or model
change. Without one you are shipping on vibes.

A prompt tweak that looked better on three examples dropped accuracy from 91% to
84% across the two-hundred-case set. That was only knowable because it was
measured.

### How it works

A golden set is a fixed collection of inputs paired with known-good outputs,
plus a way to score how close an answer came.

Its purpose is to turn opinion into measurement. Without one, "does this prompt
change help?" is settled by whoever tried three examples and liked what they
saw. With one it is a number, and two options can be compared honestly.

**Building it well matters far more than building it large.** It should be drawn
from real traffic rather than invented at a desk, and it must contain the hard
cases: the ambiguous inputs, the malformed documents, the questions your corpus
genuinely cannot answer.

A set of easy cases scores high and tells you nothing. A hundred well-chosen
cases beat a thousand convenient ones.

### In practice

Scoring depends on the task. Extraction and classification can be exact-match.
Open-ended answers need a rubric, a model-based judge, or human review of a
sample.

Whichever you use, **version the set and freeze it**. If the cases change at the
same time as the prompt, you can no longer tell which one moved the score — and
a measurement you cannot attribute is not a measurement.
