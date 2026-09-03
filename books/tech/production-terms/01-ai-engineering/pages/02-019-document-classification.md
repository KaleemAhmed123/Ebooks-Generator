## Document Classification

Deciding what kind of document arrived before extracting anything from it, so
the right pipeline runs.

A pipeline expecting invoices received a delivery note and extracted nonsense,
confidently. A classification gate routes it correctly or refuses it.

### How it works

An extractor built for invoices, handed a delivery note, will find something
that looks like a total and return it. Nothing errors. The output is
well-formed, plausible, and wrong.

Classification is the gate that prevents this: decide what the document is
before deciding what to pull out of it.

**The part teams get wrong is the unknown case.** A classifier forced to choose
between invoice, contract and receipt will pick the nearest one for a document
that is none of them. It needs an explicit *unrecognised* outcome that routes to
a human, and a confidence floor below which nothing is assumed.

Getting this right early pays disproportionately, because every downstream error
caused by a misrouted document is expensive to trace. The extraction looks like
the failure; the real cause is two steps upstream and nobody is looking there.

### In practice

Classification is often possible from cheap signals, before any full text
recognition runs: page count, a keyword in the top region, aspect ratio, whether
the file is scanned or digitally generated.

Run the cheap check first and reserve the expensive model for genuinely
ambiguous cases. Otherwise the gate becomes the bottleneck — every document
paying for a full model call to answer a question that a keyword would have
settled.
