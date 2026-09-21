## Ranking stage

- A ranked feed is not a different architecture. Retrieval (pages 3 and 4) still produces the candidates; ranking is a stage after it. X's open-sourced `the-algorithm` names the stages for its home timeline: candidate sources, a light ranker inside the retrieval index, a heavy ranker, then filters and mixing

<svg viewBox="0 0 460 134" role="img" aria-label="The ranking funnel. Two candidate sources on the left: in-network posts from Earlybird, about 50 percent of what is shown per X's README, and out-of-network sources. Together, say 1 000 candidates, flow into the light ranker, cheap, a few features, run inside the index, which passes the top few hundred to the heavy ranker, a neural net, one inference per candidate, which passes its top to filters and mixing, removing seen, blocked and duplicate posts and inserting ads, producing 20 posts. Each stage sees fewer items and spends more per item. An orange cross marks running the heavy ranker on all 1 000 candidates: 1 000 times 2 milliseconds is 2 seconds inside a budget of a few hundred milliseconds." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="14" width="96" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="54" y="26" text-anchor="middle" font-size="7.5">in-network (Earlybird)</text><text x="54" y="37" text-anchor="middle" font-size="7">≈ 50 % of posts shown</text>
  <rect x="6" y="58" width="96" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="54" y="70" text-anchor="middle" font-size="7.5">out-of-network</text><text x="54" y="81" text-anchor="middle" font-size="7">sources</text>
  <rect x="128" y="30" width="90" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="173" y="43" text-anchor="middle">light ranker</text><text x="173" y="55" text-anchor="middle" font-size="7">few features, in the</text><text x="173" y="65" text-anchor="middle" font-size="7">index; cheap per item</text>
  <line x1="102" y1="29" x2="128" y2="42" stroke="#333" marker-end="url(#d)"/>
  <line x1="102" y1="73" x2="128" y2="62" stroke="#333" marker-end="url(#d)"/>
  <text x="115" y="100" text-anchor="middle" font-size="7">say 1 000</text>
  <rect x="250" y="30" width="90" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="295" y="43" text-anchor="middle">heavy ranker</text><text x="295" y="55" text-anchor="middle" font-size="7">neural net, one</text><text x="295" y="65" text-anchor="middle" font-size="7">inference per item</text>
  <line x1="218" y1="52" x2="250" y2="52" stroke="#333" marker-end="url(#d)"/><text x="234" y="26" text-anchor="middle" font-size="7">top few hundred</text>
  <rect x="364" y="30" width="90" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="409" y="43" text-anchor="middle">filters · mixing</text><text x="409" y="55" text-anchor="middle" font-size="7">seen, blocked, dupes;</text><text x="409" y="65" text-anchor="middle" font-size="7">ads inserted → 20 posts</text>
  <line x1="340" y1="52" x2="364" y2="52" stroke="#333" marker-end="url(#d)"/>
  <text x="6" y="112" font-size="7.5">each stage: fewer items, more spent per item; the light ranker exists to make the heavy one affordable</text>
  <text x="6" y="126" font-size="7.5" fill="#bf4c28">✕ heavy ranker on all 1 000: 1 000 × 2 ms = 2 s of inference inside a budget of a few hundred ms</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
  </defs>
</svg>

- In-network candidates, the posts of followed accounts, are about half of what X's home timeline shows, per its README; the rest is retrieved from out-of-network sources. That is the difference between a chronological and a ranked feed: retrieval widens, ranking chooses
- Each stage is cheaper per item than the next and sees fewer items. The light ranker scores every candidate on a handful of features, inside the index that found them; the heavy model scores the survivors on hundreds. The budget per page is fixed, and the funnel spends it where the model can still change the order
- On the whiteboard, ranking is one box after the merge (page 4), with the counts on its arrows. The interviewer is checking that it sits after retrieval, not instead of it, and that the counts shrink left to right

### The failure

- The heavy model on every candidate. One neural inference per candidate, 1 000 candidates at, say, 2 ms each, is 2 s of compute per feed inside a budget of a few hundred milliseconds. Without the light ranker the design is a demo that works for one user
