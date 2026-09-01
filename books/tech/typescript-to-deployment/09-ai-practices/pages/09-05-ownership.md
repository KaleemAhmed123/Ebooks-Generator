## Ownership and understanding

- Individually every change was reviewed. **Collectively nobody has the model of the system any more**, and this is the slow failure that shows up in month six
- Debugging, onboarding and design all depend on someone holding that model. Review alone does not build it

### The signs

- Nobody can explain how a subsystem works without reading it first
- Incidents take longer, because the first hour is spent understanding the code
- Estimates get worse, because nobody knows what a change touches
- The same bug class recurs, because nobody noticed the first two

### The practices that keep it

| Practice | Builds |
|---|---|
| **a named owner per subsystem** | one person who reads every change to it |
| **architecture decision records** | the why, which no diff carries |
| **regular walkthroughs** | someone explains a subsystem to the team out loud |
| **occasional manual implementation** | in the core domain, deliberately |
| **incident reviews that go deep** | the fastest way anyone learns a system |

- **The walkthrough is the highest-value one.** Being unable to explain your own subsystem is the signal, and it arrives before the incident does

### The core-domain rule

- **The code that encodes the business belongs to people.** Pricing, permissions, the state machine, the money
- Delegate the plumbing around it freely. **Keep the part that is expensive to get wrong and expensive to relearn**

### The test for a team

- **Pick a subsystem at random. Can someone explain it at a whiteboard, now?** If not for several subsystems, the understanding has already drained out
