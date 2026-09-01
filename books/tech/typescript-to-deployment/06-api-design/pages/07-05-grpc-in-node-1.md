## gRPC in Node, end to end

- The contract comes first. Everything else is generated from or checked against it

```proto
syntax = "proto3";
package orders.v1;

service Orders {
  rpc GetOrder   (GetOrderRequest) returns (Order);
  rpc ListOrders (ListRequest)     returns (stream Order);
}

message GetOrderRequest { string id = 1; }

message Order {
  string id = 1;
  string seller_id = 2;
  int64  total_paise = 3;
}
```

```bash
npm i @grpc/grpc-js @grpc/proto-loader
```

```ts
import * as grpc from "@grpc/grpc-js"
import * as loader from "@grpc/proto-loader"

const def = loader.loadSync("orders.proto", { longs: String, defaults: true })
const proto = grpc.loadPackageDefinition(def) as any

const server = new grpc.Server()

server.addService(proto.orders.v1.Orders.service, {
  GetOrder: async (call, callback) => {
    const order = await db.order.findUnique({ where: { id: call.request.id } })
    if (!order) {
      return callback({ code: grpc.status.NOT_FOUND, message: "order not found" })
    }
    callback(null, { id: order.id, seller_id: order.sellerId, total_paise: order.total })
  },
