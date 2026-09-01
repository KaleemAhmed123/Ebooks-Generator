### Using `useQuery` in Apollo

The API for Apollo Client looks very similar to React Query, but instead of passing a fetch function, you pass a parsed GraphQL AST (Abstract Syntax Tree) using the `gql` template literal tag.

```tsx
import { useQuery, gql } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

function UserProfile({ userId }) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <h1>{data.user.name}</h1>;
}
```

If your company uses GraphQL, Apollo Client is the most powerful piece of architecture in your frontend stack. If they use REST, stick to React Query.
