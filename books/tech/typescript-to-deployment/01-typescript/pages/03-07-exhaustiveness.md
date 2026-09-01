## Exhaustiveness checking with `never`

- The problem: you add a case to a union and forget to handle it somewhere
- The fix: make the compiler fail when that happens

```ts
type Job =
  | { kind: "email"; to: string }
  | { kind: "sms"; number: string }

function run(job: Job) {
  switch (job.kind) {
    case "email": return sendEmail(job.to)
    case "sms":   return sendSms(job.number)
    default:
      const _never: never = job
      throw new Error(`unhandled job ${_never}`)
  }
}
```

### How it works

- Inside `default`, every known case has been narrowed away
- So `job` has type `never` - the type with no possible values
- Assigning it to a `never` variable is therefore legal

### What happens when you add a case

```ts
| { kind: "push"; deviceId: string }
```

```bash
Type '{ kind: "push"; deviceId: string; }' is not assignable to type 'never'
```

- The build breaks at every `switch` that forgot the new case
- This is how you refactor a union across twenty files safely
