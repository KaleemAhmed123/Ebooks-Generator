## Structured Output

*JSON mode, schemas, constrained decoding*

Constraining generation to a schema so the model cannot emit invalid JSON. Far
more reliable than asking politely and parsing with a regex.

"Reply in JSON" fails maybe 2% of the time. At 50,000 requests a day that is a
thousand failures, and they cluster on exactly the unusual inputs you cared
about.

### How it works

Most production uses need machine-readable output — JSON your code parses, not
prose a human reads.

The naive approach is to ask nicely in the prompt. It works most of the time,
and **"most of the time" is the problem**: at real volume a small malformed rate
is hundreds of daily failures.

Constrained decoding solves it structurally. The model picks from a probability
distribution at each step. If you are inside a JSON string, a closing brace is
not valid there — so the decoder sets its probability to zero before sampling.

Invalid output is not rejected after the fact. **It is never generated.**

Schema conformance stops being a probability and becomes a guarantee.

### In practice

**What it does not guarantee is correctness.**

A response can be perfectly valid JSON with a confidently invented value in
every field. Structure and truth are separate problems: constrained decoding
solves the first completely and the second not at all.

You still need validation of the values — do they appear in the source, does the
arithmetic hold — and grounding if they are meant to come from a document. A
schema tells you the shape is right, and says nothing about whether the contents
are real.
