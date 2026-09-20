## Raft: why the new leader has everything

- The guarantee: any entry committed in a term is in the log of every leader of every later term. Raft gets it from two rules, both cheap
- **Election restriction.** A `RequestVote` carries the candidate's last log index and term. A node refuses its vote to a candidate whose log is less up to date than its own: lower last term, or same last term and shorter log. A committed entry is on a majority; a candidate needs a majority of votes; the two majorities overlap (page 10), so at least one voter would refuse any candidate missing it
- **Commit by counting only in the current term.** A leader counts replicas to commit only entries from its own term. Older-term entries become committed indirectly, when a current-term entry after them commits

<svg viewBox="0 0 460 120" role="img" aria-label="Raft figure 8 simplified. Server S1 leads term 2 and replicates entry 2 to S2 only, then crashes. S5 wins term 3 with votes from S3 and S4, appends its own entry at index 2, crashes. S1 returns as leader of term 4 and replicates the term-2 entry at index 2 to S3: now on a majority, but not safe, because S5 can still win term 5 with votes from S2, S3, S4 and overwrite index 2 everywhere. Only after S1 commits a term-4 entry at index 3 is index 2 safe." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <g font-size="7">
    <text x="10" y="26">a) term 4</text>
    <text x="10" y="35">S1 leads</text>
    <text x="72" y="14">S1</text><rect x="70" y="18" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="81" y="27" text-anchor="middle">1</text><rect x="94" y="18" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="105" y="27" text-anchor="middle">t2</text>
    <text x="72" y="44">S2</text><rect x="70" y="48" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="81" y="57" text-anchor="middle">1</text><rect x="94" y="48" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="105" y="57" text-anchor="middle">t2</text>
    <text x="72" y="74">S3</text><rect x="70" y="78" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="81" y="87" text-anchor="middle">1</text><rect x="94" y="78" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="105" y="87" text-anchor="middle">t2</text>
    <text x="72" y="104">S5</text><rect x="70" y="108" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="81" y="117" text-anchor="middle">1</text><rect x="94" y="108" width="22" height="12" fill="#fce4e2" stroke="#b8541a"/><text x="105" y="117" text-anchor="middle">t3</text>
    <text x="126" y="57">t2 entry now on S1, S2, S3: a majority</text>
    <text x="126" y="66" fill="#b8541a">but S5 (last term 3 &gt; 2) can still win term 5</text>
    <text x="126" y="75" fill="#b8541a">with S2, S3, S4's votes and overwrite it</text>
    <text x="126" y="117">S5 kept its own t3 entry at index 2; S4 has index 1 only</text>
    <text x="300" y="26">b) S1 appends a term-4 entry</text>
    <text x="300" y="35">and it reaches a majority</text>
    <rect x="300" y="44" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="311" y="53" text-anchor="middle">1</text><rect x="324" y="44" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="335" y="53" text-anchor="middle">t2</text><rect x="348" y="44" width="22" height="12" fill="#e2fcf3" stroke="#1d4e89"/><text x="359" y="53" text-anchor="middle">t4</text>
    <text x="300" y="75">now no candidate without t4 can win:</text>
    <text x="300" y="84">every voter holding t4 refuses it, and t4</text>
    <text x="300" y="93">is on a majority. Index 2 and 3 are safe</text>
  </g>
</svg>

- The lesson is that "on a majority" is necessary but not sufficient for an old-term entry. A new leader therefore commits a no-op entry of its own term at once, which pulls everything before it into the committed range and lets it answer reads (page 7)

### The failure

- An implementation that commits any entry once it counts a majority, whatever its term. It passes every test where leaders die once. It loses committed data in the two-crash sequence above, which is the case the paper's Figure 8 exists to show
