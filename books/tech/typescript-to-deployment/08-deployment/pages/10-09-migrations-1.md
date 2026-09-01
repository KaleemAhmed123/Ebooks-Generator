## Migrations in a pipeline

- A schema change and a code change ship together and cannot be applied at the same instant. **Something runs with the wrong half for a few seconds**
- Every rule below exists to make that window harmless

### Where to run it

```yaml
      - name: Migrate
        run: npx prisma migrate deploy
```

| Option | Trade |
|---|---|
| a pipeline step before deploy | **the usual answer.** Visible, fails the deploy |
| an ECS one-off task | runs inside the VPC, no database exposure |
| on application start | **races between instances.** Avoid |

- **Never migrate on application start with more than one instance.** Two instances running the same migration at once is a locked table at best
- If you must, take an advisory lock so exactly one instance proceeds
