## Backward vs Forward Compatibility

Backward compatible means new code reads old data. Forward compatible means old
code tolerates new data — and that is the one that makes rolling deploys safe.

During a rolling deploy both versions run at once. If the old version throws on
an enum value it has never seen, every deploy becomes a partial outage for the
length of the rollout.

| Safe | Unsafe |
|---|---|
| add an optional field | rename a field |
| add an enum value old code ignores | remove a field |
| widen a type | change a type |
| | change what a field means |

The last row is the dangerous one, because it passes every schema check.

## Bounded Context

A boundary inside which a term has exactly one meaning. Two contexts can both
have a `Customer` and be correct in meaning different things by it.

In billing a customer is a tax ID and payment terms. In support it is a ticket
history and an SLA tier. In shipping it is a set of addresses. A single shared
`Customer` table serves all three badly and blocks all three from changing.

The boundary is not a folder. It is the point where you stop sharing a model and
start translating between two — which is what an anti-corruption layer is for.
