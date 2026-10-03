## Flagship 13: issue-to-PR agent — build

- **Goal:** build an agent that reads a GitHub issue and opens a pull request that fixes it — reproduce, locate, edit, test, and PR. It is Flagship 4's coding harness driven by an issue instead of a human, and it is exactly what SWE-bench (Booklet 5) measures.

:::mint
```python
def issue_to_pr(issue, repo):
    ctx    = retrieve_relevant_files(issue.text, repo)     # RAG over the repo
    plan   = plan_fix(issue, ctx)                          # what to change, where
    branch = repo.create_branch(f"fix/{issue.number}")
    for step in plan:
        edit = coder_agent(step, ctx)                      # Flagship 4 harness
        result = run_in_sandbox(repo, "pytest")            # verification gate
        if not result.ok:
            edit = coder_agent.fix(edit, result.output)    # loop on failure
        repo.commit(branch, edit)
    if run_in_sandbox(repo, "pytest").ok:                  # final gate
        return repo.open_pr(branch, title=f"Fix #{issue.number}", body=summary(plan))
    return repo.comment(issue, "Could not produce a passing fix.")
```
:::

- **The flow is locate → fix → verify → PR.** Retrieval finds the relevant files (the repo exceeds the context window, Flagship 3), the coder edits with the sandbox harness (Flagship 4), and — the crux — a **passing test suite gates the PR**. No green tests, no PR. The agent proves the fix rather than claiming it.
- **The PR is the human handoff.** The agent doesn't merge; it opens a PR for human review — the propose-then-commit pattern (Booklet 5), keeping a human in the loop on the actual change to the codebase.

:::note
This flagship is the honest form of "AI fixes bugs": it succeeds on well-specified issues with good test coverage (reproduce, fix, tests confirm) and fails gracefully on vague or untestable ones (comments instead of a bad PR). SWE-bench scores exist precisely because this is *hard* and *measurable*. The reliability comes from the same place as Flagship 4: the harness (retrieval + sandbox + test gate), not the model's confidence. A test-gated PR is a claim you can trust.
:::
