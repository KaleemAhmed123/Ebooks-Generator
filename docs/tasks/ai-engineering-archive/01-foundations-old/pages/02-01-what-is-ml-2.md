### When not to use ML

ML is inappropriate when:
- The rule is deterministic and known (use `if tax_rate == 0.2: …`)
- You have fewer than ~100 labeled examples for a complex task
- The decision must be fully auditable and explainable in exact steps
- The cost of a wrong prediction is catastrophic and there is no safe fallback

:::note
The universal ML loop: define a model (parameterized function), define a loss (how wrong the model is), optimize the parameters with gradient descent to minimize the loss. Every algorithm in this module — linear regression, logistic regression, decision trees, SVMs — is a different choice for step one and step two.
:::
