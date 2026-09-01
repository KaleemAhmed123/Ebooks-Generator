## When the first attempt is wrong

- It usually is, on anything non-trivial. **How you respond decides whether the next attempt is better or merely different**

### Say what is wrong, not just that it is wrong

```text
Weak:   That is not right, try again.

Better: The retry logic is in the route handler. It belongs in the worker,
        because a retry must survive a process restart. Move it and keep
        the handler unchanged.
```

- **"Try again" produces a different guess.** Naming the reason produces a correction

### Know when to restart instead

| Situation | Do |
|---|---|
| one specific thing is wrong | correct it in place |
| the approach is wrong | **revert and restart with a better prompt** |
| it has gone in circles twice | revert, restart, fresh session |
| it is fighting a check it cannot pass | look yourself. Something is not what you think |

- **Three failed corrections means the prompt was wrong, not the attempt.** Reverting and rewriting the request is faster than a fourth correction
- A conversation full of failed attempts also poisons the context, and it will repeat its own mistakes back
