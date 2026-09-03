## Batch vs Online Inference

Online inference answers a user who is waiting. Batch processes large volumes on
a schedule, at a substantial discount and much higher throughput.

Embedding a forty-million-document backlog through the online API is slow and
expensive. The batch endpoint runs it overnight at roughly half the cost.

### How it works

Online inference serves someone who is watching a spinner. Latency is the
binding constraint, and you pay standard rates for the immediacy.

Batch inference submits a large job and collects the results later, usually
within hours. Providers discount it heavily — around half is typical — because
it lets them fill capacity when demand is low.

**The distinction is about who is waiting, not about volume.** Anything nobody
is watching belongs in batch: backfilling embeddings, classifying a historical
archive, nightly enrichment, generating evaluation results, reprocessing after a
parser fix.

Running those through the online API is a common and expensive habit. It is the
path already built, so it is the path used, and the discount is left on the
table quarter after quarter.

### In practice

Batch changes the failure model, and that is the part to design for rather than
discover. A job submitted now returns hours later, so results arrive
asynchronously and partial failures have to be reconciled against what was
submitted.

| Track per job | Because |
|---|---|
| submitted | you need a denominator |
| completed | partial success is the normal case |
| failed | resubmitting only the failures must be easy |

A batch pipeline without those three counters cannot tell the difference between
"finished" and "half of it silently vanished".
