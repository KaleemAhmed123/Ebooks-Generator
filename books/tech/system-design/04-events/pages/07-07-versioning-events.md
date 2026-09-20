## Versioning events

- In an Event-Driven Architecture, the Event Schema is the public API contract between services. 
- If you use plain JSON, you have a **Weak Schema**. The producer can add, remove, or rename fields at any time without warning.
- To prevent chaos at scale, mature engineering orgs use **Strong Schemas** (like Apache Avro or Protobuf) and a centralized Schema Registry.

```json
// An Avro Schema definition
{
  "namespace": "com.company.orders",
  "type": "record",
  "name": "OrderCreated",
  "fields": [
    { "name": "orderId", "type": "string" },
    { "name": "amount", "type": "double" },
    // If you add a field later, you MUST provide a default
    // value to maintain backward compatibility!
    { "name": "discountCode", "type": ["null", "string"], "default": null }
  ]
}
```

- When the producer tries to send a message, the Kafka client checks the payload against the Confluent Schema Registry. If the producer violates the contract, the client throws an error *before* the message hits the network.

### The failure

- A producer adds a required field, breaking 40 downstream consumers. A developer working on the Orders API decides they need to track `tax_amount`. They modify the plain JSON payload to include `"tax": 5.00`. But they also rename `"amount"` to `"subtotal"` to be more precise. They deploy. Instantly, the Billing service, the Analytics pipeline, the Fraud detector, and 37 other microservices crash because they were hardcoded to read `.amount`. Without a Schema Registry enforcing backward compatibility, modifying an event is like pulling a pin on a grenade
