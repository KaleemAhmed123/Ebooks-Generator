## GraphQL & Apollo Client

If you are using a REST API, React Query is the definitive standard for Server State. However, if your backend architecture is built on **GraphQL**, you need a tool specifically designed to handle the complexities of GraphQL caching.

That tool is **Apollo Client**.

### Why GraphQL Needs a Specialized Cache
In a REST API, every resource has a unique URL. `/users/1` is inherently different from `/posts/5`. React Query caches responses based on unique string keys (like `['user', 1]`).

In GraphQL, there is only ONE endpoint (`/graphql`). All requests go to the exact same URL. Furthermore, you can ask for wildly different shapes of data in a single request. 

```graphql
query GetUserMinimal {
  user(id: "1") {
    id
    name
  }
}

query GetUserFull {
  user(id: "1") {
    id
    name
    email
  }
}
```

If we run Request 1, and then navigate to the Profile page and run Request 2, Apollo Client does something specific:
1. It already knows the User's name from Request 1.
2. It instantly displays the User's name on the screen from the cache.
3. It makes Request 2 to the server, but it merges the new `email` field into the existing cache object for User `1`.

Apollo Client normalizes data. It breaks down every GraphQL response into individual objects, stores them flat in memory by their `id`, and stitches them back together instantly when a React component asks for them.
