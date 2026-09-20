## Powers of two and sizes

- 2¹⁰ ≈ 10³. This is the only conversion you need: KiB, MiB, GiB, TiB are each a ×1,024 step

| Unit | Bytes | Approximate |
|---|---|---|
| 1 KiB | 2¹⁰ = 1,024 | ~10³ |
| 1 MiB | 2²⁰ ≈ 10⁶ | ~1 million |
| 1 GiB | 2³⁰ ≈ 10⁹ | ~1 billion |
| 1 TiB | 2⁴⁰ ≈ 10¹² | ~1 trillion |

- Typical sizes of things you store:

| Thing | Size |
|---|---|
| 32-bit integer | 4 B |
| 64-bit integer / timestamp | 8 B |
| UUID (128 bits) | 16 B |
| ASCII character | 1 B |
| UTF-8 character | 1–4 B |
| A tweet-sized row (ID, text, timestamps, metadata) | ~1 KB |
| A thumbnail image | ~10–100 KB |
| A high-res photo | ~2–5 MB |

### The rule of thumb for indexes

- A B-tree index roughly **doubles** the storage of the rows it covers (the tree structure, pointers, and page overhead). When sizing storage, multiply the raw row data by ~2 to account for the primary key index, and add again for each secondary index

### The failure

- Sizing a database for 1 TB of rows and forgetting the primary key index (~1 TB), the secondary index on user_id (~0.5 TB), and the WAL/redo log. The disk fills at half the expected capacity
