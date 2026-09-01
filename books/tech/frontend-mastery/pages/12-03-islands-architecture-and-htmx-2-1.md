## Islands Architecture and HTMX - continued

```astro
<!-- client:visible tells Astro to only load and execute the JS 
         for this specific React component when it scrolls into view! -->
    <InteractiveCarousel client:visible />
  </body>
</html>
```

This gives you the Developer Experience (DX) of React, but the performance of a static HTML site from 1999. It is arguably the best architecture currently available for content-driven websites.

### HTMX and the Hypermedia Renaissance

While Astro focuses on content sites, what about highly dynamic CRUD (Create, Read, Update, Delete) applications? Do we need React/Redux/Zustand to manage the state of a simple settings page?

**HTMX** argues that the problem isn't the browser; the problem is that we abandoned HTML.

In a React SPA, the server returns JSON data, and the client runs thousands of lines of JavaScript to parse the JSON, update a client-side state store, and figure out how to mutate the DOM.

HTMX allows you to access AJAX, CSS Transitions, WebSockets, and Server Sent Events directly in HTML, using attributes. 

**The core philosophy: The server returns HTML, not JSON. The HTML *is* the state.**

```html
<!-- When clicked, issue a PUT request to /contact/1. 
     Take the HTML response and swap it into the element with id="contact-form" -->
<button 
  hx-put="/contact/1" 
  hx-target="#contact-form" 
  hx-swap="outerHTML"
>
  Update Contact
</button>
```
