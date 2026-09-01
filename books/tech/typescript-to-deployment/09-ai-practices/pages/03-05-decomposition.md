## Breaking it up

- A large change produces a large diff, and **a large diff does not get reviewed. It gets approved**
- Decomposition is how a big piece of work stays reviewable, and it is what makes agents genuinely faster rather than apparently faster

```markdown
## Tasks
- [ ] 1. Add `attempts` and `next_retry_at` to the payout schema (migration only)
- [ ] 2. Classify provider errors into retryable and terminal, with tests
- [ ] 3. Record an attempt row on every provider call, with tests
- [ ] 4. Schedule the retry from the worker, with backoff, with tests
- [ ] 5. Move to `needs_review` after 3 attempts, with tests
- [ ] 6. Expose `attempts` on the payout API response
```

### What makes a good step

| Property | Test |
|---|---|
| **independently verifiable** | it has its own test, and the suite passes after it |
| **small** | the diff fits on a screen or two |
| **shippable** | merging it alone breaks nothing |
| **ordered by dependency** | schema before the code that uses it |

- **Step 1 is a migration alone**, which is the expand step from Booklet 8. That ordering is not an accident

### Running it

- **One step, one review, one commit.** Not six steps and one review at the end
- Tick the box in the file as each lands, so a fresh session picks up exactly where the last one stopped
- **If a step turns out bigger than expected, stop and re-plan.** An agent will happily expand a step into a rewrite and report it as done

### The size rule

- **If you cannot review it in fifteen minutes, it was too big a step.** That is the only sizing heuristic that survives contact with real work
