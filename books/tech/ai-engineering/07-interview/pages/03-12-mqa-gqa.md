## MHA vs MQA vs GQA — what's the tradeoff?

- **Multi-head attention (MHA):** every query head has its own Key and Value head. Best quality, biggest KV cache.
- **Multi-query attention (MQA):** all query heads **share one** K and V head. Shrinks the KV cache by the head count (e.g. 8–64×), big serving win — but can lose quality and destabilise training.
- **Grouped-query attention (GQA):** the middle ground — groups of query heads share a K/V head (e.g. 8 KV heads for 64 query heads). Most of MQA's memory savings, nearly MHA's quality. Now the standard in large models.
- The whole point is the **KV cache**: fewer KV heads → smaller cache → more concurrent requests and longer context on the same GPU.

<svg viewBox="0 0 280 60" role="img" aria-label="MHA has one KV per query head, MQA shares one KV across all, GQA shares KV within groups" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="30" y="10" text-anchor="middle">MHA</text><text x="140" y="10" text-anchor="middle">GQA</text><text x="250" y="10" text-anchor="middle">MQA</text>
  <g fill="#24405e"><rect x="12" y="16" width="8" height="8"/><rect x="24" y="16" width="8" height="8"/><rect x="36" y="16" width="8" height="8"/><rect x="48" y="16" width="8" height="8"/></g>
  <g fill="#c0392b"><rect x="12" y="30" width="8" height="8"/><rect x="24" y="30" width="8" height="8"/><rect x="36" y="30" width="8" height="8"/><rect x="48" y="30" width="8" height="8"/></g>
  <g fill="#24405e"><rect x="122" y="16" width="8" height="8"/><rect x="134" y="16" width="8" height="8"/><rect x="146" y="16" width="8" height="8"/><rect x="158" y="16" width="8" height="8"/></g>
  <g fill="#c0392b"><rect x="128" y="30" width="8" height="8"/><rect x="152" y="30" width="8" height="8"/></g>
  <g fill="#24405e"><rect x="232" y="16" width="8" height="8"/><rect x="244" y="16" width="8" height="8"/><rect x="256" y="16" width="8" height="8"/><rect x="268" y="16" width="8" height="8"/></g>
  <g fill="#c0392b"><rect x="246" y="30" width="8" height="8"/></g>
  <text x="140" y="54" text-anchor="middle" fill="#6b6b6b">navy = query heads · red = KV heads</text>
</svg>

:::interview
What's really being tested:

that the axis of the tradeoff is KV-cache size vs quality, and that GQA is the current default sweet spot.
:::
