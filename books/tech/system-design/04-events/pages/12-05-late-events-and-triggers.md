## Late events, and when to emit

- A record arrives **late** when the watermark has already passed its event time. **Allowed lateness** is a grace period during which a late record still updates its window; past that, Flink either drops the record or routes it to a side output for separate handling

<svg viewBox="0 0 460 100" role="img" aria-label="A timeline showing the watermark, an early speculative trigger before it, an on-watermark trigger, a late arrival within the grace period that revises the result, and a late arrival past the grace period that is dropped." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8">
  <path d="M30 55 L430 55" stroke="#333"/>
  <path d="M250 55 L250 15" stroke="#1d4e89" stroke-dasharray="2 2"/>
  <text x="250" y="12" text-anchor="middle" font-size="6.5" fill="#1d4e89">watermark</text>
  <circle cx="180" cy="55" r="3" fill="#1d4e89"/>
  <text x="180" y="72" text-anchor="middle" font-size="6">early trigger</text>
  <circle cx="250" cy="55" r="3" fill="#333"/>
  <text x="250" y="90" text-anchor="middle" font-size="6">on watermark</text>
  <circle cx="300" cy="55" r="3" fill="#333"/>
  <text x="300" y="72" text-anchor="middle" font-size="6">late, within grace</text>
  <text x="300" y="90" text-anchor="middle" font-size="6">revises result</text>
  <circle cx="390" cy="55" r="3" fill="#bf4c28"/>
  <text x="390" y="72" text-anchor="middle" font-size="6" fill="#bf4c28">past grace: dropped</text>
</svg>

- A grace period of zero drops every record that arrives after its window's watermark has passed — in practice, every mobile event that shows up after a tunnel, a dropped connection, or a backgrounded app. Some lateness tolerance is close to mandatory for anything fed by real clients
- Lateness interacts directly with **when to emit** a result at all. The Dataflow model names the trade bluntly: "one can never fully optimize along all dimensions of correctness, latency, and cost." A trigger can fire once on the watermark (correct, slow), fire early with speculative partial results (fast, might change), or keep firing as late data revises the answer (accurate, never quite final) — and the model's own stance on "done" is equally blunt: "we will never know if or when we have seen all of our data"
- A downstream system that treats every emission as final breaks the moment a trigger fires more than once for the same window — early results, watermark results, and late revisions all need to be distinguishable, or a dashboard shows a number that later quietly changes with no visible correction

### The failure

- Allowed lateness set to zero because "real time means real time," on a pipeline fed by mobile clients. Every event that arrives after a backgrounded app resumes and flushes its queue is dropped outright, and the metrics undercount exactly the users with the worst connectivity
