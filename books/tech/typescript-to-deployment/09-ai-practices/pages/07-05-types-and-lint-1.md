## Types and lint as the guardrail

- Every convention you can express as a check is a convention taught to every agent and every human automatically, forever. **This is the highest-value work in the booklet**
- A rule in `AGENTS.md` is advisory. A rule in ESLint is enforced

### Types

```json
{ "compilerOptions": {
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitOverride": true
}}
```

- **`noUncheckedIndexedAccess` catches a whole class of generated bug**, where an array lookup is assumed to be defined
- Branded types, discriminated unions and exhaustive `never` checks from Booklet 1 all become guardrails here. **A wrong change stops compiling**
