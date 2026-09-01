## Privacy and data handling

- Calling a model provider sends your users' data to a third party. That is a processing decision with legal weight, whoever wrote the code
- Most teams discover this during a security review, after the feature shipped

### The questions to answer before the first call

| Question | Where the answer lives |
|---|---|
| Is the data retained, and for how long? | the provider's data policy |
| Is it used for training? | the enterprise terms, usually not by default on the API |
| Which region does it process in? | the endpoint or the account setting |
| Is there a data processing agreement? | signed, before production |

### What to do in code

- **Redact before sending.** Card numbers, national identifiers and health details usually do not need to reach the model to answer the question
- **Send a reference, not the record.** `customer 8412` with a tool that resolves it beats pasting the whole profile
- **Never send secrets.** Keys, tokens and passwords in a pasted log are a leak, and users paste logs constantly

```ts
const redacted = text
  .replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, "[card]")
  .replace(/\b[\w.]+@[\w.]+\.\w+\b/g, "[email]")
```

- A regular expression pass is a floor, not a solution. Use a proper detector where the risk justifies it

### The user-facing side

- **Say that AI is involved**, in the interface, not only in a policy page
- **Let a user delete their history**, including the extracted memory facts from Module 8
- **Keep the audit trail** for any agent that took an action: what it did, on whose behalf, and who approved it
