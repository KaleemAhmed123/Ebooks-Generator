# Module 3 - Deep Learning Core

## What a neural network is

- A **neural network** is a function that turns input numbers into output numbers, built from many tiny, tunable steps.
- Each step multiplies its inputs by **weights** (numbers saying how much each input matters), adds them up, and passes the result through a simple bend. Stack enough steps and the function can mould itself to almost any pattern.
- **Learning** means adjusting the weights until the output matches the answers you showed it.

<svg viewBox="0 0 380 150" role="img" aria-label="A neural network with an input layer of three nodes, a hidden layer of four nodes, and an output layer of one node, fully connected" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g stroke="#c9d6e5"><path d="M60 40 L170 25M60 40 L170 60M60 40 L170 95M60 40 L170 130M60 75 L170 25M60 75 L170 60M60 75 L170 95M60 75 L170 130M60 110 L170 25M60 110 L170 60M60 110 L170 95M60 110 L170 130"/><path d="M170 25 L300 75M170 60 L300 75M170 95 L300 75M170 130 L300 75"/></g>
  <g fill="#24405e"><circle cx="60" cy="40" r="8"/><circle cx="60" cy="75" r="8"/><circle cx="60" cy="110" r="8"/></g>
  <g fill="#3d6ea5"><circle cx="170" cy="25" r="8"/><circle cx="170" cy="60" r="8"/><circle cx="170" cy="95" r="8"/><circle cx="170" cy="130" r="8"/></g>
  <circle cx="300" cy="75" r="8" fill="#1a3a2a"/>
  <text x="60" y="132" text-anchor="middle" fill="#6b6b6b">input</text>
  <text x="170" y="148" text-anchor="middle" fill="#6b6b6b">hidden</text>
  <text x="300" y="97" text-anchor="middle" fill="#6b6b6b">output</text>
</svg>

- Unlike classical ML, you no longer hand-design the features. The network discovers its own straight from raw data.

:::note
Depth is the whole idea. "Deep" learning just means many layers stacked. Early layers learn simple patterns; later layers combine those into complex ones. Nobody tells them what to learn — the weights sort it out during training.
:::
