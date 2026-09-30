## Train, validation, test

- A model that is graded on the data it studied will look brilliant and fail in the real world. To measure honestly, you split the data into three parts and keep them apart.

<svg viewBox="0 0 340 60" role="img" aria-label="A dataset bar split into a large training portion, a small validation portion, and a small test portion" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="10" y="20" width="200" height="24" fill="#e8f4fd" stroke="#24405e"/><text x="110" y="36" text-anchor="middle">training (~70%)</text>
  <rect x="210" y="20" width="60" height="24" fill="#eafaf0" stroke="#1a3a2a"/><text x="240" y="36" text-anchor="middle">val (15%)</text>
  <rect x="270" y="20" width="60" height="24" fill="#1a3a2a"/><text x="300" y="36" text-anchor="middle" fill="#fff">test (15%)</text>
</svg>

- **Training set** — the model learns its weights here.
- **Validation set** — you tune choices here (which model, which settings). The model never learns from it, but you do.
- **Test set** — touched **once**, at the very end, to report the honest final score. It stands in for data the model has never seen.

:::warn
The test set is sacred. Peek at it to guide decisions and it silently becomes a second validation set — your reported number no longer reflects reality. If you look at it more than once, you have leaked it. Lock it away until the end.
:::

:::note
For data with time order (prices, logs), never split randomly — train on the past and test on the future. A random split lets the model peek at tomorrow to predict today, which it can never do live.
:::
