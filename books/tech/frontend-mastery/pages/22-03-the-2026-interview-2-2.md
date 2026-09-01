### What to actually prepare

Ranked by how often it decides the outcome:

1. **One project you can talk about for thirty minutes.** What it did, why the
   architecture was that way, what you would change. Depth beats breadth.
2. **Rendering strategies, and when each is wrong.** Static, server, streaming,
   client. Be able to say what you would choose for a marketing page, a
   dashboard, and a checkout, and why.
3. **Performance, with numbers.** "I cut LCP from 4.2s to 1.8s by preloading the
   hero image and dropping a 90kB date library" is a different answer from "I
   improved performance."
4. **Accessibility.** It appears in more interviews than it used to, for the
   legal reasons in Module 16. Know what a focus trap is and why `<div onClick>`
   is a bug.
5. **How you review code you did not write.** Increasingly asked directly,
   because it is increasingly the job.
6. **One real disagreement**, resolved, where you can explain the other side
   fairly.

### The take-home, if there is one

Take-homes are shrinking because AI made "did they write it" unanswerable. Where
they survive, they are shorter and followed by a session where you extend your
own submission live. That follow-up is the real test: you cannot walk through
code you did not understand.

Two rules. **Do the stated scope and stop.** Spending twelve hours on a
four-hour brief reads as poor judgement, not enthusiasm. And **write the README
they will actually read**: what you built, what you left out and why, and what
you would do with another day.

### One thing that has not changed

The strongest signal in any of these rounds is still the same: **can you explain
a trade-off you made, and the case for the option you rejected?**

Every module in this booklet has one. Server Components buy a smaller bundle and
cost you interactivity at that boundary. Prerendering buys instant navigation
and costs bandwidth on visits that never happen. The edge buys latency and costs
you the database. Being able to say both halves out loud is what the interview
is measuring.
