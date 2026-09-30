## DPO successors

- DPO works, but each of its weak spots spawned a fix. As of September 2026 these are the post-training menu real labs pick from — each targets one DPO failure.

<svg viewBox="0 0 328 92" role="img" aria-label="Four DPO successors, each removing one requirement or adding one control" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="6" y="8" width="152" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="82" y="21" text-anchor="middle" font-size="8" fill="#24405e">KTO</text><text x="82" y="33" text-anchor="middle">no pairs — just 👍/👎 labels</text>
  <rect x="170" y="8" width="152" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="246" y="21" text-anchor="middle" font-size="8" fill="#24405e">ORPO</text><text x="246" y="33" text-anchor="middle">no reference model, folds into SFT</text>
  <rect x="6" y="50" width="152" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="82" y="63" text-anchor="middle" font-size="8" fill="#24405e">SimPO</text><text x="82" y="75" text-anchor="middle">no reference, length-normalised</text>
  <rect x="170" y="50" width="152" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="246" y="63" text-anchor="middle" font-size="8" fill="#24405e">IPO</text><text x="246" y="75" text-anchor="middle">regularised vs over-fitting prefs</text>
</svg>

- **KTO (Kahneman-Tversky Optimization)** — drops the need for pairs. Learns from single answers each tagged desirable or undesirable, using a prospect-theory objective. Useful when you have thumbs-up/down logs, not clean pairs.
- **ORPO (Odds Ratio PO)** — drops the reference model and merges alignment *into* SFT, so one stage does both. Used by Gemma 2.
- **SimPO** — drops the reference model and normalises reward by answer length, fixing DPO's drift toward short (or long) answers. Paired with DPO in Qwen 2.5.
- **IPO (Identity PO)** — adds regularisation so the model does not over-fit deterministic preferences when one answer always wins.

:::note
The trend is clear: **remove the reference model, remove the pairing requirement, add a length or margin control.** Simpler pipelines, cheaper runs, fewer knobs to break. This space moves fast — treat specific model→method claims as September-2026 snapshots, not permanent facts.
:::

:::warn
More methods is not more alignment. All of them still inherit DPO's core limit — they optimise the preference *data you gave them*. A cleaner algorithm cannot rescue biased, sparse, or inconsistent preference labels. The data, not the acronym, decides the result.
:::
