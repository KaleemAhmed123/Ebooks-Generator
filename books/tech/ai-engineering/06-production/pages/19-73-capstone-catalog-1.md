## Capstone catalog (1)

- The fifteen flagships and the eval harness cover the major project shapes; the remaining source capstones are variations that reuse the same building blocks. Each entry: what it is, its stack, and the one design decision that defines it.

**Code-migration agent** — translate a codebase from one language/framework to another (Python 2→3, Java→Kotlin, jQuery→React).
- *Stack:* Flagship 4's harness + retrieval over the source repo + a per-file translate-then-verify loop.
- *Defining decision:* **verify each file against tests before moving on** — migration compounds errors, so an unverified early file poisons everything downstream. Migrate incrementally, test-gated, never big-bang.

**Video-understanding pipeline** — answer questions about video (surveillance, meetings, sports).
- *Stack:* frame sampling → a VLM (Flagship 6) per keyframe → temporal aggregation → an LLM over the frame captions.
- *Defining decision:* **the sampling rate is the cost/quality knob** — video is thousands of frames, and processing all of them is ruinous, so sample keyframes (scene changes, fixed intervals) and only densify where the question demands it. The token-budget math of 17-28b, over time.

:::note
Both reuse patterns you have already built: code-migration is the coding-agent harness with a translate task and a test gate; video-understanding is the VLM applied frame-by-frame with a sampling strategy to control the token explosion. This is the point of the flagships — real projects are *compositions* of a small set of building blocks (harness, RAG, VLM, safety gate, eval), and once you have built the blocks, a new project is a new arrangement, not a new invention.
:::
