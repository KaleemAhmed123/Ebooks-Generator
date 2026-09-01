## helmet and cors

- A browser will do things on a user's behalf that a user never asked for, and most web attacks live in that gap
- It will run any script the page contains, frame your page inside someone else's, guess a response's type, and attach cookies to requests it did not originate
- Response **headers** are how a server tells the browser to stop doing those things
- Each header disables one behavior, and none of them are on by default, because the web is old and the defaults are permissive
- `helmet` sets that group of headers in one line, which is why it appears at the top of nearly every Express app
- **CORS**, Cross-Origin Resource Sharing, is the browser rule that stops a page on one origin reading a response from another
- Without it, any site you visited could read your responses using your logged-in cookies
- The `cors` package answers the browser's preflight and sets the headers that grant specific origins access
- Both are browser-enforced. Neither is access control, and `curl` ignores them completely
- helmet version 8.3.0, cors version 2.8.5
