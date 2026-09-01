### The App Router (The Modern Way)
The App Router has no `getServerSideProps` and no `getStaticProps`.
It is built natively on top of **React Server Components (RSC)**.

Because every component in the `app/` directory is a Server Component by default, **any component can fetch its own data directly from the database.**

```tsx
// app/dashboard/page.tsx (This runs on the Server!)
import { db } from '@/lib/db';
import { Sidebar } from './Sidebar';

export default async function DashboardPage() {
  // We can fetch data right here!
  const user = await db.getUser();

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Sidebar can fetch its OWN data internally! No prop drilling! */}
      <Sidebar /> 
    </div>
  );
}
```

### Route Segments and Folders
In the App Router, files do not become routes. **Folders** become routes.
If you create a folder `app/dashboard/settings/`, the URL `/dashboard/settings` is created.

However, to actually render UI for that URL, you must put a file named strictly `page.tsx` inside that folder. 
This allows you to safely colocate your components! You can put `Button.tsx` and `SettingsForm.tsx` right next to your `page.tsx` file inside the `app/dashboard/settings/` folder. Because they are not named `page.tsx`, Next.js will not turn them into public URLs.
