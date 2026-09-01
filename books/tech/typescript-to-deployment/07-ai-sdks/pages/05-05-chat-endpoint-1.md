## The chat endpoint contract

- A chat feature is not one endpoint. It is a conversation resource, a message list, a stream, and a persistence rule, and getting the contract right is most of the work

```http
POST   /api/v1/conversations                 create, returns an id
GET    /api/v1/conversations/:id/messages    load the history
POST   /api/v1/conversations/:id/messages    send one, stream the reply
DELETE /api/v1/conversations/:id             the user's right to remove it
```

### What a stored message has to hold

| Field | Why |
|---|---|
| `id`, client-generated | so a retry does not duplicate it, as in Booklet 6 |
| `role` and **content parts** | text, tool calls, tool results, files, reasoning |
| `modelId`, `promptVersion` | so an answer can be traced to what produced it |
| `usage` | cost attribution per message |
| `finishReason` | truncated, refused, or complete |

- **Store the parts, not the rendered text.** Flattening a tool call into a string makes the next turn unreconstructable, and the model needs the original blocks
