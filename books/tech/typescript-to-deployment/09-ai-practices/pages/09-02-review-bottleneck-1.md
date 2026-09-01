## The review bottleneck

- This is the central problem of team adoption, and the reported numbers are stark

| Measure | Reported change |
|---|---|
| pull requests merged | up around **98 percent** |
| tasks completed per developer | up around **21 percent** |
| pull request review time | up around **91 percent** |
| median review time | up several times over |
| organizational delivery metrics | far smaller movement |

- **Twice the pull requests and much slower reviews is a queue, not an improvement.** The work moved from writing to waiting

### What the teams that pull ahead do

- **Automated first-pass gates**, so a human never sees a diff that fails the mechanical checks
- **Risk-based triage.** A dependency bump and a payments change do not get the same review
- **Explicit review expectations**, so a pull request is not open for three days
- **Disciplined pull request sizing**, enforced rather than requested

### The sizing rule

- **Under 200 changed lines gets reviewed. Over 800 gets approved.** That has always been true and it now matters far more
- **A large pull request is sent back to be split**, not reviewed harder. This is the single highest-value team policy in this booklet
