## Capstone catalog (2)

**Personal AI tutor** — adaptive teaching that tracks a learner's state and adjusts.
- *Stack:* RAG over course material (Flagship 3) + long-term **memory** of the learner's progress (Booklet 5) + a Socratic prompting strategy + eval on learning outcomes.
- *Defining decision:* **memory of the learner is the product** — a tutor without a model of what the student knows and struggles with is just a chatbot with a textbook. The per-learner memory (Booklet 5's memory types) is what makes it *adaptive*.

**The end-to-end demo finales** (source `*-end-to-end-*` capstones) — each source track ends in an integration project (coding-task demo, research demo, RAG system, eval runner, distributed-train run, safety gate). These are the *assembled* versions of the flagships above: they wire the track's components into one working system.
- *Defining lesson:* **integration is where the failure modes live.** Each component can pass its own tests and the assembled system still fail — at the seams (a schema mismatch, an error not propagated, a budget not shared). The end-to-end run is the eval that matters, which is why every flagship ended on an integrated interview question, not a unit test.

:::note
Nothing in the source's 86 capstones is dropped: the fifteen flagships build the major shapes deep, the eval harness is its own capstone, and these catalog entries plus the end-to-end finales are compositions of the same blocks. The through-line of the entire module: **real AI systems are assembled from a dozen reusable building blocks** (17-62), and mastery is knowing the blocks cold and composing them for the problem — which is exactly what the system-design interview (17-57) tests and what these projects prove you can do.
:::
