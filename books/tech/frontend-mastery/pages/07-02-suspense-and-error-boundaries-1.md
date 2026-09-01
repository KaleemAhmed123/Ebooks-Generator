## Suspense and Error Boundaries

Every component that loads data has three possible states: loading, loaded, and failed. Written by hand, that produces the same nine lines in every component.

```jsx
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <Content data={data} />;
```

Suspense and Error Boundaries pull those two branches out of the component and up into the tree, so the component below only has to describe the success case.

### Suspense

`<Suspense>` catches a component that is not ready yet and shows a fallback in its place. A component signals "not ready" by throwing a promise, which is what `use()`, `React.lazy()`, and framework data loaders all do internally.

```jsx
import { Suspense } from 'react';

<Suspense fallback={<ProfileSkeleton />}>
  <Profile userId={id} />
</Suspense>
```

`Profile` never checks a loading flag. It reads its data as if the data were already there. If it is not, React shows `ProfileSkeleton` and retries when the promise settles.

**Placement is the whole design.** One `<Suspense>` around the entire page means the whole page waits for its slowest query. One boundary per independent section means each section appears the moment it is ready.

```jsx
<Layout>
  <Suspense fallback={<HeaderSkeleton />}><Header /></Suspense>
  <Suspense fallback={<FeedSkeleton />}><Feed /></Suspense>
  <Suspense fallback={<SidebarSkeleton />}><Sidebar /></Suspense>
</Layout>
```

On the server this becomes streaming. React sends the shell immediately and pushes each section into the HTML stream as its data resolves. In React 19.2, server-rendered boundaries batch their reveals over a short window so the page does not flash section by section.
