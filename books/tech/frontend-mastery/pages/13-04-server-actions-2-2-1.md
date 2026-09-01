### Wiring the action to the form state

Passing the action straight to `action={}` works, but the form has no idea whether it is running or whether it failed. `useActionState` supplies both. The action takes the previous state first and the form data second, and whatever it returns becomes the next state.

```tsx
'use client';
import { useActionState } from 'react';
import { updateUser } from '@/actions/userActions';

export function ProfileForm() {
  const [error, formAction, isPending] = useActionState(updateUser, null);

  return (
    <form action={formAction}>
      <input type="text" name="name" />
      <button disabled={isPending}>{isPending ? 'Saving...' : 'Save'}</button>
      {error && <p className="text-destructive">{error}</p>}
    </form>
  );
}
```

```ts
'use server';
export async function updateUser(_prev: string | null, formData: FormData) {
  const name = String(formData.get('name') ?? '');
  if (name.length < 2) return 'Name is too short.';   // becomes `error`
  await db.user.update({ name });
  updateTag('current-user');
  return null;
}
```

Returning validation errors rather than throwing them is the pattern. A thrown error hits the Error Boundary and blows away the page. A returned string lands under the input where the user can fix it.

### Which cache function to call at the end

- `updateTag(tag)` when the user must see their own change immediately.
- `revalidateTag(tag, 'max')` when a few seconds of staleness is fine for everyone else.
- `revalidatePath('/blog')` to invalidate a specific URL.
