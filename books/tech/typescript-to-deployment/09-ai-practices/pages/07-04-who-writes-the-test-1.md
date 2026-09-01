## Who writes the test

- **An agent that writes both the test and the implementation has verified nothing.** It has written down its own understanding twice
- If the understanding was wrong, the test encodes the same wrong understanding and passes

### The division that works

| Artifact | Written by | Because |
|---|---|---|
| the test for **new behavior** | **you** | it encodes what you actually want |
| the implementation | the agent | it is determined by the test |
| tests for **existing** behavior | the agent | the behavior is in the code to read |
| the edge cases | the agent, then you check | it is good at enumerating, bad at prioritizing |

- **Characterisation tests are the case where it genuinely excels.** Pointing it at an untested legacy module and asking for tests describing current behavior is one of the highest-value things it does

```text
Write tests describing what apps/worker/payout.ts does today. Do not fix
anything, even if it looks wrong. If something looks like a bug, list it
separately instead of changing it.
```

- **"Do not fix anything" is required.** Left alone it will improve the code and write tests for the improved version, which is not a characterisation test
