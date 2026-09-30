## Filters and feature maps

- A CNN does not use hand-picked kernels. It **learns** them by backprop, exactly like any other weights. Each kernel becomes a detector for some pattern.
- The patterns form a hierarchy. Early layers learn edges and colours. Middle layers combine edges into textures and shapes. Deep layers combine those into objects — an eye, a wheel, a face.
- Nobody programs this hierarchy. It emerges because deep layers read the feature maps of shallow ones.

<svg viewBox="0 0 360 100" role="img" aria-label="Three stages of learned features: edges, then textures and parts, then whole objects, growing in complexity left to right" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="10" y="30" width="90" height="40" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="46" text-anchor="middle">early</text><text x="55" y="60" text-anchor="middle" fill="#6b6b6b">edges, colour</text>
  <rect x="135" y="30" width="90" height="40" rx="3" fill="#cfe0f0" stroke="#24405e"/><text x="180" y="46" text-anchor="middle">middle</text><text x="180" y="60" text-anchor="middle" fill="#6b6b6b">textures, parts</text>
  <rect x="260" y="30" width="90" height="40" rx="3" fill="#1a3a2a"/><text x="305" y="46" text-anchor="middle" fill="#fff">deep</text><text x="305" y="60" text-anchor="middle" fill="#cfe0d5">objects</text>
  <g stroke="#1a1a1a"><path d="M100 50 L133 50" marker-end="url(#fm)"/><path d="M225 50 L258 50" marker-end="url(#fm)"/></g>
  <defs><marker id="fm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- One convolutional layer holds many kernels, so it outputs many feature maps stacked as channels. `out_channels=16` means 16 learned detectors running in parallel.

:::note
This is the payoff over classical ML. There you engineered features by hand — edge detectors, colour histograms. A CNN learns the whole feature hierarchy from raw pixels, tuned to the exact task. Feature engineering became feature *learning*.
:::
