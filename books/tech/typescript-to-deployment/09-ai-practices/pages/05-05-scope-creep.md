## Scope creep

- **The most common defect in agent work is not a bug. It is code you did not ask for**
- Asked to fix one function, it also renames a variable, extracts a helper, updates three call sites and fixes an unrelated type error it noticed
- Each of those may be an improvement. **None of them were reviewed as a decision**, and together they turn a 10 line diff into 200

### Why it happens

- It is optimizing for a good final state, not for a reviewable change. Nothing in its instructions says a small diff is a virtue
- **Unless you say so.** That is the entire fix

### Preventing it

```text
Only change what is needed for this. If you notice something else worth
fixing, list it at the end instead of doing it.
```

- **"List it instead of doing it" is the useful half.** You get the observations without the diff, and you decide what is worth a separate change

### Catching it

```bash
git diff --stat                 # more files than the plan named
git diff --numstat | sort -rn   # the largest changes first
```

- **Compare against the plan.** That is what the plan is for at review time

### Handling it

- **Send it back and ask for only the requested change.** Do not merge extras because they look fine
- The cost of accepting is not this diff. It is that every future diff is a little larger, and eventually none of them are reviewed

### The exception

- An unrelated fix that is genuinely valuable: **take it as its own commit, in its own pull request.** Not bundled, ever
