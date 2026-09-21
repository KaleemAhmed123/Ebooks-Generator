## Metadata store vs block store

- Two services, two stores, split by shape. Metadata is small rows read and written on every sync and changed transactionally: namespace, path, version, blocklist. Blocks are 4 MB immutable objects written once and read on download: object storage, keyed by hash (booklet 05). The client talks to both, and the order it talks to them in is page 4

<svg viewBox="0 0 460 134" role="img" aria-label="Two paths from the client. Small and frequent: the metadata API, which owns namespaces, paths, versions and blocklists, backed by a relational store sharded by namespace with small rows and transactions. Large and rare: the block API, which issues presigned PUT and GET by hash, backed by object storage keyed by SHA-256, immutable 4-megabyte objects. An orange cross on the right marks bytes in the database: a 4 megabyte blob per block row, a billion 1-megabyte files is a petabyte in the transactional store, replication and backups carry every byte, and the buffer cache holds nothing useful." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="46" width="56" height="30" rx="3" fill="#fff" stroke="#333"/><text x="34" y="59" text-anchor="middle">client</text><text x="34" y="70" text-anchor="middle" font-size="7">desktop, mobile</text>
  <rect x="94" y="10" width="116" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="152" y="23" text-anchor="middle">metadata API</text><text x="152" y="34" text-anchor="middle" font-size="7">namespaces, paths, versions,</text><text x="152" y="44" text-anchor="middle" font-size="7">blocklists; list changes</text>
  <rect x="94" y="84" width="116" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="152" y="97" text-anchor="middle">relational store</text><text x="152" y="108" text-anchor="middle" font-size="7">sharded by namespace (booklet 02)</text><text x="152" y="118" text-anchor="middle" font-size="7">small rows, transactions (page 4)</text>
  <line x1="152" y1="50" x2="152" y2="84" stroke="#333" marker-end="url(#d)"/>
  <line x1="62" y1="54" x2="94" y2="32" stroke="#333" marker-end="url(#d)"/><text x="6" y="40" font-size="7">small, frequent ↗</text>
  <rect x="232" y="10" width="116" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="290" y="23" text-anchor="middle">block API</text><text x="290" y="34" text-anchor="middle" font-size="7">"which of these hashes do you lack?"</text><text x="290" y="44" text-anchor="middle" font-size="7">presigned PUT / GET by hash</text>
  <rect x="232" y="84" width="116" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="290" y="97" text-anchor="middle">object storage</text><text x="290" y="108" text-anchor="middle" font-size="7">key = SHA-256 of the block</text><text x="290" y="118" text-anchor="middle" font-size="7">immutable 4 MB objects</text>
  <line x1="290" y1="50" x2="290" y2="84" stroke="#333" marker-end="url(#d)"/>
  <line x1="62" y1="68" x2="232" y2="104" stroke="#1d4e89" marker-end="url(#b)"/><text x="6" y="88" font-size="7" fill="#1d4e89">large, rare ↘</text><text x="6" y="97" font-size="7" fill="#1d4e89">blocks go direct</text>
  <text x="352" y="30" font-size="7.5" fill="#bf4c28">✕ bytes in the database:</text><text x="352" y="42" font-size="7" fill="#bf4c28">a BLOB per block row;</text><text x="352" y="52" font-size="7" fill="#bf4c28">1 B files of 1 MB = 1 PB</text><text x="352" y="62" font-size="7" fill="#bf4c28">in the transactional store;</text><text x="352" y="72" font-size="7" fill="#bf4c28">replication and backups</text><text x="352" y="82" font-size="7" fill="#bf4c28">carry every byte; the buffer</text><text x="352" y="92" font-size="7" fill="#bf4c28">cache holds nothing useful</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The metadata store is the one that needs transactions: a commit replaces a file's blocklist and bumps its version atomically, and page 5's conflict check is a compare on that version. Sharded by namespace, a user's or a shared folder's whole tree lands on one shard, so a sync of a folder is one shard's work (booklet 02)
- The block store needs none of that. An object is written under its hash or it is not; a second write of the same hash is a no-op; nothing is ever updated in place. Immutability is what makes the block store cheap and the dedupe safe
- The block API's one clever call is "which of these hashes do you lack?", answered from an index of block names, so the client uploads only what is missing (page 4)

### The failure

- File bytes in the relational database. The store built for small transactional rows now holds petabytes of immutable blobs; every replica and every backup carries them, the buffer cache is full of bytes no query needs, and a schema migration takes a week. Bytes go to object storage; the database keeps their names
