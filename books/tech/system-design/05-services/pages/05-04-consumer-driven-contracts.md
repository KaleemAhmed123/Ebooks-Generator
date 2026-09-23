## Consumer-driven contract tests

- A provider cannot know which of its fields matter. `nickname` looks dead, and deleting it breaks a reporting job nobody in the room has heard of. **Consumer-driven contracts** invert the question: each consumer records what it actually reads, and the provider runs every consumer's recording in its own build

<svg viewBox="0 0 460 120" role="img" aria-label="Consumer-driven contracts. Three consumers, web checkout, mobile app and nightly reporting, each record only what they actually read. Their recordings become contract files: for example GET slash users slash 1 returns 200, needs id and nickname, ignores everything else. The provider's continuous integration build replays all three on every commit, so removing nickname turns the build red and the merge is blocked rather than the deploy failing. The provider learns which fields are load-bearing in CI rather than from a pager. An orange cross marks relying on the provider's own tests only: they go green on version two, and the consumer relying on an undocumented quirk finds out in production." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="6" y="13" font-size="7.5">each consumer records only what it reads</text>
  <rect x="6" y="20" width="100" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="56" y="32" text-anchor="middle" font-size="7.5">web checkout</text>
  <rect x="6" y="42" width="100" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="56" y="54" text-anchor="middle" font-size="7.5">mobile app</text>
  <rect x="6" y="64" width="100" height="18" rx="3" fill="#fff" stroke="#1d4e89"/><text x="56" y="76" text-anchor="middle" font-size="7.5">nightly reporting</text>
  <rect x="142" y="26" width="124" height="56" rx="3" fill="#e6f2ff" stroke="#333"/>
  <text x="204" y="40" text-anchor="middle" font-size="8">contract files</text>
  <text x="204" y="54" text-anchor="middle" font-size="7">GET /users/1 → 200</text>
  <text x="204" y="65" text-anchor="middle" font-size="7">needs: id, nickname</text>
  <text x="204" y="76" text-anchor="middle" font-size="7">ignores: everything else</text>
  <line x1="106" y1="29" x2="140" y2="44" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="106" y1="51" x2="140" y2="54" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="106" y1="73" x2="140" y2="64" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="302" y="26" width="152" height="56" rx="3" fill="#fff" stroke="#1d4e89"/>
  <text x="378" y="40" text-anchor="middle" font-size="8">provider CI</text>
  <text x="378" y="54" text-anchor="middle" font-size="7">replays all three every commit</text>
  <text x="378" y="65" text-anchor="middle" font-size="7" fill="#bf4c28">removing nickname → build red</text>
  <text x="378" y="76" text-anchor="middle" font-size="7">the merge is blocked, not the deploy</text>
  <line x1="266" y1="54" x2="300" y2="54" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="6" y="98" font-size="7">the provider learns which fields are load-bearing without asking, and learns it in CI rather than from a pager</text>
  <text x="6" y="113" font-size="7.5" fill="#bf4c28">✕ provider tests only: green on v2, and the consumer relying on an undocumented quirk finds out in production</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The recording is a file, not a running consumer, so the provider's build stays fast and needs no live downstream. Pact is the common tool; the shape matters more than the tool
- What makes it work is that a red build blocks a merge. A contract test that only warns is a changelog with extra steps

### The failure

- Contracts recorded from the consumer's mocks rather than its real calls. The mock says the consumer reads `id` and `nickname`; the actual code reads `email` too, through a code path the mock never exercises. The provider deletes `email` with a green build
- The recording has to come from the consumer's own test suite exercising its own code, or it certifies the mock instead of the consumer
