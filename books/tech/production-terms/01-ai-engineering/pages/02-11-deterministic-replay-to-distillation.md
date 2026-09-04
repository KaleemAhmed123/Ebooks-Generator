## Deterministic Replay

Storing enough of a request to reconstruct it exactly: the fully rendered
prompt, the model and its version, sampling parameters and seed, the retrieved
chunk IDs and their content, every tool call and result, and the raw output
before post-processing touched it.

A user question is not a reproducible bug report. Re-running it may produce
something different, and the context that produced the original answer is gone.
Sample successful requests to keep storage sane, and capture at full rate
anything that failed, was flagged, hit a cap, or drew negative feedback.

**Most surprising outputs turn out to be surprising inputs.** Retrieval returned
nothing relevant, history truncated oddly, a template variable resolved empty.
The rendered prompt is the field that shows this and the one most often not
stored, because the template alone looks like it should be enough.

## Distillation

*knowledge distillation*

Training a small model on a large model's outputs instead of on raw labels.
Hinton, Vinyals and Dean (2015) introduced it to compress an ensemble into one
deployable model: the student fits the teacher's full probability distribution,
which carries more information than a single correct class label does.

In production the shape is simpler. Run the strong model over your real traffic,
keep the input-output pairs, fine-tune a small model on them. You get the
teacher's behaviour on your distribution at the student's price and latency.

**The student inherits the teacher's mistakes and cannot beat it on the
distribution you distilled.** Draw the inputs from real traffic, or you ship a
model that is excellent on the cases you imagined and untested on the ones you
actually serve. Check the teacher provider's terms before you start.
