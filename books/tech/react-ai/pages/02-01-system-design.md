# Module 2 - Frontend System Design

## What frontend system design actually is

- Backend system design has a vocabulary: databases, queues, caches, load balancers
- Frontend system design is less settled, but the underlying problems are the same
- You are still deciding: where does state live, who can mutate it, how does data flow, what happens when a part fails
- The difference is the unit of work is a component tree instead of a service

### The questions that reveal the design

- **Where does this data live?** Local state, shared state, server state, or URL state?
- **Who can mutate it?** One component? Any component? Only the server?
- **What is the staleness budget?** Can this data be 30 seconds old? Five minutes? Never?
- **What breaks when a network request fails?** The whole page, one section, or nothing visible?
- **Who needs this on load versus on interaction?** The answer changes what you fetch and when

### State categories

| Category | Example | Tool |
|---|---|---|
| Local UI state | Modal open/closed | `useState` |
| Shared UI state | Active tab across sibling components | lifted state, context |
| Server state | User's orders from the API | React Query, SWR |
| URL state | Current page, filters, selected ID | router search params |
| Form state | Draft values before submit | React Hook Form |

- Putting server state into a global store (`Redux`, `Zustand`) duplicates the problem the server already solved
- The store has to handle loading, errors, staleness, and revalidation — React Query does all four already
- Keep global stores for shared client-only state that no API owns: theme, sidebar collapsed, multi-step form progress
