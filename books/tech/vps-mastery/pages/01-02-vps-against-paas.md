## A VPS against a platform

- A platform (Vercel, Render, Railway, Fly) takes a repository and runs it. A VPS takes a machine and hands over the keys
- Neither is the correct answer. They fail in different places

| | Platform | VPS |
|---|---|---|
| Time to first deploy | Minutes | Hours |
| Cost at low traffic | Free to cheap | $5 to $12 a month |
| Cost at steady traffic | Rises with bandwidth and function calls | Flat |
| Long-lived WebSockets | Often capped or billed hard | No limit but the machine |
| UDP, TURN relays, custom ports | Usually not possible | Possible |
| A message broker beside the app | Managed add-on, billed separately | A container |
| Patching the kernel | Theirs | Yours |
| Being paged | Rare | Yours |

### Pick a platform when

- The app is HTTP request and response, traffic is spiky, and nobody wants to run a server

### Pick a VPS when

- The stack needs processes a platform will not run: a broker, a TURN relay, a socket server holding thousands of open connections, a worker that runs for an hour
- Spend has to be predictable, and the platform bill has stopped being predictable
- The app must sit in a specific country for legal reasons
