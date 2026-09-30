## Time series

- **Time-series data** has order: each point comes at a time, and the sequence carries the signal. Prices, server load, demand, sensor readings.
- The rules change because the past predicts the future, and the points are not independent — the assumption most other models rest on.

### The core ideas

- **Trend and seasonality** — a long-term direction plus repeating cycles (daily traffic, yearly sales). Good models separate the two.
- **Stationarity** — whether the statistics (mean, variance) stay constant over time. Many classical methods require it; you often **difference** the data (model change instead of level) to get there.
- **Autocorrelation** — how strongly a value relates to its own recent past. This is the raw material a forecaster learns from.
- **ARIMA** is the classical workhorse, combining these into one forecasting model.

<svg viewBox="0 0 300 74" role="img" aria-label="A rising, wavy time series with a dashed forecast continuing the pattern into the future" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <line x1="20" y1="60" x2="285" y2="60" stroke="#1a1a1a"/>
  <path d="M25 55 Q50 35 75 45 Q100 20 125 35 Q150 15 175 28" fill="none" stroke="#24405e" stroke-width="2"/>
  <path d="M175 28 Q200 10 225 22 Q250 5 275 16" fill="none" stroke="#c0392b" stroke-width="2" stroke-dasharray="4 2"/>
  <text x="120" y="70" fill="#24405e">observed</text><text x="230" y="42" fill="#c0392b">forecast</text>
</svg>

:::warn
Never shuffle time-series data or split it randomly. Training on future points to predict past ones is **look-ahead leakage** — it produces beautiful offline scores and a model that cannot work live. Always split by time: past to train, future to test.
:::
