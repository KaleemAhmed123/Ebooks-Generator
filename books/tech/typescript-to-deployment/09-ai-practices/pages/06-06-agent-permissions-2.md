### The principles

- **Read and local write are cheap to allow**, because git undoes them and nothing left the machine
- **Anything with an effect outside the working tree gets a prompt.** That is where an injected instruction would have to act
- **Nothing production.** No production database URL, no production AWS profile, no deploy credential in the environment an agent runs in

### Bypassing the prompts

- Every tool has a mode that stops asking. **It is correct only inside a sandbox**: a container, a VM, or a throwaway environment with no credentials
- **Running an unattended agent with your normal shell and your normal credentials is the risky configuration**, and it is the common one
- **A worktree is not a sandbox.** It isolates the branch, not the machine
