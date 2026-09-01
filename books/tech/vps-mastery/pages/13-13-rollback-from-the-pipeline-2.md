### What a rollback does not undo

- **Database migrations.** Old code against a new schema fails unless the migration followed expand and contract on page 12-09
- Anything already sent: emails, webhooks, payment captures
- Cache entries written in the new format. Clear the affected keys as part of the rollback

### Practice it

- Roll back on a quiet afternoon, once. A rollback path that has never been used is a plan, not a capability
