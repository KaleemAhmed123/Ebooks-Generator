## DSPy: signatures

- A **signature** declares a task's **inputs and outputs** — *what* the step does — without writing the prompt for *how*. It is a typed spec the compiler turns into an actual prompt. **[VERIFY current API]**

:::mint
```python
import dspy

# inline signature: "inputs -> outputs"
summarize = dspy.Predict("document -> summary")

# class signature: richer, with field descriptions
class ExtractInvoice(dspy.Signature):
    """Extract structured fields from an invoice."""
    document: str = dspy.InputField()
    total: float  = dspy.OutputField(desc="the grand total")
    due_date: str = dspy.OutputField(desc="ISO date")
```
:::

- **You name the fields, not the phrasing.** `"document -> summary"` says "take a document, produce a summary" — DSPy writes the prompt that elicits it. The class form adds descriptions and types (like a tool schema, 13-12) that guide compilation and validate outputs.
- **The signature is the contract, the prompt is generated.** This is the inversion: normally you write a prompt and hope for the right output shape; in DSPy you declare the shape and DSPy produces (and later optimizes) the prompt. Change models and the *same signature* recompiles to a new, model-appropriate prompt.
- Signatures compose — the output of one becomes the input of another — which is how you build multi-step pipelines (next page) declaratively.

:::interview
"What is a DSPy signature?"

A declarative spec of a step's inputs and outputs — like `"document -> summary"` or a typed class with described fields — that says *what* the step should do without you writing the prompt for *how*. DSPy compiles the signature into an actual, optimized prompt, and recompiles it if you switch models. It's the unit you program with instead of prompt strings: you own the interface (fields, types, descriptions), and DSPy owns the phrasing, which is what makes DSPy pipelines portable and optimizable.
:::
