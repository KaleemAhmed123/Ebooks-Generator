# Module 7 - GraphQL, gRPC and tRPC

## GraphQL

- REST endpoints are fixed shapes decided by the server, and clients rarely want exactly that shape
- A mobile screen needing three fields downloads forty, which is **over-fetching**
- A screen needing an order, its seller and its items makes three round trips, which is **under-fetching**
- Adding `/orders-for-mobile-home-screen` solves it once and starts an endless list of screen-shaped endpoints
- **GraphQL** moves the choice to the caller. One endpoint, and the query states exactly which fields are wanted
- The schema is typed and introspectable, so tooling can generate clients and validate queries before they run
- Created at Facebook in 2012 for exactly the mobile over-fetching problem, open sourced in 2015
