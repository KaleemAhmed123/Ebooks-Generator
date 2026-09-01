### The order to build it in

- Not all at once. Working through it in this order gives something usable at every stage:

| Stage | Gets you |
|---|---|
| Modules 1 to 3 | A safe server |
| Modules 4 to 6 | The application running in containers |
| Modules 7 to 9 | A real domain over HTTPS |
| Modules 10 to 12 | Data that survives, secrets handled properly |
| Modules 13 to 14 | Deploys that do not need a human at a keyboard |
| Modules 15 to 18 | Knowing when something is wrong, and what to do |

- **Most applications never need to leave this setup.** Traffic that genuinely exceeds a well-run 16 GB machine is more than most products ever see
