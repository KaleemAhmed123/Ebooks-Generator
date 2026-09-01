## Server Actions

Historically, if you wanted to submit a form in React and save the data to a database, you had to follow a massive, multi-step process:
1. Create a `<form>` and attach an `onSubmit` handler.
2. Prevent the default browser refresh (`e.preventDefault()`).
3. Serialize the form data into JSON.
4. Execute `fetch('/api/submit')`.
5. Create a completely separate file (`pages/api/submit.js`).
6. Parse the JSON body in that API route, validate it, and save it to the DB.

**Next.js Server Actions completely eliminate the API route.**

### What is a Server Action?
A Server Action is an asynchronous JavaScript function that runs exclusively on the server, but can be called directly from a Client Component or a Server Component.

You define a Server Action by adding the `"use server"` directive at the very top of the function.

```tsx
// actions/userActions.ts
"use server"; // This tells Next.js this code MUST run on the server

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateUser(formData: FormData) {
  // We can securely read the database here because this is the server!
  const name = formData.get('name');
  
  await db.user.update({ name });
  
  // Instantly purge the cache for the homepage so the new name shows up
  revalidatePath('/'); 
}
```
