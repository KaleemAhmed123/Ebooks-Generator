### The practices

- **One link from the alert to its runbook.** An alert with no runbook link is half an alert
- **Declare an incident early.** A short one that turns out to be nothing costs almost nothing; a late one costs a lot
- **One person coordinates and does not debug.** They keep the timeline and the communications
- **A blameless review within a week**, producing specific actions with owners. "Be more careful" is not an action

### The measure that matters

- **Time to detect and time to recover.** Both are improvable by engineering, where "number of incidents" mostly is not
- **The best incident response is a rollback.** If recovery usually means debugging in production, the deploy pipeline is the thing to fix
