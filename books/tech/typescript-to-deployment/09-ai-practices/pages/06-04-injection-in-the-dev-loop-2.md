### The defences

- **The agent's permissions are the boundary, not its judgement.** Module 8 covers what to allow
- **No production credentials in the agent's environment.** It cannot exfiltrate what it cannot read
- **Approval on anything that leaves the machine**: pushing, posting a comment, calling a network tool, installing a package
- **Read the diff.** An exfiltration attempt shows up as a strange file read or a strange outbound call, and it is visible to anyone actually reading
- **Treat a public issue tracker as hostile input.** An agent triaging public issues is reading text written by strangers
