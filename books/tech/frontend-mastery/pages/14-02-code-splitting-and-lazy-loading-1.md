## Code Splitting & Lazy Loading

When you build a standard React application (using Webpack or Vite), the bundler grabs every single React component, every utility function, and every third-party NPM library, and smashes them together into one giant file called `bundle.js`.

If your application has 50 different pages, the user must download the JavaScript for all 50 pages before they can view the Homepage. If the bundle is 5 Megabytes, a user on a 3G mobile connection might stare at a white screen for 10 seconds. This guarantees they will close the tab and never return.

### The Solution: Route-Based Code Splitting

You must split your application into smaller chunks. 
Instead of sending one massive `bundle.js`, you send a tiny `main.js` (containing just React and the Router), and a separate `homepage.js` (containing just the components needed for the Homepage). 

If the user clicks the "Settings" link, the browser dynamically fetches `settings.js` at that exact moment.
