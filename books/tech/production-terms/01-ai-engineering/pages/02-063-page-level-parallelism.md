## Page-Level Parallelism

Processing pages independently to keep tail latency sane, then reassembling. The
main scaling lever in document pipelines.

A 400-page PDF processed serially takes nine minutes and blocks the queue. Fanned
out across twenty workers, it finishes in thirty seconds.

### How it works

Document processing is slow per page, and page count varies enormously — one
invoice, or a four-hundred-page filing.

Serially, a single large document occupies a worker for minutes. Everything
queued behind it waits, including hundreds of one-page documents that would each
have taken under a second.

**That is head-of-line blocking**, and it shows up as wildly unpredictable
latency for the users whose documents were small — the ones with no reason to
expect a wait at all.

Because pages are independent for recognition, the fix is direct: split into
per-page jobs, fan them out, reassemble by page number.

**The step people miss is tracking failure per page rather than per document.**
One page that will not parse should not discard the three hundred and
ninety-nine that processed cleanly.

### In practice

Some operations genuinely cannot be parallelised — a table continuing across a
page break, or a classification that depends on the whole document.

Handle those in a reassembly pass **after** the per-page work completes, rather
than forcing every document down a serial path for the sake of the few
operations that need one. The serial path is the expensive one, and it should be
as short as the work allows.
