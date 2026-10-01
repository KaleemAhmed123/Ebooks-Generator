## Managed vs self-host: where it flips

- The worked TCO (previous page) showed self-hosting winning modestly at 5B tokens/month, with the engineer as the dominant cost. The decisive question is how that balance *moves with scale* — because the crossover is where the real answer lives.

<svg viewBox="0 0 340 96" role="img" aria-label="As volume rises, managed cost grows linearly while self-host TCO grows slowly, so self-host wins increasingly at high volume" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="34" y1="78" x2="320" y2="78" stroke="#888"/><line x1="34" y1="12" x2="34" y2="78" stroke="#888"/>
  <text x="177" y="92" text-anchor="middle" font-size="6" fill="#6b6b6b">token volume / month →</text>
  <text x="20" y="45" font-size="6" fill="#6b6b6b" transform="rotate(-90 20 45)">TCO</text>
  <path d="M34 70 L316 18" stroke="#24405e" stroke-width="1.4"/><text x="250" y="26" font-size="6" fill="#24405e">managed (linear)</text>
  <path d="M34 60 Q150 46 316 40" fill="none" stroke="#a03050" stroke-width="1.4"/><text x="250" y="52" font-size="6" fill="#a03050">self-host (GPU + ~flat ops)</text>
  <circle cx="120" cy="52" r="2.5" fill="#1a3a2a"/><text x="120" y="64" text-anchor="middle" font-size="5.5" fill="#1a3a2a">crossover</text>
</svg>

- **The crossover moves sharply with volume.** At 50B tokens/month the *GPU* cost grows ~10× but the *engineering* cost barely moves — the same small team runs the same fleet. So self-hosting's advantage widens fast: managed's bill scales linearly with tokens, while self-host TCO is dominated by the near-flat human cost. High, steady volume is exactly where self-host TCO wins big.
- **Low or spiky volume favours managed.** Below the crossover, or with bursty traffic that would leave a self-hosted fleet idle (paying for GPUs and an engineer to serve little), managed's zero-ops and pay-per-use win. The worst case for self-hosting is *low average utilisation* — you pay the full fixed cost (GPUs + engineer) for a fraction of the value.

:::interview
"Should we self-host to save money?"

Only if the **TCO** — not the token price — says so, and TCO includes the engineer, on-call, and upgrades. Walk it: at low-to-moderate volume, self-hosting's GPU saving is often *less* than the human cost of running the fleet, so managed wins despite a higher token bill. The crossover moves sharply with volume — managed scales linearly with tokens while self-host TCO is dominated by near-flat ops cost — so self-hosting wins increasingly at **high, steady** volume and loses at **low or spiky** volume where idle capacity and zero-ops dominate. The senior framing: compare *total* cost including engineering and reliability, size it against your *utilisation*, and recognise the human — not the GPU — is often the larger line item.
:::
