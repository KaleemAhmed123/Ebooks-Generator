## Adaptive bitrate streaming

- **How it works:** The video is not sent over a WebSocket or a continuous stream. It is just thousands of tiny static `.ts` or `.m4s` files sitting on a standard web server
- The client downloads a **Manifest** (HLS or DASH) containing the URLs for all resolutions
- The client checks its network speed. If the network is fast, it HTTP GETs the 1080p chunks. If the user drives into a tunnel, the client seamlessly switches to HTTP GETting the 144p chunks for the next 10 seconds. The server has no streaming logic; it just serves static files
- **Per-title ladders:** An action movie requires high bitrates to look good. A cartoon (flat colours) looks perfect at low bitrates. Netflix uses ML to encode each video with a custom bitrate ladder

### The failure

- Trying to build a custom UDP streaming protocol. Standard HTTP over TCP powers 99% of global video (Netflix, YouTube) because it caches perfectly in standard CDNs

:::interview
A user is watching a video. They drive into a tunnel and their bandwidth drops by 80%. How does the server know to switch to a lower resolution?

The server doesn't know. The client is completely in control. It measures download times, and when bandwidth drops, it looks at the HLS manifest and starts HTTP GETting the lower-resolution chunks.
:::\n