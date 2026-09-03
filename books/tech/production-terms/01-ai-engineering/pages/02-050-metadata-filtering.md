## Metadata Filtering

Restricting vector search by structured attributes. Pre-filtering is correct and
can wreck ANN performance; post-filtering is fast and can return too few
results.

Filtering by `tenant_id` after the search returns zero results if the top fifty
all belong to other tenants — a silent and severe multi-tenancy bug.

### How it works

Vectors capture meaning, not facts. "Documents from 2025" and "this tenant only"
are structured constraints, enforced with metadata stored alongside each vector.

There are two ways to combine a filter with a vector search, and the difference
is not cosmetic.

**Post-filtering** searches first, then drops results that fail the filter. Fast,
because the index works normally. But if the top fifty happen to belong to other
tenants, all fifty are filtered away and the user sees nothing — for a document
they know exists.

**Pre-filtering** restricts the search to matching vectors from the start.
Always correct, and it can badly hurt ANN performance: the graph was built over
all vectors, so forcing traversal through a small allowed subset means wandering
past many disallowed nodes to find each permitted one.

### In practice

Which to choose depends on **selectivity**.

| Filter matches | Use |
|---|---|
| most of the corpus | post-filter — it will rarely empty the results |
| a small fraction | pre-filter, or better, physical separation |

For a single tenant among thousands, the right answer is usually a separate
namespace or collection. The filter then stops being a filter and becomes *which
index you searched*, which is both correct and fast.
