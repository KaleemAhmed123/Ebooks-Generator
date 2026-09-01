## Hallucinated packages

- Models invent package names. Attackers register those names. **The published research calls this slopsquatting, and it is the most concrete new supply chain risk in this area**

### The numbers, from published research

| Finding | Value |
|---|---|
| hallucination rate, open models | around **21.7 percent** on average |
| hallucination rate, commercial models | around **5.2 percent** on average |
| a hallucinated name repeated across 10 queries | **43 percent** of the time |
| a hallucinated name repeated more than once | **58 percent** of the time |

- **The repetition is what makes it an attack rather than a nuisance.** An attacker can enumerate the names models invent, register them, and wait
- A documented case: models suggest `unused-imports` in place of the real `eslint-plugin-unused-imports`, and a malicious package under that name was live and being downloaded

### The defences

- **Verify every new dependency by hand.** Open the registry page. Check the download count, the repository link, the publish date and the maintainer
- **A brand new package with few downloads and no repository is the signature.** That check takes twenty seconds
- **An allowlist gate in CI**, so a dependency not on the list fails the build until a human adds it
- **Lockfile pinning and integrity hashes**, enforced with `npm ci` rather than `npm install`, on every pipeline
- **Never let an agent install packages unattended.** `npm install` is one of the first commands to put behind approval

### The rule for the rules file

```markdown
- Do not add a dependency. If one seems necessary, say so and stop.
```

- **This single line prevents the entire class**, and it is worth having even if nothing else is enforced
