## Change Data Capture

Streaming a database's write-ahead log as events, so downstream systems learn
about changes without polling and without a dual write.

Debezium tails the Postgres WAL and publishes every row change. The search
index, the cache invalidator and the warehouse all update from one source of
truth, and none of them needs the application to remember to tell them.

<svg viewBox="0 0 460 96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Postgres write-ahead log is tailed and published as row-change events feeding a search index, cache invalidation and an analytics warehouse">
  <rect x="4" y="30" width="96" height="34" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="52" y="45" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">Postgres</text>
  <text x="52" y="57" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">WAL</text>
  <path d="M102 47 H140" stroke="#1a1a1a" stroke-width="1.4"/><path d="M140 47 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="144" y="30" width="104" height="34" fill="#e2fcf3" stroke="#2b5fa8" stroke-width="1.6"/>
  <text x="196" y="51" text-anchor="middle" font-family="Consolas,monospace" font-size="9.5" fill="#2b5fa8">row-change events</text>
  <path d="M250 47 H286 M286 18 V76 M286 18 H316 M286 47 H316 M286 76 H316" stroke="#1a1a1a" stroke-width="1.3" fill="none"/>
  <path d="M316 18 l-7 -4 v8 z M316 47 l-7 -4 v8 z M316 76 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="322" y="22" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">search index</text>
  <text x="322" y="51" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">cache invalidation</text>
  <text x="322" y="80" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">analytics warehouse</text>
</svg>

## Choreography vs Orchestration

Choreography means services react to each other's events with no central brain.
Orchestration means one coordinator drives the steps. Choreography scales;
orchestration can be debugged.

A seven-step order flow in pure choreography is impossible to trace when step
five silently never fires — there is no place to look, because no component
knows the whole sequence. An orchestrator makes that sequence an explicit,
queryable state machine.

| | Choreography | Orchestration |
|---|---|---|
| Coupling | low | services depend on the coordinator |
| Tracing a stuck flow | nothing owns the sequence | one place to look |
| Adding a step | new subscriber, no redeploy | change the coordinator |
| Failure mode | emergent behaviour nobody can draw | the coordinator is a dependency |
