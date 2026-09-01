## Effect Events, Activity, and the Small Wins - continued

The rule of thumb: what the Effect **synchronizes with** goes in the dependency array. What the Effect **does in response to something happening** goes in an Effect Event. Only call Effect Events from inside Effects, and never pass one to a child.

### `<Activity>`

Hiding a component with `display: none` keeps its state but keeps its Effects running, its timers alive, and its subscriptions open. Unmounting it stops all of that but throws away scroll position, form drafts, and every piece of local state.

`<Activity>` is the third option.

```jsx
import { Activity } from 'react';

<Activity mode={tab === 'inbox' ? 'visible' : 'hidden'}>
  <Inbox />
</Activity>
```

In `hidden` mode React hides the children, **unmounts the Effects** so subscriptions and timers stop, but **keeps the state**. Switch back and the scroll position and the half typed reply are still there. React also renders hidden activities at low priority, so a tab the user has not opened yet can be prepared in the background without competing with what is on screen.
