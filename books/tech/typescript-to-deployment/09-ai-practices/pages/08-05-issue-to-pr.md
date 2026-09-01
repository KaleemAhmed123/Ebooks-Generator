## From issue to pull request

- The furthest common shape: an issue is labelled, an agent picks it up, and a pull request appears with a diff and tests
- **It works well for a narrow band of work and badly outside it**, and knowing the band is the whole skill

### Where it works

| Work | Why |
|---|---|
| **a well-described bug with a reproduction** | the reproduction is the check |
| **a dependency bump** | mechanical, verified by the suite |
| **a small, fully specified feature** | the issue is the spec |
| **a repetitive change across files** | tedious and determined |

### Where it does not

- **A vaguely described issue.** It will build something, and it will not be the thing
- **Anything needing product judgement.** There is nobody to ask
- **Anything touching architecture, schema or permissions.** The blast radius is too large for an unattended run

### What has to be in place first

- **A label that means the issue is ready**, applied by a human who checked it is well specified
- **The pipeline from Module 7 runs on the pull request**, exactly as it does for anyone else
- **The agent cannot merge.** It opens a pull request, a person reviews it, a person merges it
- **A scoped credential.** It pushes a branch and opens a pull request, and nothing else
- **Public issues are untrusted input**, and Module 6 covers why that matters here specifically

### The realistic expectation

- **A good first draft on well-specified work, and noise on the rest.** The value comes from the labelling discipline more than from the agent
- **A pull request nobody asked for is a cost.** If the queue fills with unreviewed agent pull requests, the label is being applied too freely
