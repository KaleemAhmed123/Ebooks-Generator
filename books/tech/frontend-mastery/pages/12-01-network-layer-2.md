## REST APIs vs GraphQL

- **REST (Representational State Transfer):** The traditional way to design APIs
  - You have multiple endpoints: `/users`, `/posts`, `/comments`
  - If you need a user's details, their latest post, and the comments on that post, you might have to make 3 separate HTTP requests
  - REST often suffers from "Overfetching" (getting 50 fields when you only needed 2) or "Underfetching" (needing to make subsequent requests)

- **GraphQL:** Developed by Facebook to solve the REST bottlenecks
  - You have exactly ONE endpoint: `/graphql`
  - You send a query defining the exact shape of the data you want, and the server returns exactly that shape. Nothing more, nothing less
  - It solves the N+1 request problem because you can ask for the user, their posts, and comments all in a single query

```graphql
// A GraphQL Query
query {
  user(id: "123") {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}
```

### Apollo Client

- While you can technically `fetch()` a GraphQL endpoint, managing the cache manually is a nightmare
- **Apollo Client** is the industry standard tool for GraphQL in React
- It automatically normalizes and caches your data. If you query for User 123's name on the homepage, and then navigate to their profile, Apollo serves it from the cache instantly without hitting the network
