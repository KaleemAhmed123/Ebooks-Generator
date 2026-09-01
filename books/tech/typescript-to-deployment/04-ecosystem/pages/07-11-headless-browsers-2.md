### Running it in production

- **Never in a request handler.** Launch takes a second or more and a burst will exhaust memory. Put it on a queue
- **Reuse the browser, create a page per job.** Launching per job is the common performance mistake
- **Always close in a `finally`.** A leaked browser process survives the request and eventually fills the machine
- The Docker image needs system fonts and shared libraries. Use the official Playwright image rather than debugging missing `.so` files
- **`printBackground: true`** or every background color silently disappears from the PDF

### Before reaching for it

- For a simple document, `pdf-lib` is a fraction of the weight
- For scraping, check whether the site has an API or server-rendered HTML that `undici` can fetch directly
