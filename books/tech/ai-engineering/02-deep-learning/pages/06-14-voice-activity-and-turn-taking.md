## Voice activity and turn-taking

- **Voice activity detection (VAD)** answers a simple, constant question: is someone speaking right now? It gates everything downstream so the system does not transcribe or respond to silence and noise.
- It is a lightweight binary classifier over short audio frames (speech / not-speech), cheap enough to run continuously on any device.
- **Turn-taking** is the harder, human part: knowing *when the user has finished* so the assistant can reply — without cutting them off mid-thought or leaving an awkward gap.

<svg viewBox="0 0 320 80" role="img" aria-label="An audio stream marked into speech and silence regions, with an endpoint detected where the user stops talking" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="10" y="30" width="70" height="20" fill="#24405e" fill-opacity="0.8"/><rect x="80" y="30" width="30" height="20" fill="#e8f4fd" stroke="#c9d6e5"/><rect x="110" y="30" width="60" height="20" fill="#24405e" fill-opacity="0.8"/><rect x="170" y="30" width="60" height="20" fill="#e8f4fd" stroke="#c9d6e5"/>
  <text x="45" y="44" text-anchor="middle" fill="#fff" font-size="7">speech</text><text x="140" y="44" text-anchor="middle" fill="#fff" font-size="7">speech</text><text x="95" y="66" text-anchor="middle" fill="#6b6b6b">pause</text>
  <line x1="230" y1="24" x2="230" y2="56" stroke="#c0392b" stroke-width="2"/><text x="270" y="44" fill="#c0392b">turn end?</text>
</svg>

:::warn
A silence timer alone gets turn-taking wrong. Too short and it interrupts the natural pauses in "I want… the blue one"; too long and the assistant feels sluggish. Good systems read prosody and grammar — a rising, unfinished intonation means *keep waiting* — not just the length of the gap.
:::
