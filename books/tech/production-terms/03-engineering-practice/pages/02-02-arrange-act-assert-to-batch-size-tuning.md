## Arrange-Act-Assert

*AAA*

Bill Wake's 2001 naming for a test's three phases: arrange the object and its
collaborators, act through one mutator, assert about the result.

The value is diagnostic: a test with one act has exactly one reason to fail, so
the failure message alone tells you what broke.

**The rule that gets broken is one act per test.** Arrange, act, assert, act
again, assert again — and the second act runs against state the first one left
behind, so a failure at the last assertion could have originated anywhere above
it.

## Async Overhead

Concurrency machinery has a price per suspension: state to allocate, a hand-off
to a scheduler, and a resume on a later turn of the loop.

V8 measured its own. Before the await optimisation each `await` allocated two
extra promises and cost at least three microtask ticks; the change shipped in
V8 7.2 and Chrome 72 brings the common case down to one tick. Down, not to zero.

**Marking a function async when it never waits on I/O is a pure loss.** You pay
the suspension and the scheduler hop and buy no overlap, because there was
nothing to overlap it with.

## Batch Size Tuning

Batching trades latency for throughput. A larger batch spreads the fixed
per-request cost over more items, and every item waits for the batch to fill.

Kafka's producer sends when `batch.size` bytes accumulate or `linger.ms`
expires, whichever comes first. `batch.size` defaults to 16384 bytes.
`linger.ms` defaulted to 0 through Kafka 3.9 and to 5 from Kafka 4.0 — the
project traded five milliseconds of latency for the batching it buys.

**Tuning against average load inverts your latency curve.** The batch that
fills in 2ms at peak sits out the full linger timeout at 3am, so the quiet hours
are slower than the busy ones.
