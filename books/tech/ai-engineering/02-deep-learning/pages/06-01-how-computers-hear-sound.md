# Module 6 - Speech & Audio

## How computers hear sound

- Sound is a wave — air pressure rising and falling over time. A microphone measures that pressure many thousands of times a second and writes down each reading as a number.
- So to a computer, audio is just a long list of numbers: amplitude (how loud) at each instant. One second of speech is tens of thousands of numbers.
- That list is a 1-D signal, unlike an image's 2-D grid. The whole module is about turning it into something a network can learn from.

<svg viewBox="0 0 330 100" role="img" aria-label="A sound wave sampled at regular points, each point becoming a number in a list" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <line x1="20" y1="55" x2="230" y2="55" stroke="#c9d6e5"/>
  <path d="M20 55 Q45 15 70 55 T120 55 Q145 90 170 55 T230 55" stroke="#24405e" fill="none" stroke-width="1.5"/>
  <g fill="#c0392b"><circle cx="45" cy="35" r="2.5"/><circle cx="70" cy="55" r="2.5"/><circle cx="95" cy="35" r="2.5"/><circle cx="145" cy="75" r="2.5"/><circle cx="170" cy="55" r="2.5"/></g>
  <text x="125" y="99" text-anchor="middle" fill="#6b6b6b">samples: [0.0, 0.6, 0.9, 0.6, 0.0, −0.6, …]</text>
</svg>

:::note
Two hard facts shape everything: audio is **long** (far more numbers per second than an image has pixels) and it is **sequential** (order and timing carry the meaning). Both push audio work toward the same time-aware models — and, lately, the same transformers — used for language.
:::
