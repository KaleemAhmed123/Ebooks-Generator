## A/B testing LLM features

- Canary asks *"did the new version break?"* A/B testing asks a different question: *"is the new version actually better for the business?"* You split users into arms, serve each a different variant, and compare an outcome metric with statistical rigour.
- The hard part is that LLM output is **subjective and noisy**, so the metric must be something real, not "the response looked good."

| Layer | Example metric | Note |
|---|---|---|
| **product** | task completion, retention, conversion | the real goal, slow to move |
| **engagement** | thumbs-up rate, edits, regenerations | fast proxy, gameable |
| **quality** | eval-suite score, groundedness | offline-measurable |
| **cost/latency** | $/task, TTFT | a better answer that costs 3× may lose |

- **Pick the outcome metric before you run the test**, and prefer a product metric (did the user get their job done?) over a vanity one (did they click thumbs-up?). Guard it with the cost and latency it took to get there — a variant that lifts quality but triples cost is often a net loss.
- **Statistics still apply.** LLM output variance is high, so you need enough samples to clear the noise; call winners on a pre-registered metric and a significance threshold, not on a demo that felt better.

:::note
The distinction interviewers listen for: **canary is a safety gate** (ship without breaking), **A/B is a value test** (ship because it wins). They compose — canary the change to prove it is safe, then A/B it to prove it is worth keeping. Conflating them ("we canaried it and users liked it") is a common junior slip, because a canary's sample and duration are not designed to measure a product outcome.
:::
