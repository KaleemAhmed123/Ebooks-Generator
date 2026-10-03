## Batch APIs

- Not all work is interactive. Nightly summarisation, bulk classification, embedding a corpus, offline evals — these have no user waiting. **Batch APIs** exploit that: submit a large job, accept a slower turnaround (typically within 24 hours), and pay roughly **half** the interactive rate.
- The provider fills spare capacity with your batch when interactive demand is low, so you rent the trough instead of competing for the peak — hence the discount.

<svg viewBox="0 0 340 78" role="img" aria-label="Interactive traffic peaks during the day; batch jobs fill the overnight trough at half price" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="24" y1="60" x2="320" y2="60" stroke="#888"/>
  <path d="M24 58 Q90 20 150 22 Q210 24 276 56 L276 60 L24 60 Z" fill="#e8f4fd" stroke="#24405e"/><text x="150" y="34" text-anchor="middle" font-size="6" fill="#24405e">interactive (day)</text>
  <path d="M24 60 L24 52 Q90 52 150 52 Q230 52 320 52 L320 60 Z" fill="#eaf6ea" stroke="#1a3a2a"/><text x="290" y="49" text-anchor="middle" font-size="5.5" fill="#1a3a2a">batch fills trough</text>
  <text x="60" y="73" font-size="5.5" fill="#6b6b6b">midnight</text><text x="150" y="73" font-size="5.5" fill="#6b6b6b">noon</text><text x="290" y="73" font-size="5.5" fill="#6b6b6b">midnight</text>
</svg>

- **When to use it:** any workload without a human in the loop. Move offline evals, data pipelines, backfills, and bulk generation to the batch tier and the interactive tier keeps only what a user is actually waiting on. This one classification often cuts a large fraction of an LLM bill with zero quality change.
- **When not to:** anything a user waits on, or anything with a deadline tighter than the batch window. The discount buys you *latency you don't need* — never spend it on latency you do.

:::note
Batch vs interactive is a scheduling decision, not a model decision — same model, same quality, different urgency and price. The senior habit is to ask of every LLM call: *is a human waiting on this?* If not, it belongs on the batch tier. Teams routinely leave money on the table by running offline jobs through the interactive API out of habit.
:::
