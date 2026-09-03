## Unhandled Rejection

A promise that rejected with nothing listening. Since Node 15 the default
response is to print the error and exit with code 1.

A background write called without `await` and without a `.catch()` lets its
rejection escape the request handler. On Node 14 that was a warning line; on Node
18 and later the container restarts, long after the request that caused it left
the trace.

`--unhandled-rejections=warn` restores the old behaviour and is the wrong fix. It
keeps a process running on state that a failed write was supposed to have
changed. Attach the handler or await the call.

## Utility Types

*Pick / Omit / Partial*

Built-in transformations that derive one type from another, so a payload type
cannot drift away from the model it came from.

`type CreateUser = Omit<User, 'id' | 'createdAt'>` — add a field to `User` and
the create payload gains it. Written out by hand, the two agree until someone
edits one of them.

| Type | Result |
|---|---|
| `Partial<T>` | every property optional |
| `Required<T>` | every property required |
| `Pick<T, K>` | only the named keys |
| `Omit<T, K>` | everything except the named keys |
| `Record<K, V>` | a map from `K` to `V` |
| `ReturnType<F>` | whatever `F` returns |

`Partial<T>` on a shape you then persist lets any field go absent at write time.
