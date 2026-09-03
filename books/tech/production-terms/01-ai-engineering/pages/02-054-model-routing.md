## Model Routing

Sending each request to the cheapest model that can handle it, rather than
sending everything to the largest.

Classification and short extraction go to a small fast model; long contract
analysis goes to the large one. Cost drops materially and median latency
improves at the same time.

### How it works

Providers offer models at very different price and speed points, often an order
of magnitude apart. Sending everything to the largest means paying premium rates
for work a small model does perfectly.

Routing classifies each request and dispatches accordingly. Classifying a
support ticket, extracting a date, checking whether a string is a question —
small model. Analysing a fifty-page contract — large model.

**The router itself has to be cheap and fast, or it eats the saving.** In
practice that means a heuristic on input length or type, a small embedding
classifier, or a keyword rule. Not another large model call, which is a
surprisingly common way to build a router that costs more than it saves.

A useful refinement: route optimistically to the small model, and escalate only
when it signals low confidence or its output fails validation.

### In practice

The discipline this requires is a **shared evaluation set**.

Without one, routing decisions get made on intuition and quality drifts
downward invisibly — because the small model is worse in ways that do not
surface until a customer complains, and by then the routing rule is months old
and nobody remembers why it was set that way.

Route on measured per-task performance, and re-measure whenever a model version
changes on either side of the split.
