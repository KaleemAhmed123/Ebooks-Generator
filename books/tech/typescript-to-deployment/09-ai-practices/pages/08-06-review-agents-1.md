## Agents that review

- Review is the bottleneck, so automating a first pass is the highest-value place to put an agent in a team workflow
- **It is a first pass, not a review.** It catches the mechanical and misses the important, which is the reverse of what a person does

### What it is good at finding

| Finds | Reliably |
|---|---|
| an unhandled error path | yes |
| an unawaited promise | yes |
| a missing tenant filter, if told to look | yes |
| an inconsistent convention | yes |
| a test that asserts nothing | yes |
| a hardcoded value that should be config | yes |

### What it misses

- **Whether the change was the right thing to build.** It has no product context
- **Whether it fits the architecture.** It sees a diff, not a system
- **Whether the requirement was understood.** It usually has no access to the requirement
