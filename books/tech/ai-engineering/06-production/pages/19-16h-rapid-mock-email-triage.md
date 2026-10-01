## Rapid mock: email / ticket triage

- **Prompt:** "Automatically triage and route incoming email/support tickets." **Clarify:** high volume, many categories/teams, must extract structured fields (intent, urgency, entities), route correctly, draft replies for common cases, never auto-send sensitive replies.
- This is a **classification + extraction + routing** pipeline where structured output (17-17a) is the backbone and the risk is in *actions* (auto-reply, auto-route).

- **The pipeline.** Each message → an LLM with **guided decoding** extracts a structured object (`{intent, urgency, team, entities, sentiment}`) → route by the structured fields (deterministic rules on the extracted data, not the raw text) → for common intents, draft a reply from templates + RAG over the KB → **queue drafts for human approval** on anything sensitive; auto-send only low-risk, high-confidence categories.
- **Structured output is what makes it reliable.** Routing on a validated `{team, urgency}` object is deterministic and testable; routing on the LLM's freeform text is not. Guided decoding guarantees the fields parse (17-17a); a confidence threshold decides auto vs human.

:::interview
"Design email triage that routes and drafts replies."

A classification-extraction-routing pipeline built on **structured output**. Each message goes to an LLM with **guided decoding** that emits a validated `{intent, urgency, team, entities}` object; routing is then *deterministic rules on those fields* — testable and reliable — not on freeform text. For common intents, draft a reply from templates + KB retrieval, but **gate actions by risk and confidence**: auto-send only low-risk high-confidence categories, queue everything else for human approval (never auto-send a sensitive reply). The two signals that show production sense: structured output as the routing backbone (parse-guaranteed, testable) and risk-gated auto-actions (the classify/act split from 19-16e).
:::
