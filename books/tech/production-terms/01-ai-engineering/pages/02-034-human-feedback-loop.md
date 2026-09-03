## Human Feedback Loop

The mechanism that turns user signal into a usable label. Thumbs are cheap and
low-signal; corrections are expensive and high-signal.

Thumbs-down tells you something was wrong. An edited answer tells you what right
would have been — and only one of those is something you can train on.

### How it works

Feedback arrives in two grades, and they are worth very different amounts.

**Implicit signals** are free and abundant: did the user copy the answer, retry
the question, abandon the session, escalate to support. They are noisy — a retry
might mean the user thought of a better question — but they cover all traffic.

**Explicit signals** are scarcer and stronger: a rating, a correction, an edit.
Among these, corrections are worth far more than ratings, for the reason above.

The design lesson follows directly. If the interface only offers thumbs, you
collect the weak signal. If it lets users edit the output and saves the edit,
you collect training data as a byproduct of people doing their jobs.

### In practice

**Beware selection bias in explicit feedback.** People rate when they are
annoyed or delighted and almost never when things were merely fine, so the
explicit dataset over-represents both extremes.

| Use explicit feedback for | Use implicit or sampled review for |
|---|---|
| finding failure modes | anything you will quote as a rate |
| collecting corrections to learn from | measuring whether quality moved |

Reporting "82% thumbs-up" as a quality metric is reporting the opinion of the
minority who felt strongly enough to click.
