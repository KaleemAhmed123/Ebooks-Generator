## Conflicts

- Every commit names the version it was based on. The server accepts a commit only if that base is still the current version, so two devices editing the same v1 offline cannot both win: the first commit makes v2, the second is rejected, and the rejected client saves its content as a new file beside the original, the "conflicted copy". Nobody's work is merged and nobody's is lost

<svg viewBox="0 0 460 142" role="img" aria-label="Three lanes: device A, server, device B. Both devices hold version 1. A commits with base v1 and the server accepts it as v2. B, offline meanwhile, commits with base v1; the server rejects it because the current version is v2. B's client saves its content as a new path, report (B's conflicted copy), and commits that as a new file, which then syncs to A as well. On the right, an orange cross: last-writer-wins by client clock, B's clock an hour ahead, B overwrites v2 and A's afternoon is gone." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g font-size="7.5"><text x="6" y="34">device A</text><text x="6" y="76">server</text><text x="6" y="118">device B</text></g>
  <g stroke="#999" stroke-dasharray="2 3"><line x1="50" y1="30" x2="330" y2="30"/><line x1="50" y1="72" x2="330" y2="72"/><line x1="50" y1="114" x2="330" y2="114"/></g>
  <text x="56" y="26" font-size="7">has v1, edits</text><text x="56" y="110" font-size="7">has v1, edits offline</text>
  <line x1="110" y1="30" x2="110" y2="72" stroke="#333" marker-end="url(#d)"/><text x="114" y="46" font-size="7">commit, base v1</text>
  <rect x="96" y="64" width="28" height="16" rx="2" fill="#e6f2ff" stroke="#333"/><text x="110" y="75" text-anchor="middle" font-size="7">v2</text><text x="114" y="60" font-size="7" fill="#1d4e89">accepted</text>
  <line x1="200" y1="114" x2="200" y2="72" stroke="#333" marker-end="url(#d)"/><text x="204" y="100" font-size="7">commit, base v1</text>
  <text x="204" y="82" font-size="7" fill="#bf4c28">rejected: current is v2</text>
  <line x1="200" y1="72" x2="200" y2="114" stroke="#bf4c28" stroke-dasharray="3 3"/>
  <text x="206" y="126" font-size="7">save as "report (B's conflicted copy)",</text><text x="206" y="135" font-size="7">a new path, and commit that</text>
  <line x1="276" y1="114" x2="276" y2="72" stroke="#333" marker-end="url(#d)"/><text x="280" y="100" font-size="7">commit new file</text>
  <rect x="256" y="64" width="40" height="16" rx="2" fill="#e6f2ff" stroke="#333"/><text x="276" y="75" text-anchor="middle" font-size="7">v2 + copy</text>
  <line x1="290" y1="64" x2="290" y2="30" stroke="#333" marker-end="url(#d)"/><text x="294" y="48" font-size="7">both sync to A</text>
  <rect x="344" y="18" width="110" height="104" rx="3" fill="#fbe9e2" stroke="#bf4c28"/>
  <text x="399" y="34" text-anchor="middle" font-size="7.5" fill="#bf4c28">✕ last writer wins</text>
  <text x="399" y="48" text-anchor="middle" font-size="7" fill="#bf4c28">by client clock</text>
  <text x="399" y="64" text-anchor="middle" font-size="7">B's clock is an hour ahead</text>
  <text x="399" y="76" text-anchor="middle" font-size="7">→ B's stale v1 edit overwrites</text>
  <text x="399" y="88" text-anchor="middle" font-size="7">A's v2 without a trace</text>
  <text x="399" y="104" text-anchor="middle" font-size="7">A's afternoon is gone, and</text>
  <text x="399" y="114" text-anchor="middle" font-size="7">nothing in the system says so</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
  </defs>
</svg>

- The base version is a server sequence per file, not a client clock: the server assigns v2, and "based on v1" is a fact the client copied from the server, so no skew can fake it. A **version vector**, one counter per device, gives the same answer for peer-to-peer sync without a server in the middle; booklet 03 owns both and the reasoning behind them
- Files are opaque bytes here, so no merge is possible; merging is what Module 18 does for a document it understands

:::interview
"Two devices edit the same file offline. What happens when they reconnect?" — Each commit carries the version it started from. The first one in becomes the new version; the second is rejected because its base is stale, and the client saves its content as a conflicted copy next to the original. Then what they listen for: the version is a server-assigned sequence, never a client timestamp, and a silent merge is never on offer.
:::

### The failure

- Last writer wins on the client's clock. A laptop an hour ahead overwrites a colleague's afternoon, the version history shows one clean save, and the loss is discovered a week later from memory. LWW is the right answer for a position update (Module 8); for a file it is data loss with a policy name
