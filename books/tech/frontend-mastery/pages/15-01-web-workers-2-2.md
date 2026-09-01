### LocalStorage vs IndexedDB

- **LocalStorage:** A simple key-value store. It is synchronous, meaning reading from it blocks the main thread. It is limited to ~5MB. Perfect for storing user preferences (like Dark Mode) or lightweight cached data
- **IndexedDB:** An asynchronous, NoSQL database built into the browser. It does not block the main thread and can handle gigabytes of data. Use this when building Offline-First Progressive Web Apps (PWAs) that need to cache heavy API responses or files

## Service Workers

- A specialized type of Web Worker that acts as a proxy server sitting between your web application and the network
- It intercepts network requests. If the user loses their internet connection, the Service Worker can catch the failed request and serve a cached version of the app from IndexedDB instead, allowing the app to run completely offline
