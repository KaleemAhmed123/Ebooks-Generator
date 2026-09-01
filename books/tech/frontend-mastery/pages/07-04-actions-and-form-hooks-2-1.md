### `useActionState`

This is the one you will use most. It wraps an action and hands back the last returned value, a wrapped action to pass to the form, and a pending flag.

```jsx
const [state, formAction, isPending] = useActionState(actionFn, initialState);
```

The action receives the previous state as its first argument and the form data as its second.

```jsx
import { useActionState } from 'react';

function UpdateName() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get('name'));
      return error || null;             // becomes the next `error`
    },
    null                                 // initial state
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>Update</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
```

No `useState` for the value. No `useState` for the error. No `try/finally` to unset a loading flag. The state that comes back is whatever the action returned, which is why validation errors are the natural thing to return.
