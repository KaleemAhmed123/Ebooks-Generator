# Module 10 - File sync

## Requirements and numbers

- A file-sync service keeps a folder identical across a user's devices and shares it with others. The insight the design is built on: most saves change a small part of a large file, so the unit of transfer must be smaller than the file
- Functional, in: upload and download; sync a change to every other device of the user within seconds; share a folder with other users. Out: live co-editing of one document (Module 18), search inside files
- Non-functional: no file lost or silently overwritten, ever; a change on one device appears on the others in seconds; bytes uploaded proportional to what changed, not to file size
- Inputs, as assumptions: say 100 M installed clients; 1 B files averaging 1 MB with a long tail into gigabytes; a client saves a file 100 times a day on average; blocks of 4 MB hashed with SHA-256, Dropbox's numbers from its 2014 streaming-sync post

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| a 1 GB file | 1 024 MB ÷ 4 MB | 256 blocks; a blocklist of 256 × 32 B = 8 KB |
| one-line edit in that file | 1 block of 256 | 4 MB uploaded, not 1 GB: 256× less |
| saves | 100 M × 100 ÷ 86 400 | ≈ 116 000 metadata commits/s, most of them one block |
| change notifications | 100 M clients, one held-open connection each | 100 M sockets: Module 6's registry, page 2 |
| polling instead | 100 M ÷ 5 s | 20 M requests/s to say "nothing changed" |

- Two stores with two shapes: metadata (paths, versions, blocklists), small and relational, read on every sync; blocks, large and immutable, written once and read rarely (page 3). Every page after this one is about keeping the two apart and committing them in the right order

### The failure

- Re-uploading the whole file on every save. A 1 GB design file saved ten times an hour is 10 GB an hour up a home link, for a few kilobytes of change. The block is the unit, and page 2 is why the block's name is its hash
