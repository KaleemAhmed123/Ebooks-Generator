# Module 9 - Video upload and streaming

## Requirements and numbers

- A video platform takes one large file in, turns it into many files, and serves those files to a number of viewers that dwarfs the number of uploaders. Three pipelines, three different shapes: upload is a few large writes, transcoding is a batch of CPU, playback is a firehose of small reads from the edge
- Functional, in: upload a video; transcode it into renditions for every screen and network; stream it with the quality adapting to the viewer's bandwidth. Out: recommendations (Module 7's ranking stage), live streaming, comments (Module 6)
- Non-functional: an upload survives a dropped connection; a video is playable minutes after upload, not hours; playback starts in under a second and does not stall when bandwidth halves
- Inputs, as assumptions: say 1 M uploads a day, 10 minutes each, so ≈ 167 000 hours in; 1080p source at 5 Mbit/s; a ladder of six renditions whose bitrates sum to ≈ 2.2× the source; 100 M view-hours a day at an average 2 Mbit/s

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| one hour of 1080p source | 5 Mbit/s × 3 600 s ÷ 8 | ≈ 2.25 GB |
| source in, per day | 167 000 h × 2.25 GB | ≈ 375 TB/day |
| renditions out | ≈ 2.2 × source | ≈ 5 GB per hour; ≈ 1.2 PB/day stored in total |
| egress | 100 M h × 900 MB ÷ 86 400 s | ≈ 90 PB/day ≈ 8 Tbit/s average, and none of it from the origin (page 5) |

- Storage is dominated by the renditions, not the source: the estimate that counts the source alone is off by 3×. Bandwidth is dominated by playback, and playback is served by a CDN or it is not served at all
- The upload path (page 2), the transcode DAG (page 3) and the player's manifest (page 4) are the three deep dives; page 5 is where the 8 Tbit/s goes

### The failure

- Estimating storage from the source size. 375 TB a day sounds like the number; the six renditions make it 1.2 PB, and the interviewer's next question, "how many copies at the edge?", makes it larger still. The source is the smallest thing the design stores
