## Reading a diff efficiently

- The problem is volume. **A careful line-by-line read of every generated diff is not sustainable**, and skimming everything catches nothing
- The answer is triage: read some parts carefully and let the machine cover the rest

### Read carefully

| Part | Why |
|---|---|
| **anything touching money, auth or permissions** | the expensive failures |
| **the boundary conditions** | where inverted logic hides |
| **anything deleted** | a removed check is invisible in a green build |
| **test changes** | a weakened test hides everything after it |
| **migrations** | usually irreversible |

### Skim, with checks behind it

- Types, imports, formatting, straightforward mapping code. **The compiler and the linter read these better than you do**

### The techniques

```bash
git diff --stat                     # shape first: how many files, how big
git diff -- ':!*.snap' ':!*.lock'   # exclude noise
git diff --word-diff                # what actually changed on a reformatted line
git log -p --reverse main..HEAD     # commit by commit, if they are small
```

- **Start with `--stat`.** Twelve files for a two-file task is the finding, and you have it in five seconds
