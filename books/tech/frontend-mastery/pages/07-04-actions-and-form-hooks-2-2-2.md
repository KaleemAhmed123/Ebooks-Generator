### `useOptimistic`

A network round trip takes 200ms or more. During that time the user has already moved on. `useOptimistic` shows the result immediately and rolls back on its own if the action fails.

```jsx
import { useOptimistic } from 'react';

function ChangeName({ currentName, onUpdateName }) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  async function submitAction(formData) {
    const newName = formData.get('name');
    setOptimisticName(newName);                  // shown at once
    const saved = await updateName(newName);     // the real request
    onUpdateName(saved);
  }

  return (
    <form action={submitAction}>
      <p>Your name is: {optimisticName}</p>
      <input type="text" name="name" />
    </form>
  );
}
```

The rollback is automatic, and that is the part worth understanding. `useOptimistic` holds the value only for the duration of the transition. When the action ends React discards it and re-reads `currentName`. On success that is the new name, so nothing visibly changes. On failure it is still the old name, so the UI snaps back with no code from you.

### Outside a form

Actions are not tied to `<form>`. Wrapping an async call in `startTransition` gives the same pending handling for a button.

```jsx
const [isPending, startTransition] = useTransition();

function handleDelete() {
  startTransition(async () => {
    await deleteItem(id);
  });
}
```
