## Table Extraction

Recovering rows and columns from a visual grid. Merged cells, spanning headers
and borderless tables are where it breaks.

A borderless table with a merged header shifted every value one column left.
Nothing errored; the numbers were simply and quietly wrong.

### How it works

A table is a visual convention. Humans read alignment and spacing as structure.
A computer sees a scatter of text at coordinates and has to infer the grid.

Bordered tables are relatively easy — detect the lines and the cells are
defined. Everything else is inference from alignment, and that is where it
breaks.

**The dangerous failure is not an error.** A merged header spanning two columns,
or a borderless table with one slightly ragged column, can shift every value one
position to the left. Nothing throws. The output is a well-formed table of
numbers in the wrong fields, entirely plausible to everything downstream.

Which is why table extraction needs validation rather than trust: column counts,
totals that should reconcile, values that should match an expected type.

### In practice

**Tables spanning pages are their own problem.** The header appears once, and
rows on later pages arrive with no column context at all.

Handling it means stitching continuation rows back to the original header, and
the extractor will not do that for you.

Test it explicitly, because multi-page tables are common in exactly the
documents where being wrong is expensive — financial statements, long invoices,
regulatory filings.
