## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| the metadata store at a billion videos | a relational store sharded by video id (booklet 02); titles, owners and rendition manifests are small rows with lookups by key. YouTube's answer was Vitess, created there in 2010, per its own history page, to scale MySQL by sharding it; it is a CNCF graduate since 2019 |
| view counts | never `UPDATE videos SET views = views + 1` per view: 100 000 hot-row writes a second on the popular video. Views are events into a log, counted in windows, and the row is updated by a batch; Module 17 owns the counting |
| copyright | a fingerprint task in the DAG (page 3): hash the audio and frames, compare against a reference index, and gate publishing on the result. It is one more node, not a separate system |
| DRM | segments are encrypted at package time; the manifest points the player at a licence server that hands out the key per session. The CDN serves ciphertext and knows nothing |
| a video is "processing" for too long | the DAG's slowest step is the join in `package`; the dashboard shows the queue depth per task type, and the worker pool for the deepest queue scales. Publishing the lowest rendition first lets playback begin before the ladder is complete |
| thumbnails, captions, previews | more nodes in the same DAG, fanned out from the source, joined at publish |

- The metric is time from `complete` (page 2) to first playable rendition, and the origin's share of bytes served (page 5). Storage per hour of video (page 1) is the cost line the interviewer will ask for
- Cross-references the design leans on: blob storage, presigned uploads and the CDN (booklet 05); queues, idempotent tasks and the outbox (booklet 04); the thundering herd at the edge (Module 4, page 4)

### The failure

- A view count on the video row. One popular video, 100 000 viewers a minute, and every view is a row lock on the same row in the metadata store, ahead of the reads that actually render the page. The count is derived from a log; the row is read-mostly, and stays that way
