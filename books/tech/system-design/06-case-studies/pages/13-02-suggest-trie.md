## Trie with precomputed top-k per node

- A **trie** is a tree with one node per prefix: the root is the empty string, each edge adds a character, and "app" is the node three edges down `a`, `p`, `p`. Every query that begins with "app" lives in that node's subtree, which is why the structure fits the problem
- The subtree is the problem too: the node for "a" has millions of descendants. So each node stores its own answer, the top 5 full queries in its subtree, filled once at build time (page 3). A lookup is a walk down the prefix and one array read

<svg viewBox="0 0 460 128" role="img" aria-label="A trie for the queries apple, app store, apply and apt. The root has a child a, which has a child ap, which has a child app; app has children apple, app store and apply. Under each node a small list shows its precomputed top 5: the root lists the five most searched queries overall; a lists apple, amazon, app store; ap lists apple, app store, apply, apt; app lists apple, app store, apply. A lookup for the prefix app walks three edges and reads the list at app: three steps and one array, no subtree walk. An orange cross marks the alternative, walking the subtree of a on each request: millions of nodes per keystroke." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="8" y="14" width="40" height="20" rx="3" fill="#fff" stroke="#333"/><text x="28" y="27" text-anchor="middle">root</text>
  <rect x="8" y="40" width="72" height="34" rx="2" fill="#e6f2ff" stroke="#333"/><text x="12" y="50" font-size="7">top 5: amazon,</text><text x="12" y="59" font-size="7">apple, app store,</text><text x="12" y="68" font-size="7">airbnb, adidas</text>
  <rect x="106" y="14" width="40" height="20" rx="3" fill="#fff" stroke="#333"/><text x="126" y="27" text-anchor="middle">a</text>
  <line x1="48" y1="24" x2="106" y2="24" stroke="#333" marker-end="url(#d)"/><text x="77" y="20" text-anchor="middle" font-size="7">a</text>
  <rect x="106" y="40" width="72" height="34" rx="2" fill="#e6f2ff" stroke="#333"/><text x="110" y="50" font-size="7">top 5: amazon,</text><text x="110" y="59" font-size="7">apple, app store,</text><text x="110" y="68" font-size="7">airbnb, adidas</text>
  <rect x="204" y="14" width="40" height="20" rx="3" fill="#fff" stroke="#333"/><text x="224" y="27" text-anchor="middle">ap</text>
  <line x1="146" y1="24" x2="204" y2="24" stroke="#333" marker-end="url(#d)"/><text x="175" y="20" text-anchor="middle" font-size="7">p</text>
  <rect x="204" y="40" width="72" height="34" rx="2" fill="#e6f2ff" stroke="#333"/><text x="208" y="50" font-size="7">top 5: apple,</text><text x="208" y="59" font-size="7">app store, apply,</text><text x="208" y="68" font-size="7">apt, apex</text>
  <rect x="302" y="14" width="40" height="20" rx="3" fill="#fff" stroke="#1d4e89" stroke-width="1.5"/><text x="322" y="27" text-anchor="middle">app</text>
  <line x1="244" y1="24" x2="302" y2="24" stroke="#333" marker-end="url(#d)"/><text x="273" y="20" text-anchor="middle" font-size="7">p</text>
  <rect x="302" y="40" width="72" height="34" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="306" y="50" font-size="7">top 5: apple,</text><text x="306" y="59" font-size="7">app store, apply,</text><text x="306" y="68" font-size="7">appointment, apps</text>
  <rect x="398" y="6" width="56" height="16" rx="3" fill="#fff" stroke="#333"/><text x="426" y="17" text-anchor="middle" font-size="7.5">apple</text>
  <rect x="398" y="28" width="56" height="16" rx="3" fill="#fff" stroke="#333"/><text x="426" y="39" text-anchor="middle" font-size="7.5">app store</text>
  <rect x="398" y="50" width="56" height="16" rx="3" fill="#fff" stroke="#333"/><text x="426" y="61" text-anchor="middle" font-size="7.5">apply</text>
  <line x1="342" y1="20" x2="398" y2="14" stroke="#333" marker-end="url(#d)"/><line x1="342" y1="26" x2="398" y2="36" stroke="#333" marker-end="url(#d)"/><line x1="342" y1="32" x2="398" y2="56" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="92" font-size="7.5" fill="#1d4e89">lookup "app": three edges, then read the list at app — no walk below it</text>
  <text x="6" y="106" font-size="7.5" fill="#bf4c28">✕ walking the subtree of "a" on each request: millions of nodes per keystroke, sorted 60 000 times a second</text>
  <text x="6" y="120" font-size="7">the lists are filled bottom-up once at build time: a node's top 5 is the merge of its children's lists plus its own query, cut to 5</text>
  <defs><marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker></defs>
</svg>

```typescript
type Node = { kids: Map<string, Node>; top: string[] };   // top: ≤ 5, set at build
function suggest(root: Node, prefix: string): string[] {
  let n = root;
  for (const ch of prefix) {
    const next = n.kids.get(ch);
    if (!next) return [];              // nothing starts with this prefix
    n = next;
  }
  return n.top;                        // O(prefix length); never walks below
}
```

- The cost moves to the build: each node's list is the merge of its children's lists plus its own query, cut to 5, computed bottom-up in one pass. Memory is the price, a list per node, which is why the trie is sharded by prefix (page 4) rather than kept whole

### The failure

- Computing the top 5 by walking the subtree per request. It is correct, it is what a first implementation does, and for the prefix "a" it visits millions of nodes and sorts their counts on every keystroke. The precomputed list turns that into one read; nothing else on this page matters as much
