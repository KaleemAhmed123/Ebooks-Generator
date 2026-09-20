## Linearizability

- A system running a consensus algorithm provides the strongest possible consistency guarantee in computer science: **Linearizability** (also known as Strong Consistency)
- Linearizability means that a distributed system behaves exactly as if there is only *one single copy of the data*, and every operation is atomic and instantly visible to everyone

```typescript
// Asserting Linearizable Order
// Once User B sees the new value, it is physically impossible
// for User C to see the old value. The system acts like a single variable.

await cluster.write('owner', 'Alice');

// Thread 1
await cluster.write('owner', 'Bob'); // Returns Success

// Thread 2 (Later in time)
const owner = await cluster.read('owner'); // Returns 'Bob'

// Thread 3 (Even later in time)
// In an Eventually Consistent system, this might return 'Alice' (lag).
// In a Linearizable system, this MUST return 'Bob'.
const finalOwner = await cluster.read('owner'); 
```

- To achieve this, even read queries in a linearizable system must often go through the Leader (or require a quorum check) to ensure they aren't reading from a stale Follower who was just partitioned away from the network

### The failure

- Building a bank ledger on an eventually consistent system. If you try to enforce "balance must be >= 0" on an eventually consistent system, two users withdrawing money at the exact same millisecond might hit two different replicas. Both replicas see `$100`, both allow a `$100` withdrawal, and the final state is `-$100`. Invariants require linearizability to check the true, final state of the world before writing
