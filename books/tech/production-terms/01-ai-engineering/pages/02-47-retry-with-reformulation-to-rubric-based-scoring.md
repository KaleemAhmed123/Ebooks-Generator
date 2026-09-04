## Retry with Reformulation

Changing something before the second attempt instead of resending the identical
request. An identical request against a deterministic failure produces an
identical failure at twice the cost.

Plain retry is right for transient faults — a timeout, a 429, a 503 — where the
same request will eventually work. Reformulation is for failures the request
itself caused: expand the internal acronym that retrieved nothing, widen k, drop
a metadata filter, or feed the validation error back so the model can repair its
own output.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A failure branches on whether it is transient, in which case the same request is retried, or deterministic, in which case the request is changed before retrying">
  <rect x="4" y="30" width="84" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="46" y="48" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">failure</text>
  <path d="M88 44 H120" stroke="#1a1a1a" stroke-width="1.2"/><path d="M120 44 l-7 -4 v8 z" fill="#1a1a1a"/>
  <path d="M124 44 L152 30 L180 44 L152 58 Z" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="152" y="47" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#1a1a1a">transient?</text>
  <path d="M180 38 H236" stroke="#1a1a1a" stroke-width="1.2"/><path d="M152 30 V14 H236" stroke="#1a1a1a" stroke-width="1.2"/><path d="M236 14 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="238" y="2" width="218" height="24" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="250" y="17" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">yes: send the same request again</text>
  <path d="M152 58 V72 H236" stroke="#1a1a1a" stroke-width="1.2"/><path d="M236 72 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="238" y="60" width="218" height="24" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="250" y="75" font-family="Consolas,monospace" font-size="8.5" fill="#c25a35">no: change it, then send</text>
</svg>

**Cap reformulation as tightly as ordinary retries, and log what changed.**
Otherwise a question your corpus genuinely cannot answer burns budget cycling
through rewrites, when abstaining after the first attempt was correct.

## Rubric-Based Scoring

Naming the dimensions before judging, and scoring each separately, so a number
means the same thing across runs and across reviewers.

"Good" is doing several jobs at once. An answer can be accurate but malformed,
or fluent but unsupported by its sources. A blended score cannot separate them,
so a regression tells you only that something happened.

| Dimension | The question it asks |
|---|---|
| Groundedness | is every claim supported by the provided context? |
| Completeness | is anything material missing? |
| Format | does it validate against the schema? |
| Tone | does it match the product voice? |

**Keep each criterion binary.** "Groundedness: 0 or 1" is answerable
consistently. "Groundedness out of 10" is not, and reviewers will quietly use
different internal scales while producing numbers that look comparable. A
dimension that needs nuance should be split in two, not widened.
