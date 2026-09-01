## Permissions in retrieval

- A search index flattens everything into one pile. A salary document, another tenant's contract and an internal memo all become vectors beside the public help pages
- **A retrieval system with no permission model is a data breach that returns a fluent, well-cited answer**
- Nothing about the model catches this. The filter is the only defence

### Filter before you rank, never after

```sql
SELECT id, content
FROM chunks
WHERE tenant_id = $2
  AND acl_group_ids && $3::text[]      -- overlaps the caller's groups
ORDER BY embedding <=> $1
LIMIT 40;
```

- Ranking first and filtering after returns fewer rows than asked for, and hides the fact that it did
- **The tenant and the groups come from the session**, never from the question and never from a tool argument

### Storing the permissions

| Approach | Fits |
|---|---|
| **group ids on the chunk** | a group list that changes rarely |
| **a join to a permissions table** | permissions that change constantly |
| **a separate index per tenant** | few, large tenants, or a hard isolation requirement |

### The four failure modes to design against

- **Stale permissions.** A revoked document stays retrievable until the index is updated. Re-check at answer time for anything sensitive
- **Leaky citations.** A title or filename in a citation leaks the existence of a document the user may not see
- **Leaky summaries.** A cached or summarized answer built from privileged chunks, served to someone else. **Tenant id in every cache key**
- **Deleted documents.** A deletion must remove the chunks, not only the source row, or the answer still quotes it
