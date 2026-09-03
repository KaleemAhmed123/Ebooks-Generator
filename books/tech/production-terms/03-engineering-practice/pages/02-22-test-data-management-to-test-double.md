## Test Data Management

How tests get the data they need, and how it stops being someone else's real
data. The options run from factories building rows per test, through a seeded
fixture set, to an anonymised extract of production.

Copying production is the fast option and the one that puts real names and card
numbers on a laptop. Anonymisation also has to survive joins — a masked email in
one table and the same address unmasked in another re-identifies the row.

**Teardown is the cost nobody plans for.** Data created per test has to be
removed per test, and the suite leaking a hundred rows a run is the suite that
mysteriously slows down a month later.

## Test Double

Gerard Meszaros's term for any stand-in used in place of a real collaborator.
The five kinds are not interchangeable.

| Kind | What it does |
|---|---|
| Dummy | passed around, never used — fills a parameter list |
| Fake | really works, via a shortcut unfit for production |
| Stub | returns canned answers to calls made in the test |
| Spy | a stub that also records how it was called |
| Mock | pre-programmed with the calls it expects to receive |

**Only a mock can fail the test by itself.** The other four influence the result
and nothing more — so a test that pulls in a mocking library and never asserts on
an interaction is a stub test wearing the wrong name.
