## Deadlock

Two transactions each holding a lock the other needs. Postgres detects the cycle
and kills one of them.

<svg viewBox="0 0 460 72" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Transaction A holds row one and waits for row two while transaction B holds row two and waits for row one, forming a cycle Postgres detects and breaks">
  <rect x="4" y="8" width="150" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="79" y="23" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">A: lock(1), wants(2)</text>
  <rect x="4" y="42" width="150" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="79" y="57" text-anchor="middle" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">B: lock(2), wants(1)</text>
  <path d="M158 19 H186 V53 H158" stroke="#b32d2b" stroke-width="1.3" fill="none"/>
  <path d="M158 53 l6 -3.5 v7 z" fill="#b32d2b"/>
  <text x="198" y="28" font-family="Georgia,serif" font-size="9.5" fill="#b32d2b">a cycle — neither can proceed</text>
  <text x="198" y="46" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">Postgres aborts one transaction</text>
  <text x="198" y="62" font-family="Georgia,serif" font-size="9.5" fill="#2a5673">fix: acquire locks in a consistent order</text>
</svg>

Sorting the rows you are about to lock — by primary key, always the same way —
removes the cycle entirely. It is a two-line fix that is invisible until the
first deadlock, and impossible to retrofit under pressure.

## Embed vs Reference

Embed when data is read together, bounded and owned by the parent. Reference
when it is shared, unbounded, or updated on its own schedule.

Embedding comments in a post works beautifully until one post has fifty thousand
of them, the document approaches MongoDB's 16MB limit, and every new comment
rewrites the whole thing.

| Embed if | Reference if |
|---|---|
| read together | shared across parents |
| bounded, one-to-few | unbounded, one-to-many |
| owned by the parent | independently updated |

**The 16MB document cap is a hard wall**, not a guideline, and the growth that
reaches it is usually the growth that means the product is working.
