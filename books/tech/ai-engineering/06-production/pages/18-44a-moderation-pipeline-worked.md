## A moderation pipeline, worked

- Assemble the moderation concepts (18-44) into a concrete pipeline for a user-generated-content platform, with the routing that makes it affordable and correct at scale.

:::mint
```text
Post submitted
  │
  ├─ 1. cheap fast classifier (Llama Guard / Perspective)   ~5ms, all posts
  │       clear-safe  ────────────────────────────────► publish
  │       clear-harmful ──────────────────────────────► block + notify
  │       uncertain ─┐
  │                  ▼
  ├─ 2. LLM judge (rubric, context-aware)   ~300ms, ~4% of posts
  │       decides  ──────────► publish / block
  │       borderline ─┐
  │                   ▼
  └─ 3. human review queue   minutes, ~1% of posts
          decision ──► action + label training data ──► improves step 1

Appeals: user disputes ──► human review ──► overturn feeds back to classifier
```
:::

- **The cascade is the cost control** (19-16c): step 1 auto-handles ~95% at ~5ms, so the expensive LLM judge and humans see only the hard minority. Without it, an LLM on every post at UGC volume is unaffordable; with it, expensive judgment is spent only where difficulty demands.
- **Every human decision is training data.** The borderline cases humans resolve — and the appeal overturns — feed back to retrain step 1's classifier, so the cheap layer keeps improving and the human load shrinks over time. The pipeline learns from its own hardest cases.

:::interview
"Design the moderation pipeline for a platform with millions of posts a day."

A three-tier cascade for cost, plus a feedback loop for quality. **Tier 1:** a cheap fast classifier (Llama Guard/Perspective) on every post — auto-publish the clear-safe, auto-block the clear-harmful, escalate the uncertain (~95% resolved here at ~5ms). **Tier 2:** an LLM judge with a rubric and context on the ~4% uncertain. **Tier 3:** human review on the ~1% borderline, plus an **appeals** path. Then the loop: every human decision and appeal overturn retrains tier 1, shrinking the expensive load over time. Screen images too, tune per-category thresholds to the stakes (both error types cost), and monitor false-positive/negative and appeal-overturn rates. The cascade-for-cost plus learn-from-humans structure is the answer.
:::
