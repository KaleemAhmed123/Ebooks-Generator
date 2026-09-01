# Module 9 - Making it work for a team

## Adopting it without making things worse

- Individual adoption is easy. **Team adoption fails in predictable ways**, and all of them are process failures rather than tool failures

### The three that happen most

- **The review queue collapses.** Output rises, review capacity does not, and lead time gets worse than before
- **The codebase fragments.** Everyone's agent picks a different pattern, and within months there are four ways to do everything
- **Nobody understands the system.** Individually everything was reviewed. Collectively nobody has the model any more

### The order that works

1. **Fix the checks first.** Tests, types, lint, CI. Volume without gates is the failure mode, and this is the prerequisite
2. **Write the rules file together.** One shared `AGENTS.md`, agreed, so agents converge instead of diverging
3. **Agree the review standard.** Diff size, what gets read carefully, what blocks
4. **Then increase volume.** Not before

### What not to do

- **Do not mandate usage or measure it.** "Percentage of code written by AI" is a target that produces the wrong behavior immediately
- **Do not ban it.** It happens anyway, without the conventions or the gates, which is strictly worse
- **Do not skip step one.** A team that adds volume before gates spends the next quarter on incidents

### The honest framing

- **This is a process change, not a tool rollout.** The tool takes a day. The process takes a quarter, and the process is where the benefit is
