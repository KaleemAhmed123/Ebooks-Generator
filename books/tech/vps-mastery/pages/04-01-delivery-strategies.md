## Three ways to get code onto a server

| Strategy | How | Verdict |
|---|---|---|
| **Copy files** | `scp` or an FTP client from the laptop | Never. No record of what is on the box |
| **Git on the server** | The box clones the repository and pulls | Fine to start. Builds happen on the box |
| **Registry pull** | A build produces an image elsewhere, the box pulls it | Where this ends up |

### Why copying files loses

- Nothing records which version is running. "It works on the server" becomes unverifiable
- A half-finished upload is a half-broken deployment
- Two people copying at once produce a state neither of them wrote

### Why Git on the server works, at first

- One command updates the box. The version is a commit hash. Rollback is `git checkout`
- The cost is that the server does the building, which needs RAM the server would rather spend on serving

### Why the registry wins in the end

- The build happens once, somewhere with spare capacity. The result is an image with a fixed digest
- The box downloads a finished artifact and starts it. Nothing compiles in production
- The same image runs in staging and production, so "works in staging" means something

### The path this booklet takes

- Module 4 sets up Git on the box, because it is the shortest route to a running app
- Module 13 replaces it with the registry model, and explains exactly what that fixes
