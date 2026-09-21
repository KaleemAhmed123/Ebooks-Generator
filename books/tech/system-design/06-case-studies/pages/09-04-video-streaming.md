## Adaptive bitrate streaming

- **Adaptive bitrate (ABR)** streaming serves a video as a manifest plus thousands of small segment files, one set per rendition, and lets the player choose the rendition for each next segment from the bandwidth it just measured. HLS and DASH are the two manifest formats; the server side is static files over HTTP, which is what makes a CDN (page 5) able to serve all of it

<svg viewBox="0 0 460 140" role="img" aria-label="Adaptive bitrate. A manifest lists six renditions from 1080p at 5 megabits a second down to 144p at 0.2. The player's timeline runs left to right: segment 1 fetched at 1080p, segment 2 at 1080p, the measured throughput drops as the viewer enters a tunnel, segment 3 is fetched at 480p, segment 4 at 360p, the link recovers and segment 5 is back at 720p. Every fetch is a plain HTTP GET of a static file from the CDN; the server has no per-viewer state. An orange cross marks one ladder for every title: a flat cartoon at 5 megabits wastes most of its bits, a football match at 1.5 looks like mud." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="10" width="92" height="82" rx="3" fill="#e6f2ff" stroke="#333"/><text x="52" y="23" text-anchor="middle">manifest</text>
  <g font-size="7"><text x="14" y="36">1080p · 5 Mbit/s</text><text x="14" y="46">720p · 3</text><text x="14" y="56">480p · 1.5</text><text x="14" y="66">360p · 0.8</text><text x="14" y="76">240p · 0.4</text><text x="14" y="86">144p · 0.2</text></g>
  <text x="52" y="104" text-anchor="middle" font-size="7">one URL per segment</text><text x="52" y="113" text-anchor="middle" font-size="7">per rendition, 4 s each</text>
  <line x1="130" y1="70" x2="450" y2="70" stroke="#333"/>
  <g font-size="7" text-anchor="middle"><text x="160" y="82">seg 1</text><text x="220" y="82">seg 2</text><text x="280" y="82">seg 3</text><text x="340" y="82">seg 4</text><text x="400" y="82">seg 5</text></g>
  <rect x="136" y="24" width="48" height="20" rx="2" fill="#fff" stroke="#1d4e89"/><text x="160" y="37" text-anchor="middle" font-size="7.5">1080p</text>
  <rect x="196" y="24" width="48" height="20" rx="2" fill="#fff" stroke="#1d4e89"/><text x="220" y="37" text-anchor="middle" font-size="7.5">1080p</text>
  <rect x="256" y="46" width="48" height="20" rx="2" fill="#fff" stroke="#1d4e89"/><text x="280" y="59" text-anchor="middle" font-size="7.5">480p</text>
  <rect x="316" y="46" width="48" height="20" rx="2" fill="#fff" stroke="#1d4e89"/><text x="340" y="59" text-anchor="middle" font-size="7.5">360p</text>
  <rect x="376" y="30" width="48" height="20" rx="2" fill="#fff" stroke="#1d4e89"/><text x="400" y="43" text-anchor="middle" font-size="7.5">720p</text>
  <path d="M136,14 L244,14 L256,40 L364,40 L376,20 L424,20" fill="none" stroke="#bf4c28" stroke-dasharray="3 3"/>
  <text x="250" y="10" text-anchor="middle" font-size="7" fill="#bf4c28">measured throughput: tunnel at seg 3</text>
  <text x="290" y="100" text-anchor="middle" font-size="7">the player picks the next segment's rendition from the last segment's measured throughput</text>
  <text x="290" y="110" text-anchor="middle" font-size="7">each fetch is a plain HTTP GET of a static file from the CDN; no per-viewer state on the server</text>
  <text x="6" y="132" font-size="7.5" fill="#bf4c28">✕ one ladder for every title: a flat cartoon at 5 Mbit/s wastes most of its bits; a football match at 1.5 looks like mud</text>
</svg>

- The switch is the player's decision, made segment by segment, from download time over segment size. Nothing on the server knows a viewer's bandwidth; the design's whole state for playback is the manifest, which is why the origin never sees a viewer

:::interview
"How does playback adapt when the viewer's bandwidth drops?" — It is the client, not the server. The video is a manifest and thousands of static segment files, one set per rendition. The player times each segment download and picks the rendition for the next one from that number, so a tunnel means a few seconds at 360p and a switch back when the link recovers. The server is stateless static files, which is what lets a CDN serve every byte of it.
:::

### The failure

- One bitrate ladder for all content. Encoding cost per frame depends on how much changes between frames: a flat cartoon at 5 Mbit/s carries bits it does not need, a sports match at 1.5 falls apart. A ladder chosen per title, from a measurement of the title's own complexity, spends the same bytes where the eye can tell
