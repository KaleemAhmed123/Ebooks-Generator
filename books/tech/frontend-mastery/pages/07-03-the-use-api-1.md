## The `use` API

`use` is the first React API that is not a hook, even though it looks like one. It reads the value out of a resource: a promise, or a context.

The difference matters. Hooks must be called at the top level of a component, in the same order on every render. `use` may be called inside an `if`, inside a loop, or after an early return.

### Reading a promise

```jsx
import { use, Suspense } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);   // suspends until it resolves
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

Notice what is absent: no `useEffect`, no `useState`, no loading flag, no cleanup, no race condition when the props change mid-flight. `use` throws the promise, `<Suspense>` catches it, React retries when it settles.

**The promise must not be created inside the component.** A component can render many times, and creating the promise in the body creates a new one every render, which never resolves the same way twice. Create it in a Server Component, or in an event handler, or get it from a cache, and pass it down.

```jsx
// Server Component: starts the request, does not await it
export default function Page() {
  const commentsPromise = db.comments.findMany();   // no await
  return <ClientPage commentsPromise={commentsPromise} />;
}
```

The server sends the shell immediately and streams the comments in when the query finishes.
