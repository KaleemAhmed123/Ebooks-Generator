## One Trigger Per Object

Salesforce does not define the execution order of multiple triggers on the same
object. One trigger per object, delegating to a handler class, is the pattern
that makes ordering yours to decide.

Three triggers on `Account` fire in an order that can change between
deployments. Working out which one overwrote a field is not debugging, it is
guessing, and the answer stops being true after the next release.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A single Account trigger delegates to a handler class whose before-insert, after-update and other methods run in an order the code defines">
  <rect x="4" y="24" width="140" height="28" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/>
  <text x="74" y="42" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">AccountTrigger</text>
  <path d="M146 38 H176" stroke="#1a1a1a" stroke-width="1.2"/><path d="M176 38 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="180" y="24" width="150" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="255" y="42" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">AccountTriggerHandler</text>
  <path d="M332 38 H348 M348 12 V64 M348 12 H370 M348 38 H370 M348 64 H370" stroke="#1a1a1a" stroke-width="1.1" fill="none"/>
  <path d="M370 12 l-7 -4 v8 z M370 38 l-7 -4 v8 z M370 64 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="376" y="16" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">beforeInsert</text>
  <text x="376" y="42" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">afterUpdate</text>
  <text x="376" y="68" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">…</text>
</svg>

## Platform Events

Salesforce's own publish-subscribe bus. Apex publishes an event; triggers,
Flows and external clients on the Pub/Sub API subscribe. Each has its own
delivery and retention limits.

A trigger that calls an external API synchronously fails whenever that API is
slow, and takes the user's save with it. Publishing an event instead ends the
transaction at the publish, and a subscriber owns delivery from there.

<svg viewBox="0 0 460 68" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Apex publishes an event to the Salesforce event bus, which fans out to an Apex trigger subscriber, a Flow subscriber and an external Pub/Sub API client">
  <rect x="4" y="22" width="94" height="26" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="51" y="39" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">Apex publishes</text>
  <path d="M100 35 H132" stroke="#1a1a1a" stroke-width="1.3"/><path d="M132 35 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="136" y="22" width="94" height="26" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.5"/>
  <text x="183" y="39" text-anchor="middle" font-family="Consolas,monospace" font-size="9" fill="#5b2fa8">event bus</text>
  <path d="M232 35 H262 M262 10 V60 M262 10 H288 M262 35 H288 M262 60 H288" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M288 10 l-7 -4 v8 z M288 35 l-7 -4 v8 z M288 60 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="294" y="14" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">Apex trigger subscriber</text>
  <text x="294" y="39" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">Flow subscriber</text>
  <text x="294" y="64" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">external Pub/Sub client</text>
</svg>

Replay is bounded by the retention window. A subscriber down longer than that
has lost those events, and nothing reports it except the gap.

## satisfies

*operator*

Validates a value against a type without widening it. Annotate when you want
the wider type; use `satisfies` when you want the check without losing what you
wrote.

Annotating `routes` as `Record<string, Handler>` widens its keys to `string`, so
autocomplete offers nothing. The same object with `satisfies` is checked against
that shape and keeps its literal key names — a mistyped route stops compiling.
