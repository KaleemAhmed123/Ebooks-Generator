## Guardrail frameworks

- You rarely build the runtime safety layer from scratch — you assemble it from **guardrail frameworks** that package input/output checks, policies, and validators. Knowing the named ones is expected in an interview. **[VERIFY current tools]**

| Framework | Focus | Shape |
|---|---|---|
| **Llama Guard** | content classification | an LLM fine-tuned to label safe/unsafe by category (18-22) |
| **NeMo Guardrails** (NVIDIA) | conversational rails | a DSL (Colang) defining allowed dialogue flows + checks |
| **Guardrails AI** | output validation | schema/quality validators with re-ask on failure |
| **OpenAI / Azure moderation** | hosted classifiers | API endpoint returning category scores |
| **Perspective API** (Google/Jigsaw) | toxicity | scores text on toxicity dimensions |

- **They occupy different layers.** *Classifiers* (Llama Guard, Perspective, moderation APIs) label content safe/unsafe. *Validators* (Guardrails AI) enforce that outputs meet a schema or quality bar, re-asking the model if not — closer to structured decoding (17-17a) than to safety. *Rails* (NeMo) constrain the *conversation flow* — which topics and actions are permitted — declaratively.
- **The pattern is compose, don't reinvent.** A production guard is usually a classifier (input + output) + a validator (structure/grounding) + policy rails, wired at the gateway (17-47) — the safety-gate flagship (19-59) built from named parts.

:::interview
"What tools would you use to add guardrails to an LLM app?"

Compose the layer from named frameworks rather than building from scratch: a **content classifier** on input and output (Llama Guard self-hosted, or a hosted moderation API) for harmful content; an **output validator** (Guardrails AI) to enforce schema, grounding, and format with re-ask on failure; and, for a constrained conversational product, **rails** (NeMo Guardrails) to declaratively limit topics and actions. Wire them at the **gateway** so every app inherits them, monitor false-positive/negative rates, and remember they're probabilistic layers — pair them with architecture (least privilege) since no classifier is a wall. Naming the tools *and* which layer each covers is the signal.
:::
