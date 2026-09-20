## The process pause

- A thread can stop between any two lines for any length of time. Garbage collection stops the world for hundreds of milliseconds, sometimes seconds. A virtual machine is paused and migrated. A page fault swaps in from disk. The operator hits `SIGSTOP`. A laptop lid closes. The code cannot detect it: from the inside, no time passed

```typescript
if (await lease.stillHeld()) {          // true at 12:00:00.000
                                        // ← the world stops here for 15 s: GC, VM migration, swap.
                                        //   the lease expired at 12:00:10. another holder took it.
  await storage.write(record);          // runs at 12:00:15 with a lease that is gone
}
```

- No length of check-then-act is safe, because the pause can be longer than any margin. Shortening the gap makes the race rarer and leaves it in place. Adding a second check adds a second gap
- The only fixes are the ones that do not rely on the holder's view of time. Give the write a fencing token and make storage refuse the stale one (Module 8, page 4). Or make the write conditional on the resource's own state, so that a stale writer's condition fails (Module 8, page 10). In both, the pause still happens; its write is refused
- The same gap is why Raft carries a term on every message (Module 7, page 3): a paused leader that resumes is refused by the term, not by its own belated check

### The failure

- "We check the lease right before the write, so the window is a microsecond." The window is one line of code; the pause is however long the runtime stops. A 15 s garbage collection during a heap spike is a normal event on a busy JVM or Node process with a large heap, and it lands on that line as readily as on any other
