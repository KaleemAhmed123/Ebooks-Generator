## Confidence Calibration

Whether a stated or derived confidence score actually predicts correctness.
Models are typically overconfident, so self-reported confidence is not a routing
signal until it has been checked.

Answers the model rated high-confidence were wrong 22% of the time. Calibrating
against labelled outcomes produced a threshold that could actually be used for
auto-approval.

### How it works

Routing on confidence is tempting — auto-approve above a threshold, send the
rest for review. That only works if the number predicts correctness, and by
default it does not.

Asking a model how sure it is produces a plausible number, not a measured one.
It is the weakest available signal, and it is the one most often wired straight
into a threshold.

Calibration means checking empirically. Take a few hundred outputs whose correct
answers you know, group them by stated confidence, and compare each group's
claimed confidence against its actual accuracy.

| Stated | Actual | Reading |
|---|---|---|
| 0.9 | ~90% correct | well calibrated, the threshold means something |
| 0.9 | ~70% correct | overconfident; derive the threshold from the curve |

Poor calibration does not make the signal useless. It means the threshold has to
come from the measured curve rather than from the number the model printed.

### In practice

Derived signals usually calibrate better than stated ones. Agreement across
several samples of the same input, retrieval similarity scores, whether the
output passed schema validation, and token probabilities where the provider
exposes them are all worth testing against ground truth.

Pick whichever actually tracks correctness on your data. That is an experiment
of a few hours, and it is the difference between an auto-approval threshold that
holds and one that quietly approves a fifth of the wrong answers.
