### The Clean Component
Now look at how incredibly clean and readable our actual React Component becomes:

```jsx
// GOOD: The Modern Pattern
import { useUser } from '../hooks/useUser';
import { useWindowWidth } from '../hooks/useWindowWidth';

function UserProfile() {
  // We just declare what we need. The implementation details are hidden!
  const { user, loading } = useUser();
  const width = useWindowWidth();

  if (loading) return <Spinner />;

  return (
    <div className={width < 768 ? 'mobile-layout' : 'desktop-layout'}>
      <h1>{user.name}</h1>
    </div>
  );
}
```

This architecture is the hallmark of a Senior Frontend Engineer. Your UI components should be "dumb." They should simply call custom hooks to get data, and then render HTML. All the complex "brain" logic should live isolated inside the `hooks/` directory.
