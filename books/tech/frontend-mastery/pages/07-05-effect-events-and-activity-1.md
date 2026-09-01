## Effect Events, Activity, and the Small Wins

### `useEffectEvent`

The dependency array has one rule that keeps breaking: every reactive value the Effect reads must be listed. Follow it honestly and the Effect re-runs for reasons that have nothing to do with what it does.

```jsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);   // reads theme
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]);   // theme is listed, so the chat reconnects on a theme switch
}
```

Changing the color scheme should not drop a websocket. Removing `theme` from the array silences the linter and creates a stale closure: the notification keeps showing last month's theme forever.

`useEffectEvent`, stable in React 19.2, splits the difference. Code inside it always sees the latest props and state, but it is not reactive, so it never belongs in the dependency array.

```jsx
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);     // always the current theme
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => onConnected());
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);          // theme is gone, and the linter agrees
}
```
