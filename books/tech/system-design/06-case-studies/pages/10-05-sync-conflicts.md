## Conflicts

- Alice and Bob both edit the same file while offline. They both come online and sync
- **The rule:** Unlike Google Docs, we cannot silently merge binary files (like Photoshop files or encrypted PDFs). We must preserve both
- **The mechanism:** Every file has a version number.
  - Alice pulls V1. Edits it. Pushes V2
  - Bob pulls V1. Edits it. Attempts to push V2
  - The server rejects Bob's push: "Version mismatch. Current is V2."
  - Bob's client must pull V2, and upload his changes as a new file named `Document (Bob's conflicted copy).pdf`. The human must resolve it

### The failure

- Using "Last Writer Wins" (LWW). Bob's push overwrites Alice's push. Alice loses 4 hours of work and sues your company. Never silently overwrite user files without explicit version control

:::interview
You implemented Last-Writer-Wins based on the client's timestamp. Alice saves her work at 2:00 PM. Bob's computer clock is broken and says it is 3:00 PM. What happens?

Bob's older file overwrites Alice's newer file because the server trusted the broken client clock. Always use server-side sequence numbers or version vectors, and never silently discard conflicts.
:::\n