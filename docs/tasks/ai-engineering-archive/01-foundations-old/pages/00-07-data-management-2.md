### Reproducible splits — always set a seed

:::mint
```python
split = ds.train_test_split(test_size=0.2, seed=42)
train, test = split["train"], split["test"]
```
:::

:::note
The HuggingFace Hub caches everything to `~/.cache/huggingface/`. On shared machines or CI, set `HF_HOME` to a project-local path to avoid cross-project cache pollution and to control disk usage.
:::

### Three options for large-file versioning

| Option | When to use |
|--------|-------------|
| `.gitignore` + manual download | Solo projects; files re-downloadable from Hub |
| **Git LFS** | Small teams; files up to ~2 GB; GitHub-native |
| **DVC** — Data Version Control | Teams; files tracked by hash, stored in S3/GCS/local |

The training set is the dataset at a fixed split + seed. Version the split script, not the split itself, unless the dataset changes between experiments.
