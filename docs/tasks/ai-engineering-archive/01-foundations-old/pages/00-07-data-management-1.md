## Datasets, formats, and the HuggingFace Hub

- **HuggingFace Hub** — a hosting platform for models, datasets, and Spaces. As of September 2026 it hosts over 800,000 models and 200,000 datasets, all accessible via the `datasets` and `huggingface_hub` Python libraries
- **Apache Arrow** — a columnar in-memory data format. The `datasets` library stores data in Arrow internally; operations on Arrow columns are zero-copy and cache-friendly
- **Parquet** — Arrow's on-disk counterpart. Columnar, compressed, fast for analytical queries. The correct format for storing large training datasets on disk

### Storage format tradeoffs

<svg viewBox="0 0 460 80" role="img" aria-label="Format comparison: CSV and JSON are large and slow; Parquet and Arrow are small and fast" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="60" y="16" text-anchor="middle" font-weight="bold">Format</text>
  <text x="180" y="16" text-anchor="middle" font-weight="bold">Size</text>
  <text x="300" y="16" text-anchor="middle" font-weight="bold">Read speed</text>
  <text x="410" y="16" text-anchor="middle" font-weight="bold">Use case</text>
  <line x1="4" y1="20" x2="456" y2="20" stroke="#1a1a1a" stroke-width="0.5"/>
  <text x="60" y="36" text-anchor="middle">CSV</text>
  <text x="180" y="36" text-anchor="middle" fill="#6b6b6b">large</text>
  <text x="300" y="36" text-anchor="middle" fill="#6b6b6b">slow</text>
  <text x="410" y="36" text-anchor="middle" fill="#6b6b6b">interchange</text>
  <text x="60" y="52" text-anchor="middle">JSON</text>
  <text x="180" y="52" text-anchor="middle" fill="#6b6b6b">large</text>
  <text x="300" y="52" text-anchor="middle" fill="#6b6b6b">slow</text>
  <text x="410" y="52" text-anchor="middle" fill="#6b6b6b">nested data · APIs</text>
  <text x="60" y="68" text-anchor="middle" fill="#24405e" font-weight="bold">Parquet</text>
  <text x="180" y="68" text-anchor="middle" fill="#24405e">small</text>
  <text x="300" y="68" text-anchor="middle" fill="#24405e">fast</text>
  <text x="410" y="68" text-anchor="middle" fill="#24405e">training data on disk</text>
</svg>

### Loading and streaming data

:::mint
```python
from datasets import load_dataset

# Eager load (fits in RAM)
ds = load_dataset("stanfordnlp/imdb")

# Stream (any size, row-by-row)
ds = load_dataset("wikimedia/wikipedia", "20231101.en",
                  split="train", streaming=True)
for row in ds: ...  # constant memory usage
```
:::
