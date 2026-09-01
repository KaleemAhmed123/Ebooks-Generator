## Service Workers & Progressive Web Apps (PWA)

In the past, if a user opened your website on their phone while on the subway without an internet connection, they saw the dreaded "No Internet Connection" dinosaur game.

Today, users expect native-app-like experiences from the web. They expect the app to load instantly, work offline, and even send push notifications. You build this using a **Progressive Web App (PWA)**, which is powered entirely by a **Service Worker**.

### What is a Service Worker?
A Service Worker is a special JavaScript file that runs in the background of the browser, completely separate from your main React thread. 

It acts as a programmable network proxy. When your React app executes `fetch('/api/movies')`, the request doesn't go straight to the internet. It goes to the Service Worker first. 

```javascript
// A simple Service Worker intercepting a fetch request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Check if the user has an internet connection
    fetch(event.request).catch(() => {
      // If offline, return a cached version of the data!
      return caches.match(event.request);
    })
  );
});
```

### The Caching Strategies
You must decide how your Service Worker handles data. The three most common strategies are:

1. **Cache First (For Static Assets):** The worker checks the cache for `logo.png`. If it exists, it returns it instantly without ever hitting the network. This makes subsequent loads of your app blazing fast.
2. **Network First (For Dynamic Data):** The worker tries to fetch `/api/user-profile` from the internet. If the internet fails (subway), it falls back to the last cached version.
3. **Stale-While-Revalidate:** The worker instantly returns the cached data so the user sees *something* immediately, but secretly goes to the network in the background to fetch fresh data and updates the cache for next time.
