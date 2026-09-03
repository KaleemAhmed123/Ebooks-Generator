## Train-Serve Skew

The features or preprocessing at training time differing from serving time. The
model is fed something it never learned on, and quality drops for no visible
reason.

Training normalised whitespace and lowercased; the serving path did not.
Accuracy was eight points lower in production than in every offline test.

### How it works

The model sees whatever your code feeds it. If preprocessing at training time
differs at all from preprocessing at serving time, the model receives inputs
subtly unlike anything it learned on.

**The differences are usually small and boring.** Whitespace normalised in one
path and not the other. A different truncation length. Fields concatenated in a
different order. Lowercasing applied inconsistently. None of them look like
bugs, and none of them will be spotted in review.

The symptom is a persistent gap between offline and production accuracy that
resists explanation. Offline everything is clean, because the same script
prepared the training and evaluation data. In production a different code path
builds the input.

It is one of the most common causes of "but it worked in testing", and one of
the easiest to prevent.

### In practice

The structural fix is **one shared preprocessing module**, imported by both the
training pipeline and the serving path, with tests asserting the two produce
identical output for the same input.

Any design where the two paths are implemented separately will drift eventually,
regardless of how carefully the first version was written. The drift arrives
with a change nobody connected to the model at all.
