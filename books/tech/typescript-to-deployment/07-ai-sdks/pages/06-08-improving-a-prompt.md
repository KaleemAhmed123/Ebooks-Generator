## Improving a prompt without guessing

- Rewriting a prompt until the last example looks better is the default habit, and it moves quality randomly
- **A prompt change is a code change, and it needs the same loop**: reproduce, change one thing, measure against a fixed set, keep or revert

### The loop

1. **Collect twenty real failures**, not invented ones. Real inputs contain the mess that matters
2. **Group them.** Most failures fall into two or three causes, and one fix usually clears a group
3. **Change one thing.** A rule, an example, the output schema, or the model
4. **Run the evaluation set** from Module 9. Keep the change if the pass rate rose
5. **Bump the prompt version** and record which change it was

### What to try, in order of usual payoff

| Move | Fixes |
|---|---|
| **structured output** | format drift, unparseable answers |
| **a worked example of the failing case** | edge cases handled wrongly |
| **naming the tie-break rule** | inconsistent choices between two valid answers |
| **an explicit exit for "do not know"** | confident invention |
| **splitting into two calls** | one prompt trying to do two jobs |
| **a bigger model** | reasoning it genuinely cannot do |

### Letting a model write the prompt

- Giving a strong model your current prompt and its failures, and asking for a rewrite, is a genuinely useful starting point
- **Treat the result as a draft, not an answer.** It has never seen your evaluation set
- The provider consoles ship prompt improvers that do this with a tuned meta-prompt, which is a better starting point than a blank page

### The thing that actually moves quality

- **Splitting one prompt into two calls** beats almost any rewrite, because a prompt asked to classify and draft at once does neither well
