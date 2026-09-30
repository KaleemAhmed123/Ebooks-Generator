## Data management

- Models are trained on data, and data is usually the hardest part to handle: it is large, it changes, and the wrong format makes everything slow.
- Two decisions matter early: **what format** to store it in, and **where** it lives.

### Formats: stop using CSV for big data

| Format | Good for | Why |
|---|---|---|
| **CSV/JSON** | small, human-readable data | simple, but slow and untyped at scale |
| **Parquet** | large tabular datasets | columnar, compressed, reads only the columns you need |
| **Arrow** | in-memory data, fast sharing | zero-copy between tools, no re-parsing |
| **HDF5** | large numeric arrays | efficient slices of huge tensors |

- **Columnar** (Parquet) means values of one column sit together, so reading three columns of a hundred skips the rest. On gigabytes, this is the difference between seconds and minutes.

### Where it lives

- **Hugging Face Hub** is the standard place to find, version, and share datasets and models, as of 2026. Its `datasets` library streams data too large to fit on disk.
- Keep large data **out of git**. Version it with the Hub or dedicated data-versioning tools, and store only a pointer in your repo.

:::warn
The quiet killer of GPU training is slow data loading. If files are tiny and scattered, or stored as un-decoded images read one at a time, the GPU starves waiting for input. Batch data into Parquet or pre-processed shards so the disk keeps the GPU fed.
:::
