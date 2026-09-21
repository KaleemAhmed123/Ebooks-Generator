## When event sourcing and CQRS pay off

| Pays off | Does not |
|---|---|
| Audit or compliance is the product — a ledger, a regulated trail | A CRUD admin panel with one obvious read shape |
| Many differently-shaped reads off one write model | One screen, one query, no projection to build |
| "What did this look like on Tuesday" is a real question | The business never asks about past states |
| Replay is a genuine debugging or backfill tool | The team has never run an event-sourced system before launch week |

- Two costs that do not show up in a demo: event versioning is forever, because old events on the log must still fold correctly under new code (Module 11 covers the schema side); and "delete my data" fights an append-only log directly — the standard answer is crypto-shredding, encrypting each subject's events with a key that gets deleted, not deleting the events themselves
- Adopting both patterns for their own sake, with no read-shape problem and no audit requirement, buys the eventual consistency and the fold complexity with nothing to show for it

### The failure

- Event sourcing a settings table because "it's the modern way." Every read needs the full fold just to answer "is dark mode on," there is no audit requirement, and no one has ever asked what a setting looked like last Tuesday. A row that gets overwritten was the right answer
