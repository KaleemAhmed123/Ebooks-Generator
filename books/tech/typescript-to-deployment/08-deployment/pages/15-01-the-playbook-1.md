# Module 15 - The deployment playbook

## Why it is written down

- Every module so far built a capability. **This one is the procedure that uses them**, and it exists because nobody thinks clearly at 3am
- A playbook is not documentation. **It is a list of commands, in order, with the decision points named**

### Where it lives

```text
docs/runbooks/
  deploy.md              # the normal path
  rollback.md            # when the deploy was wrong
  incident.md            # the first ten minutes of anything
  alert-high-5xx.md      # one per alert that pages
  alert-disk-full.md
  alert-db-connections.md
```

- **In the repository, beside the code**, so it is reviewed and versioned with the system it describes
- **Every alert links to its runbook.** An alert with no runbook link is half an alert, as Module 14 says
