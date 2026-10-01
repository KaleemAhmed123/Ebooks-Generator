## Arithmetic intensity and the roofline

- Why *exactly* is prefill compute-bound and decode memory-bound (17-09)? One number answers it: **arithmetic intensity** — FLOPs of compute per byte moved from memory. It tells you whether a workload is limited by the GPU's math units or its memory bandwidth.

<svg viewBox="0 0 340 92" role="img" aria-label="Roofline model: performance rises with arithmetic intensity until it hits the compute ceiling; decode sits in the memory-bound region, prefill in the compute-bound region" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="34" y1="72" x2="320" y2="72" stroke="#888"/><line x1="34" y1="72" x2="34" y2="12" stroke="#888"/>
  <path d="M34 72 L150 20" stroke="#a03050" stroke-width="1.3"/><line x1="150" y1="20" x2="320" y2="20" stroke="#24405e" stroke-width="1.3"/>
  <text x="90" y="40" font-size="5.5" fill="#a03050" transform="rotate(-38 90 40)">memory-bound</text>
  <text x="230" y="16" font-size="5.5" fill="#24405e">compute-bound (roof)</text>
  <circle cx="70" cy="56" r="2.5" fill="#a03050"/><text x="70" y="66" text-anchor="middle" font-size="5.5" fill="#a03050">decode</text>
  <circle cx="230" cy="20" r="2.5" fill="#24405e"/><text x="230" y="32" text-anchor="middle" font-size="5.5" fill="#24405e">prefill</text>
  <text x="175" y="86" text-anchor="middle" font-size="5.5" fill="#6b6b6b">arithmetic intensity (FLOP/byte) →</text>
</svg>

- **The roofline model** plots achievable performance against arithmetic intensity: below a threshold you are *memory-bound* (limited by bandwidth — the sloped part), above it you are *compute-bound* (limited by FLOPs — the flat roof). Every kernel sits somewhere on this line.
- **Decode has low arithmetic intensity.** Generating one token multiplies the input by the weight matrices *once* — few FLOPs, but it must *read all the weights* from HBM. So it's far left, memory-bound. **Prefill has high intensity:** it processes many prompt tokens against the same weights, reusing each weight read across all of them — many FLOPs per byte, so it's on the compute roof.
- **Batching moves decode right.** Adding requests to a decode batch reuses each weight read across more tokens, raising arithmetic intensity toward the compute roof — which is *why* batching is the throughput lever (17-10). You are literally pushing decode rightward on the roofline until it's compute-bound.

:::interview
"Why does batching help decode but not prefill much?"

Arithmetic intensity. Decode is memory-bound — one token's worth of FLOPs but a full read of the weights from HBM — so it sits far left on the roofline, bandwidth-limited. Batching many requests' decode steps reuses each weight read across all of them, raising FLOP-per-byte and pushing decode *rightward toward the compute roof*, which is the throughput win. Prefill is already compute-bound (many prompt tokens reuse each weight read), so it's near the roof already and batching adds little. Framing serving in roofline terms — memory-bound decode, compute-bound prefill, batching as the lever that moves decode up the slope — is the deep answer.
:::
