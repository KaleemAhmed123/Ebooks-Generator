## gRPC in Node, end to end - continued

ListOrders: async (call) => {
    for await (const order of db.order.findMany({ ... })) call.write(order)
    call.end()
  },
})

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {})
```

- `int64` arrives as a string with `longs: String`, because JavaScript numbers cannot hold it safely
- Errors are status **codes**, not exceptions. `NOT_FOUND`, `PERMISSION_DENIED`, `INVALID_ARGUMENT`, `UNAVAILABLE`
- A streaming method writes many messages down one call and ends it, which is where gRPC beats a REST loop
