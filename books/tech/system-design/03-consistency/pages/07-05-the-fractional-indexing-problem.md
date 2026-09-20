## The fractional indexing problem

- Fractional indexing solves the renumbering problem, but it creates a new one: what if two users insert an item between `0` and `1` at the exact same millisecond?
- User A's browser calculates `0.5` and assigns it to the new Rectangle. User B's browser also calculates `0.5` and assigns it to their new Circle. When the actions reach the server, both nodes have the exact same index

```typescript
// How Figma resolves exact index collisions
function sortLayers(nodeA, nodeB) {
  // 1. Sort by their fractional index
  if (nodeA.fractionalIndex !== nodeB.fractionalIndex) {
    return nodeA.fractionalIndex - nodeB.fractionalIndex;
  }
  
  // 2. Collision! Both have index 0.5. 
  // Fall back to a deterministic tie-breaker: Peer ID
  // Every client has a unique random session ID.
  if (nodeA.peerId > nodeB.peerId) {
    return 1;
  } else {
    return -1;
  }
}
```

- **Deterministic Tie-Breaking**: CRDTs don't care *who* wins the tie, as long as *everyone agrees* who won. By falling back to the unique Peer ID (which is randomly assigned to the browser session when it connects), every single browser sorting the tree will place the Circle above the Rectangle. The data converges perfectly

### The failure

- Crashing because two nodes have the exact same index. If your code assumes that `fractionalIndex` is perfectly unique, a concurrent insertion will cause your rendering engine to crash or behave unpredictably. You must always have a secondary, globally unique tie-breaker like a timestamp or UUID
