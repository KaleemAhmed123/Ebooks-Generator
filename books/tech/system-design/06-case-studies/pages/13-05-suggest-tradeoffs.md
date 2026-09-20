## What the interviewer probes

- **Client debounce:** The client must not send a request for every single keystroke. It should debounce (wait 50ms). If the user types "apple" very fast, only the request for "apple" is sent
- **Browser cache:** The API response must include a `Cache-Control` header (e.g., 1 hour). If the user deletes a character (backspace), the browser uses the cached response for the previous prefix instantly
- **Personalisation:** True personalization is too expensive to compute globally. You build a global Trie, and the client merges it with a tiny, local, on-device SQLite database of the user's past searches

### The failure

- Failing to implement debounce. A user typing 60 WPM will generate 5 useless requests for "a", "ap", "app", "appl", and "apple", quintupling your server costs.

:::interview
Your API is receiving 5x more traffic than expected. The logs show users requesting "c", then "ca", then "cat" in under 100 milliseconds. How do you reduce load?

Implement client-side debouncing. The frontend JavaScript should wait 50ms after a keystroke before firing an API request, ignoring intermediate prefixes if the user types fast.
:::\n