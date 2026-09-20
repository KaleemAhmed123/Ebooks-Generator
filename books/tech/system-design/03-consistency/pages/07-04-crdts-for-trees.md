## CRDTs for trees

- A Figma document is not a flat list of shapes. It is a tree. A `Frame` contains a `Group`, which contains a `Rectangle` and some `Text`. When multiple users edit this tree concurrently, Figma uses **CRDTs** (Conflict-Free Replicated Data Types) to ensure everyone's tree ends up looking exactly the same
- One of the hardest problems in a collaborative tree is **Ordering**. How do you ensure that "Layer 2" is always above "Layer 1"?

<svg viewBox="0 0 460 140" role="img" aria-label="Fractional indexing. Layer A is at 0. Layer B is at 1. To put Layer C between them, it gets index 0.5." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="34" text-anchor="middle">Layer A (Index: 0)</text>
  
  <rect x="50" y="100" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="114" text-anchor="middle">Layer B (Index: 1)</text>
  
  <rect x="250" y="60" width="100" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="300" y="74" text-anchor="middle" font-weight="bold">Layer C (Index: 0.5)</text>
  
  <path d="M130 30 L250 65" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <path d="M130 110 L250 75" stroke="#1a1a1a" fill="none" stroke-width="1" stroke-dasharray="2 2"/>
  <text x="190" y="60" text-anchor="middle" font-size="6">Insert between 0 and 1</text>
</svg>

- If you use integers for order, you run out of space. If Layer A is `1` and Layer B is `2`, and a user drags Layer C between them, what integer do you give it? You can't use `1.5` if they are integers. You would have to renumber everything below it (`2` becomes `3`, etc.), which would cause massive merge conflicts for other users
- **Fractional Indexing**: Figma gives every layer a fractional number (like `0.5`). If you insert between `0` and `1`, you get `0.5`. If you insert between `0.5` and `0.75`, you get `0.625`. You never have to renumber the other layers!

### The failure

- Integer order indexes causing infinite collisions. If you use integers (`position_index = position_index + 1`) to order items in a collaborative list, every time two users insert an item at the same time, they will generate the exact same integer, causing a collision that standard CRDTs cannot elegantly resolve
