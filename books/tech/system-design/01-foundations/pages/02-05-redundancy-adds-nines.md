## Redundancy adds nines

- Components in parallel fail only when *all* of them fail. Availability in parallel is one minus the product of the unavailabilities

```
A = 1 − Π(1 − Aᵢ)

two independent 99.9% replicas
= 1 − (0.001 × 0.001) = 0.999999 → 99.9999%
```

- The shortcut: **the nines add**. Two three-nines components in parallel give six nines. Three give nine

<svg viewBox="0 0 460 92" role="img" aria-label="A request fans out to two parallel replicas at 99.9% each behind a load balancer; the pair is 99.9999% available, but only if the two are independent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <text x="8" y="50">request</text>
  <rect x="64" y="32" width="56" height="30" rx="3" fill="none" stroke="#1a1a1a"/><text x="92" y="51" text-anchor="middle" font-size="9">balancer</text>
  <path d="M120 40 L176 20" stroke="#1a1a1a" fill="none"/><path d="M176 20 l-7 -1 v6 z" fill="#1a1a1a"/>
  <path d="M120 56 L176 76" stroke="#1a1a1a" fill="none"/><path d="M176 76 l-7 -5 v6 z" fill="#1a1a1a"/>
  <rect x="180" y="6" width="100" height="28" rx="3" fill="none" stroke="#1a1a1a"/><text x="230" y="24" text-anchor="middle" font-family="Consolas,monospace" font-size="9">replica A · 99.9%</text>
  <rect x="180" y="62" width="100" height="28" rx="3" fill="none" stroke="#1a1a1a"/><text x="230" y="80" text-anchor="middle" font-family="Consolas,monospace" font-size="9">replica B · 99.9%</text>
  <path d="M280 20 L330 44" stroke="#1a1a1a" fill="none"/><path d="M330 44 l-7 -5 v6 z" fill="#1a1a1a"/>
  <path d="M280 76 L330 52" stroke="#1a1a1a" fill="none"/><path d="M330 52 l-7 -1 v6 z" fill="#1a1a1a"/>
  <rect x="334" y="32" width="118" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="393" y="51" text-anchor="middle" font-family="Consolas,monospace" font-size="9">pair · 99.9999%</text>
</svg>

### The word that carries the whole formula

- The product is only valid when the failures are **independent**: one replica failing tells you nothing about the other
- Two replicas that share a deploy, a config, a DNS name, a control plane, a power feed, or a bug are not independent. They fail together, and together they are one 99.9% component with two copies of the same failure
- Real redundancy means different: a different zone, a different release, a different provider, a different code path. Each shared thing is a place where the product stops applying

### The failure

- Six nines on the slide because there are two replicas. Then both restart on the same bad config push, at the same second, because that is what a config push does
- The arithmetic was right. The independence was assumed. The next page is what that looks like at region scale
