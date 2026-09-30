## Tree DP <span class="lv lv2"></span>

- **What:** compute each subtree's answer from its children's answers, returned in **post-order**. When a parent–child constraint exists, return **two values** per node — best if this node is used, best if it is not
- **Spot it:** "no two adjacent nodes", "max/min over a tree with a parent-child rule", "cameras / cover the tree", "subtree sum or count", "longest path" (14-03)
- **Why:** a subtree's best depends only on its children's bests, so one post-order pass settles the whole tree. Returning a small tuple `(use, skip)` lets the parent combine in O(1) without re-descending

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="House Robber III on a tree rooted at 3 with children 2 and 3, and grandchildren 3 under the left 2 and 1 under the right 3. Each node returns a pair: rob this node equals its value plus both children's skip values; skip this node equals the sum of each child's better option. The root's answer is max of its rob 7 and skip 6, giving 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .pair { font: 8px Consolas, monospace; fill: #1d4e89; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <line class="e" x1="112" y1="30" x2="70" y2="66"/><line class="e" x1="128" y1="30" x2="180" y2="66"/>
  <line class="e" x1="70" y1="90" x2="70" y2="66" stroke="none"/>
  <line class="e" x1="66" y1="90" x2="66" y2="70"/><line class="e" x1="184" y1="90" x2="184" y2="70"/>
  <circle class="n" cx="120" cy="24" r="14"/><text x="120" y="28" class="lb" text-anchor="middle">3</text>
  <circle class="n" cx="66" cy="66" r="14"/><text x="66" y="70" class="lb" text-anchor="middle">2</text>
  <circle class="n" cx="184" cy="66" r="14"/><text x="184" y="70" class="lb" text-anchor="middle">3</text>
  <circle class="n" cx="66" cy="104" r="13"/><text x="66" y="108" class="lb" text-anchor="middle">3</text>
  <circle class="n" cx="184" cy="104" r="13"/><text x="184" y="108" class="lb" text-anchor="middle">1</text>
  <text x="86" y="104" class="pair">(3, 0)</text>
  <text x="204" y="104" class="pair">(1, 0)</text>
  <text x="4" y="60" class="pair">(2, 3)</text>
  <text x="204" y="60" class="pair">(3, 1)</text>
  <text x="140" y="20" class="pair">(7, 6)</text>
  <text x="250" y="40" class="sm">pair = (rob node, skip node)</text>
  <text x="250" y="58" class="sm">rob = val + left.skip + right.skip</text>
  <text x="250" y="76" class="sm">skip = max(left) + max(right)</text>
  <text x="250" y="100" class="lb" fill="#2d6a4f">answer = max(root) = 7</text>
</svg>
:::

```ts
class TreeNode { val: number; left: TreeNode | null = null; right: TreeNode | null = null;
  constructor(v: number) { this.val = v; } }
```

```ts
// House Robber III (LeetCode 337): no two directly-linked nodes both robbed
function robTree(root: TreeNode | null): number {
  const dfs = (node: TreeNode | null): [number, number] => {  // [rob node, skip node]
    if (!node) return [0, 0];
    const [lr, ls] = dfs(node.left);                          // post-order: children first
    const [rr, rs] = dfs(node.right);
    const rob = node.val + ls + rs;                           // rob → children must be skipped
    const skip = Math.max(lr, ls) + Math.max(rr, rs);         // skip → each child takes its best
    return [rob, skip];
  };
  return Math.max(...dfs(root));
}
```

- **Watch out:** returning a single number forces the parent to re-ask "did the child use itself?" — carry both cases in the tuple instead. The work must be **post-order**: compute children before the node. For "record vs return" (diameter, max path sum, where the answer is not what you return upward) see 14-03
