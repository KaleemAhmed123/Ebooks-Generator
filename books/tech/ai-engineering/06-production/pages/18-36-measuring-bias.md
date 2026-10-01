## Measuring bias

- "The model seems biased" is not actionable; a *measurement* is. You cannot reduce a bias you have not quantified, and the quantity depends on picking a specific test for a specific harm.
- The methods, from cheapest to most rigorous:

| Method | Measures | Example |
|---|---|---|
| **benchmark suites** | known bias patterns | BBQ, StereoSet, Winogender |
| **counterfactual swaps** | output change when only group changes | swap the name/gender, diff the answer |
| **outcome disparity** | allocative harm in a task | approval rate by group on held-out data |
| **red-team probing** | targeted representational harm | prompt for stereotypes, audit outputs |

- **Counterfactual testing is the workhorse.** Hold everything fixed except a group-identifying attribute — the name on a résumé, the gender in a prompt — and measure whether the output changes. If "David" gets an interview and identical "Lakisha" does not, or "he is a nurse" flips to "she is a nurse," the model is using the protected attribute. It is cheap, direct, and interpretable.
- **Measure on *your* task and data.** A model can pass a public bias benchmark and still be biased on your specific inputs, prompts, and population — benchmarks cover generic patterns, not your deployment. Bias measurement belongs in your eval suite (17-46a) and your online monitoring, tracked per subgroup, not certified once.

:::warn
Aggregate metrics hide subgroup failure — the single most common bias measurement mistake. A model that is 95% accurate overall can be 98% on the majority group and 70% on a minority, and the headline number looks fine. *Always disaggregate*: report accuracy, error rates, and outcomes *per protected group*, not just the average. The average is precisely the number that lets allocative harm hide in plain sight, and "our model is 95% accurate" is not a fairness claim.
:::
