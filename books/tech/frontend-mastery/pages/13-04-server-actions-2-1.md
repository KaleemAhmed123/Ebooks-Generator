### Calling the Action from the Client
Now, inside your standard React component, you don't use `fetch` or `onSubmit`. You just pass the Server Action directly to the native `action` attribute of the `<form>` element!

```tsx
// app/profile/page.tsx
import { updateUser } from '@/actions/userActions';

export default function ProfilePage() {
  return (
    // Next.js intercepts this form submission and handles the network request to the server automatically!
    <form action={updateUser}>
      <input type="text" name="name" placeholder="New Name" />
      <button type="submit">Update</button>
    </form>
  );
}
```

### Progressive Enhancement
Because Server Actions use the native HTML `<form action="...">` attribute, they work **even before JavaScript has finished loading on the client.** 
If a user is on a terrible 3G connection, they can type their name and hit Submit, and the browser will execute a standard HTTP POST request to trigger the Server Action. It is incredibly resilient.
