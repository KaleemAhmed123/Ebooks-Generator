## `refresh`

- Refreshes the client router from inside a Server Action
- Nothing to do with the data cache. It re-renders what the user is looking at

```ts
"use server"
import { refresh } from "next/cache"

export async function markNotificationRead(id: string) {
  await db.notifications.update({ where: { id }, data: { read: true } })
  refresh()
}
```

- Use it when a number in the header has to change, not the data on the page

### Picking between the three

| You want | Use |
|---|---|
| the user to see their own write immediately | `updateTag` |
| everyone to get it soon, stale is fine meanwhile | `revalidateTag` |
| the current screen re-rendered | `refresh` |

- Calling all three is a sign you have not decided what changed
