### The data question, which is where teams get it wrong

- **Copying a production dump into staging copies the personal data into a system with weaker access controls.** It is the most common quiet compliance failure there is

```sql
-- anonymize on restore, in the same transaction
UPDATE users SET
  email = 'user' || id || '@example.invalid',
  phone = NULL,
  name  = 'User ' || id;
DELETE FROM payment_methods;
```

- **Better: generate synthetic data at production scale.** No personal data ever leaves production, and the volumes are whatever you choose
- **If you must copy, anonymize inside the restore job**, never as a manual step someone might forget

### Keeping it honest

- **Deploy to staging on every merge to `main`, automatically.** A staging environment that lags production is worse than none, because people trust it
- **Reset it on a schedule.** Accumulated hand-edited state is what makes staging stop resembling anything
