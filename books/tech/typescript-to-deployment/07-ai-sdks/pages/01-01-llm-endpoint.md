# Module 1 - What you are actually calling

## A model is an HTTP endpoint

- Every AI feature in this booklet is the same thing underneath: a POST request carrying text, and a response carrying text
- There is no session, no connection held open, and no object on a server that remembers who is calling
- The model is **stateless**, in exactly the sense HTTP is stateless in Booklet 6. It knows nothing that was not in the request body
- Chat history, memory, retrieval and agents are not features of the model. They are your code putting more text into that one request
- Holding that picture is what turns this from magic into plumbing you already know how to build

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 256,
    "messages": [{"role": "user", "content": "Name three Indian spices."}]
  }'
```

- That is the whole API. An SDK is a typed wrapper over it that handles retries, streaming and parsing

### What this booklet does not assume

- No machine learning background. Nothing here trains a model or touches a GPU
- The job is the same backend job as always: call a service, handle its failures, control its cost, and keep it out of the request path when it is slow
