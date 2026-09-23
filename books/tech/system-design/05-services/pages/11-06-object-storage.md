## Object storage

- A flat map from a string key to a blob of bytes, addressed over HTTP. There is no tree, no partial write, and no rename. Those absences are the design, and they are what lets a single object reach 48.8 TiB

| | File system | Object storage |
|---|---|---|
| Structure | a tree of directories | flat keys; `/` is just a character |
| Access | `open`, `seek`, `write` | `PUT`, `GET`, `DELETE` over HTTP |
| Partial write | overwrite bytes in place | replace the whole object |
| Rename | an inode operation | copy to the new key, delete the old |
| Listing | cheap, per directory | paginated over the whole prefix |
| Concurrent writers | locks | none — last writer wins |

- S3 gives **strong read-after-write for `PUT` and `DELETE` in every region**, so a successful write is immediately visible to the next read. That removes a whole category of workaround code people still write out of habit
- What it does not give is any arbitration between concurrent writers. AWS is explicit that it "does not support object locking for concurrent writers" and that with simultaneous `PUT`s "the request with the latest timestamp wins" — so two uploads of the same key produce one surviving object and no error for the loser

### The failure

- Treating it as a filesystem, usually via a feature that lets users rename a folder. There are no folders, so renaming a prefix holding 10 000 objects is 10 000 server-side copies followed by 10 000 deletes — twenty thousand requests, charged, rate-limited, and far past any HTTP timeout the request began under
- The same assumption produces the listing problem: `list` is paginated across the whole prefix, so a UI that shows "the files in this folder" on a prefix with a million keys is walking the entire prefix to filter it. Both are fine at the scale they are written at and become incidents later, because the API makes the expensive operation look identical to the cheap one
