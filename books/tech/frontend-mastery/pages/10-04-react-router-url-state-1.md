## URL State: The Ultimate State Manager

One of the worst user experiences on the web is searching for a product on an e-commerce site, applying 3 complex filters (Size, Color, Price), clicking on a product, and then hitting the "Back" button... only to find that your search and filters have completely disappeared.

Why did they disappear? Because the developer put the search query and the filters into `useState`.

When the user navigated away from the page, the component unmounted, and the `useState` memory was destroyed. When they clicked back, the component remounted with its initial state (`""` or `null`).

### The Rule of the URL
If a user might want to bookmark a page, share the link with a friend, or use the browser's Back/Forward buttons, the state that controls what they are seeing **must** live in the URL.

The URL is the most resilient, sharable, and globally accessible state manager in your application.
