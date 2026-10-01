## Observability: cost attribution in depth

- The dashboard (19-54) showed cost as a panel. Making cost *attributable* — knowing which team, feature, user, and even which *step* of a request spent the money — is what turns a scary total into an actionable breakdown (17-55). It's built from the span attributes you already emit (19-53).

:::mint
```python
# every span carries the dimensions you'll want to slice cost by
span.set_attribute("gen_ai.cost_usd", cost)
span.set_attribute("attribution.team", ctx.team)        # who
span.set_attribute("attribution.feature", ctx.feature)  # what feature
span.set_attribute("attribution.user_id", ctx.user)     # which user
span.set_attribute("attribution.step", "rerank")        # which pipeline step
# roll up: SELECT sum(cost_usd) GROUP BY team, feature, step
```
:::

- **Attribution is a data-modelling decision made at emit time.** You can only slice cost by a dimension you *stamped on the span* — so decide up front what you'll want to answer ("cost per feature per day", "cost per user", "which pipeline step dominates") and tag every request accordingly at the gateway (17-47). Retrofitting a dimension means re-instrumenting.
- **Step-level attribution finds the waste.** Rolling cost up by *pipeline step* (retrieval vs rerank vs generation) shows where the money actually goes — usually generation (17-63b), which tells you where the levers pay off. A total says "we spent $50k"; a step breakdown says "$45k of it was generation, so quantize and route there."

:::interview
"The finance team wants to know what's driving our LLM costs. What do you show them?"

A breakdown, not a total — sliced by the dimensions they care about: **per team, per feature, per user, per day**, and critically **per pipeline step**. That's possible because every span is stamped at the gateway with those attribution attributes and a computed cost, so I roll them up with a group-by. The step breakdown is the actionable part — it usually shows generation dominating, which points the optimisation (quantize, route, cache) at the right place. The prerequisite is having *decided the attribution dimensions in advance* and tagged every request, because you can only slice by what you stamped — attribution is designed in at emit time, not queried out later.
:::
