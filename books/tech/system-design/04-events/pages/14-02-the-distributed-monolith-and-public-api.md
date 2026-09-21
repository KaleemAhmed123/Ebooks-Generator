## The distributed monolith, and events as public API

- A **distributed monolith** over a broker: services that look independently deployable but cannot actually ship separately, because every event is a shared struct that every consumer parses by field name. One schema change becomes twelve deploys, coordinated by hand, on the same day — the operational cost of a monolith without the one benefit of a monolith, which is that a compiler catches the break before it ships

| Owned like an internal detail | Owned like public API |
|---|---|
| Renamed a field, broke nobody knew who | A registry of every consumer, checked before a breaking change |
| No deprecation window | Old and new versions both served until every consumer migrates |
| "It's just our own events" | An event with three consuming teams is an API, whatever it is called internally |

- Once three teams consume an event, it is public API in every sense that matters, whether or not it was ever documented as one. Treating it like an internal implementation detail — free to reshape on a whim — is what turns "just our events" into "twelve deploys in one afternoon"
- A "temporary" event is the common way in: something stood up for a one-off migration or a short-lived integration gets a consumer, then a second, and is still running three years later because nobody owns deprecating it

### The failure

- A field renamed on an event with three consuming teams, none of them told, because the producing team considers the schema an internal detail. All three break on the same deploy, and the incident review's first question — "who else reads this" — has no answer on file anywhere
