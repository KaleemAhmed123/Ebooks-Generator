## Ensemble methods

- An **ensemble** combines many models into one stronger predictor. A committee beats a single expert when its members err in different ways.
- Three ways to build one:

### Bagging, boosting, stacking

- **Bagging** — train many models in parallel on random subsets, then average. Reduces *variance*. Random forests are bagging over trees.
- **Boosting** — train models in sequence, each one focusing on the mistakes the previous ones made. Reduces *bias*. This is the powerhouse for tabular data.
- **Stacking** — train different model types, then train a final model to combine their outputs.

<svg viewBox="0 0 360 78" role="img" aria-label="Boosting: three models in sequence, each correcting the errors of the one before, summed into a final prediction" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="10" y="26" width="70" height="24" fill="#e8f4fd" stroke="#24405e"/><text x="45" y="41" text-anchor="middle">model 1</text>
  <path d="M80 38 L104 38" stroke="#c0392b" marker-end="url(#en)"/><text x="92" y="30" text-anchor="middle" fill="#c0392b" font-size="7">errors</text>
  <rect x="106" y="26" width="70" height="24" fill="#e8f4fd" stroke="#24405e"/><text x="141" y="41" text-anchor="middle">model 2</text>
  <path d="M176 38 L200 38" stroke="#c0392b" marker-end="url(#en)"/><text x="188" y="30" text-anchor="middle" fill="#c0392b" font-size="7">errors</text>
  <rect x="202" y="26" width="70" height="24" fill="#e8f4fd" stroke="#24405e"/><text x="237" y="41" text-anchor="middle">model 3</text>
  <path d="M272 38 L296 38" stroke="#1a1a1a" marker-end="url(#en)"/>
  <rect x="298" y="26" width="56" height="24" fill="#1a3a2a"/><text x="326" y="41" text-anchor="middle" fill="#fff">sum</text>
  <defs><marker id="en" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

:::note
Gradient-boosted trees — **XGBoost**, **LightGBM**, **CatBoost** — are boosting applied to decision trees. As of 2026 they remain the go-to winners for tabular problems and dominate that category of data-science competitions, routinely beating neural networks on spreadsheet-shaped data.
:::
