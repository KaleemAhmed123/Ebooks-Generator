### The `useQuery` Hook

Instead of `useEffect`, you use the `useQuery` hook.

```tsx
import { useQuery } from '@tanstack/react-query';

// The function that actually makes the network request
const fetchUser = async (id) => {
  const res = await fetch(`/api/user/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

function UserProfile({ userId }) {
  // We pass a unique queryKey. This is how React Query caches the data!
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', userId], 
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return <h1>Hello, {data.name}</h1>;
}
```

### Powerful Defaults
Out of the box, with zero configuration, React Query gives you:
1. **Deduplication:** If 5 components on the page use the `['user', 1]` query, React Query only makes **1** network request and shares the result with all 5.
2. **Window Focus Refetching:** If a user clicks away to another browser tab, and then clicks back to your app, React Query automatically refetches the data in the background to ensure they aren't looking at old information.
3. **Retries:** If the API fails due to a quick network blip, React Query will automatically retry the request 3 times before finally showing the `isError` state.

It is so powerful that it is often said that React Query replaces 50% of your legacy Redux code completely.
