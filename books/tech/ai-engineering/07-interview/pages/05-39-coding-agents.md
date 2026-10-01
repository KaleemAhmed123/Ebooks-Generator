## How does a coding / SWE agent actually work?

- A coding agent turns an issue ("fix this bug", "add this feature") into a working, tested code change. Anatomy:
  - **Tools** — read/search the repo, edit files, run shell commands, run tests, use git.
  - **Loop** — locate relevant code (search/navigate) → plan the change → edit → **run the tests** → read failures → fix → repeat until tests pass.
  - **Verification is the backbone** — tests/compilers/linters give a concrete, un-gameable signal, which is why coding is one of the strongest agent domains (reflection actually works here).
  - **Sandbox** — run in an isolated environment with resource limits; never on prod.
- Hard parts: **locating** the right code in a big repo (retrieval over code), long-horizon error compounding, and not breaking unrelated things (run the full suite).
- Measured by **SWE-bench Verified** (do the hidden tests pass). Success depends as much on the **harness** (good tools, test feedback, retry logic) as on the base model.

:::interview
What's really being tested: that the loop is locate→edit→test→fix with tests as the verifier, why that verification makes coding a strong agent domain, and that the harness matters as much as the model.
:::
