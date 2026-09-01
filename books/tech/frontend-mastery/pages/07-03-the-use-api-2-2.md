### `useSyncExternalStore`

`use` handles data that React itself can suspend on. `useSyncExternalStore` handles the opposite case: state that lives outside React entirely and changes without React knowing. Browser APIs, a websocket connection, a third party store, `localStorage`.

Before this hook, people wired those up with `useEffect` and `useState`, which tears during concurrent rendering: one part of the tree reads the old value and another part reads the new one in the same frame.

```jsx
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useIsOnline() {
  return useSyncExternalStore(
    subscribe,                    // how to hear about changes
    () => navigator.onLine,       // read the value on the client
    () => true                    // read the value during server render
  );
}
```

The third argument exists because `navigator` does not exist on the server. Omit it and server rendering crashes.

You will rarely call this hook directly. Zustand, Redux, and Jotai all call it for you. Knowing it exists explains how they stay consistent under concurrent rendering.
