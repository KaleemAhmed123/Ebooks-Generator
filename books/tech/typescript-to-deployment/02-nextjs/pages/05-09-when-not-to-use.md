## When not to use Next.js as your backend

- The honest limits, worth knowing before the architecture is set

### It is a poor fit for

- **Long-running work.** Serverless functions have a hard timeout. A ten-minute report is not a route handler, it is a queue job
- **Background jobs and cron.** There is no worker process. Something outside the app has to run them
- **Stateful connections.** WebSockets need a server that stays up. Serverless functions do not
- **A shared API for many clients.** A mobile app and a partner integration should not depend on your web app's deploy schedule
- **Heavy CPU work.** Image or video processing on request will time out and cost more than a queue would
- **Strict framework independence.** Server Actions and the caching model are Next.js specific. Porting them later is a rewrite

### The shape that works well

- Next.js serves the UI and the routes that belong to it
- A separate service owns queues, workers, WebSockets and the public API
- They share a database, or talk over a queue

- The framework renders. Separate services do the work
