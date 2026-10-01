## Eval harness: the metrics

- The metric turns a model output into a score, and choosing the right one per task is the craft. Four families cover most needs.

| Metric | For | How |
|---|---|---|
| **exact / classical** | closed answers, extraction | match, F1, accuracy |
| **execution-based** | code, SQL | run it, check the result |
| **perplexity** | language modelling | exp(avg cross-entropy) |
| **LLM-as-judge** | open-ended quality | a model scores against a rubric |

:::mint
```python
def execution_match(generated_code, test_cases):     # the gold standard for code
    passed = 0
    for case in test_cases:
        try:
            if run_sandboxed(generated_code, case.input) == case.expected:
                passed += 1
        except Exception: pass
    return passed / len(test_cases)                   # fraction of tests passed
```
:::

- **Execution-based metrics are the gold standard where they apply.** For code and SQL, don't score the *text* of the output — *run it* and check it does the right thing (in a sandbox, Flagship 4). A program that passes the tests is correct regardless of whether it matches the reference string; one that matches the string but crashes is not. String similarity is a poor proxy for "does it work."
- **Perplexity** (exp of average cross-entropy — how surprised the model is by held-out text) measures raw language-modelling quality and is calibration-sensitive: a well-calibrated model's confidence matches its accuracy. Useful for base-model comparison, useless for judging an assistant's helpfulness — match the metric to the question.

:::warn
The metric mismatch is the most common eval mistake. Scoring open-ended responses with exact-match punishes correct-but-differently-worded answers (recall the RAG faithfulness problem). Scoring code by string similarity rewards plausible-looking wrong code. Scoring helpfulness by perplexity measures fluency, not usefulness. **Pick the metric that actually captures the task's success criterion** — execution for code, LLM-judge-with-rubric for open-ended, exact/F1 only for genuinely closed answers — or your eval measures the wrong thing precisely.
:::
