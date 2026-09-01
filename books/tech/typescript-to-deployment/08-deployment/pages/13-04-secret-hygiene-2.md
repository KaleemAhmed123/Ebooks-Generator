### The habits that prevent most of it

| Habit | Prevents |
|---|---|
| **no long-lived AWS keys anywhere** | the worst case entirely |
| `.env` in `.gitignore` and `.dockerignore` | the most common leak |
| a redacting logger | secrets in log aggregation |
| a scanner in CI | the commit reaching `main` |
| short-lived credentials everywhere | the value of a leak |

### Auditing what exists

```bash
aws iam list-users --query 'Users[].UserName'
aws iam list-access-keys --user-name <user>
aws iam get-credential-report --output text --query Content | base64 -d
```

- **The credential report lists every user, every key and when each was last used.** Any key unused for 90 days should be deleted, and any key at all is worth questioning
