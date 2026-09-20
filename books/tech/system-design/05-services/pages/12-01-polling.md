## Polling

- HTTP was designed in the 1990s as a one-way protocol. The client asks for a document, the server replies, and the connection closes. The server cannot initiate a conversation with the client
- If you are building a chat app, the client needs to know when a new message arrives. The simplest solution is Short Polling: the client runs `setInterval(fetch, 1000)` to ask the server "Are there any new messages?" every second
- This is incredibly easy to build, because it is just standard HTTP. It scales perfectly behind load balancers

### The failure

- The failure is the sheer waste of resources. If you have 100,000 users with your app open, your server will receive 100,000 requests every single second. 99% of those requests will return an empty array, because no new message arrived in that exact second
- Your server spends all its CPU and database capacity answering "No". Furthermore, if the app is on a mobile phone, waking up the radio antenna every second will drain the user's battery in a few hours. Do not use Short Polling for real-time apps at scale
