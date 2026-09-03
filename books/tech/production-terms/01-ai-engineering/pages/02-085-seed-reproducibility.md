## Seed & Reproducibility

Temperature 0 and a fixed seed reduce variance. They do not guarantee identical
output across provider updates, batch composition or hardware.

An evaluation that assumed exact-match reproducibility went red on an
infrastructure change with no model change. Scoring on semantic equivalence was
the correct fix.

### How it works

Fixing sampling reduces variation substantially. Building on the assumption that
it eliminates variation creates confusing failures.

Three things break exact reproducibility even with temperature at zero:

- **Providers update models** behind version identifiers.
- **Floating-point arithmetic on GPUs is not associative**, so results depend on
  the order operations happen to complete.
- **In a batched server, output can vary with what else was in the batch** —
  which is outside your control entirely.

The practical consequence lands on evaluation. An exact-match test that passes
for months can fail after an infrastructure change with no model change, and the
investigation is genuinely unpleasant, because nothing in your system changed.

Score on semantic equivalence or against a rubric rather than string equality,
except where the output really is a fixed structure.

### In practice

**Determinism is a debugging aid, not a correctness property.**

It makes reproducing an issue easier. It does not make the answer right —
temperature 0 gives you the model's most likely output consistently, including
consistently wrong.

Do not let reproducibility stand in for accuracy in how the system gets
described. They are unrelated properties that sound adjacent.
