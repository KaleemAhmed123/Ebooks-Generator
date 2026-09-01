### Loading the file

```bash
node --env-file=.env dist/index.js
```

- Built into Node, so `dotenv` 17.4.2 is only needed for its extras like variable expansion
- `envalid` 8.2.0 does validation too, though a Zod schema keeps one validation library in the project

### The rules

- **Never commit `.env`.** Commit `.env.example` with the keys and no values
- Read config once at boot into a frozen object. Reading `process.env` deep in a service makes it untestable
- In production, secrets come from Secrets Manager or Parameter Store, not from a file on the box
