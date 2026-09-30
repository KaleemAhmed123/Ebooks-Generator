## The statistics you actually use

- You do not need a statistics degree. Four ideas cover most of day-to-day AI work.

### The working set

- **Mean and variance.** The mean is the centre; the **variance** (and its square root, the standard deviation) is the spread. You standardize inputs to mean 0, variance 1 so no feature dominates by scale alone.
- **Correlation.** How strongly two variables move together, from −1 to +1. Beware: **correlation is not causation**, and a correlation of 0 only rules out a *linear* relationship.
- **Sampling and bias.** A model learns the data you give it. If the sample is skewed, the model is skewed — no algorithm fixes a biased sample.
- **Confidence intervals.** A range that likely contains the true value. "94.1% ± 0.3%" is honest; a bare "94.1%" hides whether the gain is real or noise.

<svg viewBox="0 0 300 74" role="img" aria-label="Two models compared with overlapping confidence intervals, showing the difference may be noise" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <line x1="40" y1="30" x2="120" y2="30" stroke="#24405e" stroke-width="2"/><circle cx="80" cy="30" r="3" fill="#24405e"/><text x="80" y="20" text-anchor="middle">model A</text>
  <line x1="95" y1="52" x2="175" y2="52" stroke="#1a3a2a" stroke-width="2"/><circle cx="135" cy="52" r="3" fill="#1a3a2a"/><text x="135" y="68" text-anchor="middle">model B</text>
  <text x="240" y="42" fill="#c0392b" font-size="9">overlap →</text>
  <text x="240" y="54" fill="#c0392b" font-size="9">not different</text>
</svg>

:::warn
Reporting one accuracy number with no interval is the most common way benchmark results mislead. If two models' intervals overlap, you have not shown one is better — you have shown you need more data.
:::
