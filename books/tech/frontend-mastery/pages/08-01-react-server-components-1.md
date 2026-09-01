# Module 8: Server React And The Compiler

## React Server Components and Edge Computing

For the first decade of React's existence, it was almost entirely a client-side library. Even with Server-Side Rendering (SSR) in frameworks like Next.js, the server's job was just to generate an initial HTML string. Once that HTML hit the browser, a massive JavaScript bundle had to be downloaded, parsed, and executed to "hydrate" the page and make it interactive.

**React Server Components (RSC)** represent a fundamental paradigm shift. They allow you to write components that run *only* on the server and are *never* sent to the client.

### The Problem with Traditional SSR

In a traditional SSR setup (like `getServerSideProps` in older Next.js), you fetch data on the server, pass it down as JSON props, and render the entire component tree. 
However, you still have to send the JavaScript for that entire component tree to the client. If your component uses a massive 2MB markdown parsing library, that 2MB library must be downloaded by the user's phone just so React can hydrate the component and attach event listeners.
