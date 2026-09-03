## Rubric-Based Scoring

Defining explicit criteria before judging, so scores mean the same thing across
runs and across reviewers.

"Is this answer good?" produces noise. "Is every claim supported? Is the format
valid? Is anything material omitted?" produces three scores you can act on.

### How it works

"Good" is doing several jobs at once. An answer can be accurate but badly
formatted, or well-written but unsupported by the sources, and a single number
cannot distinguish them.

A rubric names the dimensions in advance and scores each separately:

| Dimension | Asks |
|---|---|
| Groundedness | is every claim supported by the provided context? |
| Completeness | is anything material missing? |
| Format | does it validate against the schema? |
| Tone | does it match the product voice? |

**The immediate benefit is that a regression becomes diagnostic.** A drop in one
dimension tells you where to look. A drop in a blended score tells you only that
something happened.

The secondary benefit is that writing the rubric forces the team to agree what
quality means — which is frequently the first time that conversation happens
explicitly rather than in the gaps between opinions.

### In practice

**Keep each criterion binary or on a very short scale.**

"Groundedness: 0 or 1" is answerable consistently. "Groundedness out of 10" is
not, and reviewers will silently use different internal scales while producing
numbers that look comparable.

If a dimension genuinely needs nuance, split it into two binary questions rather
than widening the scale.
