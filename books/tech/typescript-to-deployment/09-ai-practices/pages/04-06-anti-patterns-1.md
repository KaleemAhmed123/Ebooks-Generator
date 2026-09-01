## Requests that go wrong

### The unbounded ask

```text
Bad:  Improve the error handling in this service.
```

- No definition of done, no boundary, no check. It will touch thirty files and be wrong in a way that is tedious to unpick

### The buried requirement

```text
Bad:  Add the endpoint, and it should probably validate the input, and also
      we use paise not rupees, and make sure it is fast.
```

- **A requirement in a subordinate clause gets dropped.** One requirement per line, numbered

### The vague quality word

- "Make it clean", "make it production ready", "make it scalable", "handle edge cases"
- **These mean nothing operationally**, so it will invent an interpretation, usually involving more abstraction than you wanted

### Trusting a claim

```text
Bad:  (accepting) "I have added tests and they all pass."
```

- **Run the tests yourself.** This claim is sometimes simply untrue, and it is untrue in a way that reads as confident
