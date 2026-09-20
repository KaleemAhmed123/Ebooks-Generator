## Transcoding as a DAG

- Transcoding a 2-hour movie into 5 resolutions takes hours on a single CPU core. We must parallelise it
- **The DAG (Directed Acyclic Graph):** The job is split into a graph of idempotent tasks (→04)
  1. **Split:** Break the 2-hour video into 10-second segments
  2. **Encode:** A fleet of queue workers encodes segment 1 into 1080p, segment 2 into 1080p, segment 1 into 720p, etc., all in parallel
  3. **Package:** Stitch the encoded segments into HLS or DASH manifests
- If a worker dies encoding segment 42, the message times out, goes back to the queue, and another worker picks it up

<svg viewBox="0 0 460 110" role="img" aria-label="Transcoding pipeline using a Directed Acyclic Graph (DAG) of queue workers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="40" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="50" y="55" text-anchor="middle" font-weight="bold">Source</text>
  <text x="50" y="65" text-anchor="middle" font-size="6">2 hr video</text>
  
  <rect x="120" y="40" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="150" y="59" text-anchor="middle" font-weight="bold" fill="#1d4e89">Splitter</text>
  
  <rect x="220" y="10" width="70" height="25" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="255" y="27" text-anchor="middle" font-weight="bold" fill="#b8541a">Enc 1080p</text>
  
  <rect x="220" y="45" width="70" height="25" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="255" y="62" text-anchor="middle" font-weight="bold" fill="#b8541a">Enc 720p</text>
  
  <rect x="220" y="80" width="70" height="25" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="255" y="97" text-anchor="middle" font-weight="bold" fill="#b8541a">Enc 480p</text>
  
  <rect x="330" y="40" width="60" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="360" y="59" text-anchor="middle" font-weight="bold" fill="#1d4e89">Packager</text>
  
  <path d="M80 55 L120 55" stroke="#1a1a1a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M180 55 L220 22" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M180 55 L220 55" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M180 55 L220 92" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M290 22 L330 55" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M290 55 L330 55" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <path d="M290 92 L330 55" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
</svg>

### The failure

- Creating a single queue task for a 4-hour video. It takes a single machine 10 hours to encode. If the machine reboots at hour 9, you lose 9 hours of work. You must split the video into tiny segments and distribute them

:::interview
You are encoding a 10 GB file. A worker crashes halfway through. How do you prevent wasting compute?

Do not encode the whole file on one worker. The Splitter breaks the video into 10-second segments. If a worker crashes, the queue simply reassigns that 10-second segment to another worker.
:::\n