### After the old stack is gone

- Rollback becomes a full deploy of the previous tag, using page 13-13. That is a minute, not two seconds
- The tag to use is in `.env.tag.prev`

### What a flip rollback does not undo

- Migrations already applied
- Emails sent, webhooks delivered, payments captured
- Cache entries written in a new format by the new code. Clear the affected key prefix as part of the revert
