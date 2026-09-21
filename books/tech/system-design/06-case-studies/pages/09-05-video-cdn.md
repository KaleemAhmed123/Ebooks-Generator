## Delivery

- Playback is 8 Tbit/s (page 1) of static files, so it is served from the edge, a **CDN**, a fleet of caches placed near viewers that serves a file from the nearest copy and fetches from the origin only on a miss. Booklet 05 owns the CDN as a mechanism; here the design question is what is pushed to the edge before anyone asks, and what waits for a miss

<svg viewBox="0 0 460 138" role="img" aria-label="Delivery. A viewer's player fetches segments from an Open Connect appliance that sits inside the viewer's ISP's own network; the traffic never crosses the wider internet. The appliance is pre-filled for its region one to two weeks ahead and topped up by nightly fills in off-peak hours from the origin, the renditions in blob storage, over settlement-free peering. A miss, the long tail, is fetched from the origin once and then cached. An orange cross marks the origin serving a viral upload's first viewers: edge egress is 8 terabits a second, origin egress is sized for fills." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="50" width="56" height="30" rx="3" fill="#fff" stroke="#333"/><text x="34" y="63" text-anchor="middle">viewer</text><text x="34" y="74" text-anchor="middle" font-size="7">player, page 4</text>
  <rect x="86" y="14" width="200" height="106" rx="4" fill="none" stroke="#333" stroke-dasharray="4 3"/><text x="186" y="27" text-anchor="middle" font-size="7.5">the viewer's ISP, its own network</text>
  <rect x="98" y="38" width="176" height="66" rx="3" fill="#e6f2ff" stroke="#b8541a"/><text x="186" y="52" text-anchor="middle">Open Connect appliance</text><text x="186" y="64" text-anchor="middle" font-size="7">Netflix hardware in the ISP's network, no cost</text><text x="186" y="75" text-anchor="middle" font-size="7">pre-filled for the region 1–2 weeks ahead</text><text x="186" y="86" text-anchor="middle" font-size="7">nightly fills in off-peak hours</text><text x="186" y="97" text-anchor="middle" font-size="7">serves the segments; traffic stays in the ISP</text>
  <line x1="98" y1="65" x2="62" y2="65" stroke="#333" marker-end="url(#d)"/><text x="80" y="60" text-anchor="middle" font-size="7">play</text>
  <rect x="350" y="42" width="104" height="44" rx="3" fill="#e6f2ff" stroke="#333"/><text x="402" y="56" text-anchor="middle">origin</text><text x="402" y="67" text-anchor="middle" font-size="7">renditions in blob (page 3)</text><text x="402" y="78" text-anchor="middle" font-size="7">egress sized for fills</text>
  <line x1="350" y1="52" x2="274" y2="52" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="312" y="48" text-anchor="middle" font-size="7">fill</text><text x="402" y="28" text-anchor="middle" font-size="7">nightly fill, off-peak,</text><text x="402" y="37" text-anchor="middle" font-size="7">settlement-free peering</text>
  <line x1="274" y1="94" x2="350" y2="82" stroke="#1d4e89" marker-end="url(#b)"/><text x="312" y="80" text-anchor="middle" font-size="7" fill="#1d4e89">miss</text><text x="402" y="98" text-anchor="middle" font-size="7" fill="#1d4e89">miss: the long tail,</text><text x="402" y="107" text-anchor="middle" font-size="7" fill="#1d4e89">fetched once, then cached</text>
  <text x="6" y="132" font-size="7.5" fill="#bf4c28">✕ origin serves a viral upload's first viewers: the edge carries 8 Tbit/s, the origin is sized for fills</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- Netflix's Open Connect, per its own site, is the far end of this idea: appliances embedded in ISP networks at no cost to the ISP, pre-filled with the content its region will watch one to two weeks ahead, topped up by nightly fills over settlement-free peering. A catalogue that is known in advance can be pushed before it is asked for
- A platform with user uploads cannot pre-fill everything, so its edge is a cache: the popular head is at the edge within one miss per edge location, the long tail is fetched from the origin per request. The number to defend is the origin's share of bytes, which the design keeps near zero by putting a mid-tier cache between the edges and the origin, so a miss at 100 edges is one fetch from blob, not 100

### The failure

- The origin serves the first viewers. A video goes viral, 100 edge locations miss at once, and every miss is a fetch of a 2 GB set of renditions from blob storage over links sized for nightly fills. The mid-tier, and a request-coalescing edge that lets one fetch answer a thousand waiting players (Module 4, page 4), are what stop the origin from being the bottleneck
