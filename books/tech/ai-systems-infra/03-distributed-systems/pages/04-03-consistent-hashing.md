## Consistent hashing

- The obvious way to hash-partition — `partition = hash(key) mod N` — has a fatal flaw: change **N** (add or remove a node) and the modulus changes for **almost every key**, so nearly all data has to move at once. Going from 4 nodes to 5 remaps roughly 80% of keys — a cluster-wide reshuffle that saturates the network and stalls the system exactly when you were trying to grow it.
- **Consistent hashing** fixes this. Imagine a ring of hash values (0 … 2³²−1). Hash each **node** onto the ring, and hash each **key** onto the ring; a key belongs to the **first node clockwise** from it. Now adding or removing a node only reassigns the keys in **one arc** — those between the new/removed node and its neighbour — leaving everyone else untouched.

<svg viewBox="0 0 360 104" role="img" aria-label="A hash ring: nodes and keys are placed on a ring; each key belongs to the next node clockwise, so adding a node only moves the keys in one arc" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="90" cy="52" r="38" fill="none" stroke="#1f487e" stroke-width="1.2"/>
  <circle cx="90" cy="14" r="4" fill="#1f487e"/><text x="90" y="9" text-anchor="middle" font-size="6">N1</text>
  <circle cx="128" cy="52" r="4" fill="#1f487e"/><text x="138" y="54" font-size="6">N2</text>
  <circle cx="90" cy="90" r="4" fill="#1f487e"/><text x="90" y="101" text-anchor="middle" font-size="6">N3</text>
  <circle cx="52" cy="52" r="4" fill="#1f487e"/><text x="40" y="54" text-anchor="end" font-size="6">N4</text>
  <circle cx="113" cy="25" r="2.6" fill="#c0392b"/><text x="120" y="24" font-size="5.4" fill="#c0392b">key→N2</text>
  <text x="210" y="30" font-size="6.3" fill="#1f487e">add a node →</text>
  <text x="210" y="44" font-size="5.8" fill="#777">only the arc before it moves</text>
  <text x="210" y="58" font-size="5.8" fill="#777">(≈ 1/N of keys), not all</text>
  <text x="210" y="78" font-size="6.3" fill="#1f487e">virtual nodes →</text>
  <text x="210" y="92" font-size="5.8" fill="#777">each node = many ring points,</text>
  <text x="210" y="102" font-size="5.8" fill="#777">so load stays even</text>
</svg>

- One refinement makes it practical: **virtual nodes.** With only a few points on the ring, arcs are uneven and load is lumpy; worse, removing a node dumps its whole arc on one neighbour. So each physical node is hashed to **many** ring points (virtual nodes). Load then spreads smoothly, and a departing node's keys scatter across *many* survivors instead of crushing one.
- This is foundational infrastructure, not theory: **DynamoDB, Cassandra, and ScyllaDB** place data with consistent hashing; **memcached/Redis client libraries** use it so a cache node dying evicts only its share, not the whole cache; and it's how a service mesh or shard router keeps mappings stable as the fleet scales. "Why consistent hashing?" has exactly one answer in an interview: **minimal data movement when the node set changes.**
