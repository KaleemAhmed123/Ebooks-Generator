# Module 21: Supply Chain And Observability

## The Code You Did Not Write

Run `npm install` on a fresh React application and count what lands in
`node_modules`. It is not the ten packages you listed. It is somewhere between
eight hundred and fifteen hundred, written by several hundred people you have
never met, each of whom can push new code to your build tomorrow.

Every one of those packages runs with the same permissions as your own code. In
the build, that means read and write access to your entire repository, your
environment variables, and your CI secrets. In the browser, it means access to
the DOM, to cookies your JavaScript can read, and to the network.

This stopped being theoretical.

### What actually happened in 2026

These are government and vendor advisories, not speculation.

| Incident | What it was |
|---|---|
| **axios** | The HTTP client, tens of millions of weekly downloads, compromised. CISA issued an alert on 20 April 2026 |
| **Shai-Hulud** | A self-replicating worm that spread through `keyv`, `cacheable`, `flat-cache` and `file-entry-cache`. It stole credentials from each machine it landed on and used them to publish itself further |
| **ChainDrop** | Over 1,300 package versions compromised across packages with a combined **2 billion monthly downloads** |
| **Dependency confusion** | 33 malicious packages built to profile developer machines, documented by Microsoft on 29 May 2026 |
| **The editor** | A malicious VS Code extension used to reach a maintainer's GitHub account, which was then used to inject code into packages |
