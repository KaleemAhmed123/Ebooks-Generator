## IndexedDB for Offline Architecture

If you are building an offline-first Progressive Web App (PWA), you need to store data on the user's device.

Beginners immediately reach for `localStorage`. 
**This is a mistake.** `localStorage` is synchronous (meaning reading/writing from it blocks the main JavaScript thread and freezes the UI). More importantly, it has a strict size limit (usually around 5MB) and can only store Strings.

If you need to store arrays, objects, Files, Blobs (like images), or massive datasets, you must use **IndexedDB**.

### What is IndexedDB?
IndexedDB is a full-blown NoSQL database built directly into the browser. It is asynchronous (it does not block the UI), and it can store hundreds of Megabytes (or even Gigabytes) of structured data.

It is how Google Docs allows you to edit documents while on an airplane without an internet connection.

### The Problem with the Native API
The native IndexedDB API is notoriously awful. It is based on ancient, event-driven callbacks rather than modern Promises.

```javascript
// The Native Nightmare
const request = window.indexedDB.open("MyDatabase", 1);
request.onerror = (event) => console.error("Error");
request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(["customers"], "readwrite");
  const objectStore = transaction.objectStore("customers");
  const addRequest = objectStore.add({ id: 1, name: "Alice" });
  addRequest.onsuccess = () => console.log("Added!");
};
```
