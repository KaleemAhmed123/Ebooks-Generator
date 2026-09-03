## Chunked & Resumable Upload

Splitting a large upload into parts, so a dropped connection resumes instead of
restarting and no single request has to hold two gigabytes.

A 2GB upload on a phone fails at ninety percent and starts again from zero. With
8MB chunks and a resume token it continues from chunk 231, and the failure costs
eight megabytes instead of two gigabytes.

The protocol has four moves: the client asks for an upload ID, sends indexed
chunks, asks *what is missing* after any interruption, and the server assembles
and verifies a checksum once every index has arrived. Skip the checksum and a
silently corrupted chunk becomes a corrupted file nobody notices for a month.

## Clock Skew

Two machines disagree about what time it is. Any logic comparing timestamps
across servers is quietly wrong, and gives no error while being wrong.

Two nodes 400ms apart, and "last write wins" by timestamp discards the newer
write. Nothing fails. The data is simply incorrect, and the incident that
uncovers it happens weeks later.

Use something that does not depend on wall clocks: a logical clock, a version
vector, or a single sequencer such as a database sequence. Where wall time is
unavoidable, treat it as approximate and never as an ordering guarantee.
