## Word embeddings: the intuition

- An **embedding** is a dense vector — a few hundred real numbers — that stands in for a word, learned so that **similar meanings land near each other** in space.
- Instead of 50,000 isolated columns (one per word), every word becomes a point in, say, 300-dimensional space. *"cat"* and *"dog"* sit close; *"cat"* and *"democracy"* sit far.

### Where the meaning comes from

- The **distributional hypothesis** (Firth, 1957): *"You shall know a word by the company it keeps."*
- Words that appear in similar contexts probably mean similar things. *"I fed my ___"* is filled by *cat, dog, hamster* — so those words share context, so they end up near each other.
- No human labels meaning. The model reads a large corpus and lets **co-occurrence** place the points.

<svg viewBox="0 0 360 110" role="img" aria-label="A 2D map where cat, dog, kitten cluster together and king, queen cluster elsewhere" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="20" y1="95" x2="340" y2="95" stroke="#ccc"/><line x1="20" y1="95" x2="20" y2="10" stroke="#ccc"/>
  <circle cx="70" cy="35" r="3" fill="#24405e"/><text x="76" y="38">cat</text>
  <circle cx="95" cy="50" r="3" fill="#24405e"/><text x="101" y="53">dog</text>
  <circle cx="60" cy="55" r="3" fill="#24405e"/><text x="20" y="58" text-anchor="start">kitten</text>
  <circle cx="250" cy="30" r="3" fill="#1a3a2a"/><text x="256" y="33">king</text>
  <circle cx="275" cy="45" r="3" fill="#1a3a2a"/><text x="281" y="48">queen</text>
  <ellipse cx="78" cy="47" rx="42" ry="28" fill="none" stroke="#24405e" stroke-dasharray="3 2"/>
  <ellipse cx="262" cy="38" rx="38" ry="22" fill="none" stroke="#1a3a2a" stroke-dasharray="3 2"/>
  <text x="78" y="88" text-anchor="middle" fill="#6b6b6b">animals</text><text x="262" y="72" text-anchor="middle" fill="#6b6b6b">royalty</text>
</svg>

:::note
The payoff over counting: *"film"* and *"movie"* now sit near each other even though they share no letters. A model reading embeddings sees the similarity that a word-counter is blind to. This one change — dense, learned, shared space — is why everything after 2013 works.
:::
