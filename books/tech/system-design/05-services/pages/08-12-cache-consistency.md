## What "consistent" means for a cache

- A cache is eventually consistent by design, and a TTL is a promise about how eventual. One guarantee is not negotiable regardless: **read-your-writes** — whoever made the change sees it on their very next read

<svg viewBox="0 0 460 96" role="img" aria-label="Two invalidation timings compared. With a synchronous invalidate, the write commits to the database, the key is deleted, and only then does the API return 200 OK, so the user's refresh reads the fresh value. With an asynchronous invalidate, the write commits and the API returns 200 OK immediately, the user refreshes 200 milliseconds later and reads a stale value, and the delete only arrives a second after that. The asynchronous path is correct for every other reader and wrong for the person who just clicked save. An orange cross marks the consequence: they see the old value, assume the save failed, and click save again." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="12" font-size="7.5" fill="#1d4e89">invalidate before responding, and the writer's own next read is correct</text>
  <text x="4" y="31" font-size="6.5">sync</text>
  <rect x="40" y="22" width="68" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="74" y="31" text-anchor="middle" font-size="6">write DB</text>
  <rect x="114" y="22" width="68" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="148" y="31" text-anchor="middle" font-size="6">delete key</text>
  <rect x="188" y="22" width="68" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="222" y="31" text-anchor="middle" font-size="6">200 OK</text>
  <rect x="300" y="22" width="120" height="12" rx="2" fill="#e6f2ff" stroke="#1d4e89"/><text x="360" y="31" text-anchor="middle" font-size="6">refresh → fresh value</text>
  <text x="4" y="59" font-size="6.5">async</text>
  <rect x="40" y="50" width="68" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="74" y="59" text-anchor="middle" font-size="6">write DB</text>
  <rect x="114" y="50" width="68" height="12" rx="2" fill="#fff" stroke="#1d4e89"/><text x="148" y="59" text-anchor="middle" font-size="6">200 OK</text>
  <rect x="200" y="50" width="120" height="12" rx="2" fill="#fbe9e2" stroke="#bf4c28"/><text x="260" y="59" text-anchor="middle" font-size="6" fill="#bf4c28">refresh at 200 ms → stale</text>
  <rect x="330" y="50" width="120" height="12" rx="2" fill="#fff" stroke="#999"/><text x="390" y="59" text-anchor="middle" font-size="6" fill="#666">delete arrives at 1 s</text>
  <text x="4" y="78" font-size="7">the asynchronous path is right for every other reader and wrong for the one person who just clicked save</text>
  <text x="4" y="91" font-size="7.5" fill="#bf4c28">✕ they see the old value, conclude the save failed, and click save again — now there are two</text>
</svg>

- The resolution is that the two paths are not alternatives. The synchronous delete runs on the request that made the change, before responding, and the commit-log path (page 6) runs underneath for everything the request handler might have missed or crashed before finishing
- Where a synchronous delete is impossible, the client can carry a version. It receives an `ETag` or a version number when it writes, sends it on the next read, and the server bypasses the cache when the cached copy is older — correctness for the one caller who needs it, at no cost to the rest

### The failure

- Relying on asynchronous invalidation alone for the writer's own read. The user's refresh is measured in a few hundred milliseconds and the commit-log path in roughly a second, so the stale read is not a rare race — it is what usually happens
- The user-visible result is a duplicate, because the reasonable response to a save that appears not to have worked is to save again. A read-your-writes violation on a form becomes a data problem, and it is invisible to every metric: both writes succeeded, latency was fine, and nothing errored
