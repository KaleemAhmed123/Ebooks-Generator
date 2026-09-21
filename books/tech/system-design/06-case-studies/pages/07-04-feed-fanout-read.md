## Fan-out on read and the hybrid

- Pull at read time is the opposite: no lists. `GET /feed` reads the latest posts of each of the 200 followees and merges them, O(followees) per open, at 100 opens per post. Pure pull loses on the ratio; pure push loses on the celebrity (page 3). The hybrid does both, split by follower count

<svg viewBox="0 0 460 172" role="img" aria-label="The hybrid feed. Write path on the left: a new post goes to a decision, followers below the threshold, say 100 000. Yes: the fan-out queue pushes the id into 200 feed lists. No: the post is written once to the author's recent-posts cache. Read path on the right: GET /feed at 50 000 a second hits the feed service, which does one read of the user's 800-id feed list, looks up which celebrities the user follows in the follows store, pulls their recent posts, merges the two id lists by id, keeps the top 20 and hydrates. Below: Twitter 2012, from its QCon talk, about 300 000 timeline reads a second, 150 million users, an 800-entry cap. An orange cross marks pull for everyone: 200 lookups per open times 50 000 a second is 10 million lookups a second, with the p99 set by the slowest shard." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="16" width="54" height="22" rx="3" fill="#fff" stroke="#333"/><text x="33" y="30" text-anchor="middle">new post</text>
  <rect x="6" y="54" width="92" height="30" rx="3" fill="#fff" stroke="#333"/><text x="52" y="66" text-anchor="middle" font-size="7.5">followers &lt; threshold?</text><text x="52" y="77" text-anchor="middle" font-size="7">say 100 000</text>
  <line x1="33" y1="38" x2="33" y2="54" stroke="#333" marker-end="url(#d)"/>
  <rect x="6" y="110" width="92" height="30" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="52" y="122" text-anchor="middle" font-size="7.5">fan-out queue</text><text x="52" y="133" text-anchor="middle" font-size="7">→ 200 lists (page 3)</text>
  <line x1="52" y1="84" x2="52" y2="110" stroke="#333" marker-end="url(#d)"/><text x="56" y="100" font-size="7">yes: push</text>
  <rect x="120" y="110" width="80" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="160" y="122" text-anchor="middle" font-size="7.5">feed:{user}</text><text x="160" y="133" text-anchor="middle" font-size="7">800 ids</text>
  <line x1="98" y1="125" x2="120" y2="125" stroke="#333" marker-end="url(#d)"/>
  <rect x="222" y="110" width="84" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="264" y="122" text-anchor="middle" font-size="7.5">recent posts</text><text x="264" y="133" text-anchor="middle" font-size="7">per celebrity</text>
  <line x1="98" y1="69" x2="240" y2="110" stroke="#333" marker-end="url(#d)"/><text x="150" y="84" font-size="7">no: write once</text>
  <rect x="328" y="110" width="126" height="30" rx="3" fill="#e6f2ff" stroke="#333"/><text x="391" y="122" text-anchor="middle" font-size="7.5">follows</text><text x="391" y="133" text-anchor="middle" font-size="7">(follower → followees)</text>
  <rect x="250" y="10" width="110" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="305" y="22" text-anchor="middle">feed service</text><text x="305" y="34" text-anchor="middle" font-size="7.5">merge 2 id lists by id</text><text x="305" y="45" text-anchor="middle" font-size="7.5">top 20 → hydrate</text>
  <rect x="396" y="18" width="58" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="425" y="33" text-anchor="middle">GET /feed</text>
  <line x1="396" y1="30" x2="360" y2="30" stroke="#1d4e89" marker-end="url(#b)"/><text x="378" y="25" text-anchor="middle" font-size="7" fill="#1d4e89">50 000/s</text>
  <line x1="270" y1="50" x2="172" y2="110" stroke="#1d4e89" marker-end="url(#b)"/><text x="200" y="76" font-size="7" fill="#1d4e89">1 read</text>
  <line x1="292" y1="50" x2="270" y2="110" stroke="#1d4e89" marker-end="url(#b)"/><text x="284" y="86" font-size="7" fill="#1d4e89">pull</text>
  <line x1="330" y1="50" x2="372" y2="110" stroke="#1d4e89" marker-end="url(#b)"/><text x="356" y="76" font-size="7" fill="#1d4e89">celebrities followed</text>
  <text x="6" y="154" font-size="7.5">Twitter 2012, QCon talk: ≈ 300 000 timeline reads/s, 150 M users, 800-entry cap</text>
  <text x="6" y="166" font-size="7.5" fill="#bf4c28">✕ pull for everyone: 200 lookups per open × 50 000/s = 10 M lookups/s, p99 = the slowest shard</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The threshold is mechanical and measured: an account crossing it is switched by a job, and readers cannot tell, because both paths end in the same merge. A celebrity's post is written once and pulled by readers; everyone else's is pushed
- The merge is two id-sorted lists, merged in memory, top 20 kept. Per read: one list fetch plus one lookup per followed celebrity, which for most users is a handful

:::interview
"Fan-out on write or on read?" — Both, split by follower count. Write for the many: push the id into each follower's cached list at post time, so a read is one fetch. Read for the few: an account above the threshold is pulled at read time from its own recent-posts cache and merged in, because pushing to millions of lists per post would stall the queue for everyone. Then name the constant: the threshold is a follower count, measured and moved by a job, not a badge.
:::

### The failure

- Pull for everyone. Every open becomes 200 lookups and a merge, 50 000 times a second: 10 M lookups a second to build a page that push had ready as one read. And the p99 of a fan-in over 200 shards is the slowest shard's
