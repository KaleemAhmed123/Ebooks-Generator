### Budgets in a pull request

The most effective format is a bot comment on the pull request showing the diff,
because it puts the cost next to the change that caused it while the author is
still looking at it.

```
  Bundle size report
  entry            94.2 kB  →  94.4 kB   (+0.2 kB)
  /checkout        36.1 kB  →  71.8 kB   (+35.7 kB)  <- over budget
    + recharts     34.9 kB
```

Nobody argues with that. They either need the chart or they lazy-load it, and
the decision takes thirty seconds instead of a retrospective.

### What not to budget

Do not budget things you cannot control from the pull request. Third-party tag
sizes, image weight from a CMS, and INP on a low-end device all matter, but they
belong in the field-data dashboard, not in a check that blocks a merge. A gate
that engineers cannot fix is a gate they will learn to bypass.
