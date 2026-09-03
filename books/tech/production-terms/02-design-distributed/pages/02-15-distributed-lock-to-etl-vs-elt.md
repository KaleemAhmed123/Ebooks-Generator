## Distributed Lock

A lock held in shared storage so that only one process across the whole fleet
does a thing. Correct only with a TTL and a fencing token; without those it is a
liability.

```
SET lock:job1 <uuid> NX PX 30000     acquired -> do the work
                                     not acquired -> skip
DEL only if the stored uuid is still yours
```

No TTL means a crashed holder blocks the job forever. No fencing token means a
process that paused, lost its lease, and woke up still believes it holds the
lock — and writes. Deleting a lock you no longer own is the same bug wearing a
different hat, which is why the delete has to check the UUID.

## Envelope Encryption

Encrypting data with a per-object data key, then encrypting that key with a
master key held in a KMS. Rotating the master key then does not mean
re-encrypting the data.

Ten terabytes encrypted under four million data keys. Rotating the master key
re-wraps four million small keys and leaves ten terabytes of ciphertext
untouched. Without the envelope, rotation means rewriting everything, so in
practice it never happens.

What gets stored alongside each object is the ciphertext plus its wrapped data
key. The KMS never sees the data, and the storage layer never sees a usable key.

## ETL vs ELT

ETL transforms before loading. ELT loads raw and transforms inside the
warehouse. ELT won because storage got cheap and warehouses got fast.

The difference that matters is not performance, it is what happens when the
transform logic turns out to be wrong. With ELT the raw data is still there, so
you re-run it. With ETL the pre-transform data was discarded at load time, and
the only recovery is re-extracting from a source that may have moved on.

Keep the raw layer even when the transform is cheap. It is the difference
between a bad afternoon and a lost quarter of history.
