## Living with eventual consistency

- The moment work moves out of the request, the system stops being consistent at every instant
- The order is paid, and for the next two seconds the seller dashboard still shows it pending. Both readings are correct
- **Eventual consistency** means all copies agree once the work drains, not that they agree now
- This is not a defect to be fixed. It is the price of the decoupling, and the job is to make it invisible where it matters and honest where it does not

### Where it is not acceptable

- Anything the user just did. Reading your own write must show your own write
- Anything enforcing a limit. A balance check reading a stale value is the race from Module 4
- Those belong in the same transaction as the write, not on a queue

### Making it invisible

- **Read your own writes.** After an action, serve that user from the primary rather than a replica, or from the value you just wrote
- **Show the pending state.** Payment received, dispatch being arranged, is true and reassuring. A spinner that resolves to stale data is neither
- **Make the client optimistic.** Update the interface immediately, reconcile when the event lands

### The rule that keeps it manageable

- Draw the line once and write it down: which facts must be immediately consistent, and which may lag
- Money and permissions on one side. Counts, feeds, search indexes and notifications on the other
- Systems get painful when nobody decided, and every feature negotiates it again
