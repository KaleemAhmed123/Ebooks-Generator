### Inside a step

```bash
echo "image=$IMAGE" >> "$GITHUB_OUTPUT"     # pass a value to later steps
echo "VERSION=1.4.2" >> "$GITHUB_ENV"       # set an env var for later steps
echo "::group::Migration output"            # a collapsible log section
echo "::error file=src/x.ts,line=12::message"
echo "### Deployed ${GITHUB_SHA::7}" >> "$GITHUB_STEP_SUMMARY"
```

- **`GITHUB_STEP_SUMMARY` renders Markdown on the run page**, which is the cheapest way to make a pipeline readable to people who did not write it
