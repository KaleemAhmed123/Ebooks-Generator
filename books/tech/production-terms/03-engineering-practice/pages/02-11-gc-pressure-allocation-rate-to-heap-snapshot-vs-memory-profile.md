## GC Pressure & Allocation Rate

The collector charges for churn, not for what you keep. Go's own guide gives the
cost outright: `Total GC CPU cost = (Allocation rate) / (GOGC / 100) *
(Cost per byte) * T`, with the heap target at
`Live heap + (Live heap + GC roots) * GOGC / 100`.

Doubling `GOGC` roughly halves GC CPU cost and doubles heap overhead. Halving
allocation rate halves the cost with no memory added at all.

**A flat live heap is no defence.** A service whose retained set never grows can
still burn a large share of its CPU collecting, because allocate-drop-repeat is
exactly the pattern the collector bills for.

## Golden File Test

*characterisation test, approval test*

Comparing output against a checked-in reference file instead of hand-written
assertions. Standard for formatters, compilers and serialisers, where the
expected output is large and structured. An `-update` flag regenerates the file.

It is the quickest way to pin down behaviour you did not write: capture what the
code does now, then refactor until the golden file stops moving.

**The update flag is the entire risk.** Regenerating a file whose output legitimately
changed and regenerating one that just broke are the same keystroke, so the diff
is the test — and only if someone reads it.

## Heap Snapshot vs Memory Profile

A snapshot is the object graph at one instant — what is retained, and by whom. A
memory profile samples allocations over a window — who allocated, and how much.

Chrome DevTools ships all three shapes: heap snapshot, allocation
instrumentation on a timeline, and allocation sampling. Go's runtime samples one
allocation per 512KiB by default (`MemProfileRate = 512 * 1024`).

**A snapshot shows only reachable objects.** The code that allocated a gigabyte
and released it leaves no trace in one, so a hunt that starts with a snapshot
starts with the churn already invisible.
