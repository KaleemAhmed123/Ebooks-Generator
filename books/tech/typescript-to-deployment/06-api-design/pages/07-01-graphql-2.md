## GraphQL - continued

```graphql
type Order {
  id: ID!
  totalPaise: Int!
  status: OrderStatus!
  seller: Seller!
  items: [OrderItem!]!
}

type Query {
  order(id: ID!): Order
  orders(sellerId: ID!, first: Int, after: String): OrderConnection!
}
```

```graphql
query {
  order(id: "o_842") {
    id
    totalPaise
    seller { name }
  }
}
```

- One request, three fields, nothing else transferred
