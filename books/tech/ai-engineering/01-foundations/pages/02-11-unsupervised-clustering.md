## Clustering: learning without labels

- **Clustering** groups data by similarity when you have no labels — the machine finds the structure itself.
- Uses: customer segments, grouping similar documents, spotting natural categories before you know what they are.

### The two you will meet first

- **k-means** — you pick the number of groups `k`; it places `k` centres, assigns each point to its nearest centre, moves each centre to the middle of its points, and repeats until stable.
- **DBSCAN** — no need to pick `k`; it grows clusters from dense regions and labels sparse points as noise. It finds oddly-shaped clusters that k-means cannot.

<svg viewBox="0 0 300 96" role="img" aria-label="k-means finds three round clusters each with a central marker" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <circle cx="60" cy="40" r="3" fill="#24405e"/><circle cx="75" cy="30" r="3" fill="#24405e"/><circle cx="70" cy="52" r="3" fill="#24405e"/><path d="M63 36 l8 8 M71 36 l-8 8" stroke="#c0392b"/>
  <circle cx="160" cy="60" r="3" fill="#1a3a2a"/><circle cx="175" cy="70" r="3" fill="#1a3a2a"/><circle cx="150" cy="72" r="3" fill="#1a3a2a"/><path d="M158 62 l8 8 M166 62 l-8 8" stroke="#c0392b"/>
  <circle cx="240" cy="35" r="3" fill="#7d97b8"/><circle cx="255" cy="45" r="3" fill="#7d97b8"/><circle cx="235" cy="50" r="3" fill="#7d97b8"/><path d="M241 39 l8 8 M249 39 l-8 8" stroke="#c0392b"/>
  <text x="150" y="92" text-anchor="middle" fill="#6b6b6b">✕ = cluster centre</text>
</svg>

:::warn
k-means assumes round, similar-sized clusters and forces every point into one, including outliers. It also gives a different answer depending on where the centres start. Run it several times and keep the best, and do not trust it on elongated or nested shapes — use DBSCAN there.
:::
