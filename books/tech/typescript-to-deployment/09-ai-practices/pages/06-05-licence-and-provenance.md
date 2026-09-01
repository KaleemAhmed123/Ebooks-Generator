## Licensing and provenance

- Generated code is derived from a training corpus that includes code under every license there is. **Whether that creates an obligation is unsettled law, and it is not resolved by ignoring it**
- The practical risk is narrow but real: a distinctive block reproduced from a copyleft project, in a codebase that ships to customers

### Where the risk actually is

| Risk | Level |
|---|---|
| ordinary application code | low. It is not distinctive enough to be anyone's |
| a well-known algorithm implementation | **higher.** There is often one canonical version |
| a large block that appears verbatim | **highest.** Reproduction, not generation |
| a suggested dependency's own license | **the real one, and the one people forget** |

### The dependency license is the practical concern

- An agent suggests a library. It is AGPL. Nobody looked, and it is now in a product that ships
- **A license check in CI is the fix**, and it costs one job

```bash
npx license-checker --production --onlyAllow 'MIT;ISC;Apache-2.0;BSD-2-Clause;BSD-3-Clause'
```

### What to do about generated code itself

- **Enable the duplicate-detection filter** if your tool offers one. It suppresses suggestions matching public code
- **Be suspicious of a large block that arrives complete and polished.** That is the signature of reproduction rather than generation
- **Keep the provenance question answerable.** Some organizations require a note in the commit; most do not. Know which yours is

### The organizational part

- **Someone should have decided this**, and written it down. In a regulated or acquisition-facing company, "nobody asked" is not an answer that survives due diligence
