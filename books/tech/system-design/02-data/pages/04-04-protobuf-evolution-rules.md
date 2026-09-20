## Protobuf evolution rules

- The field number is the contract. Everything that is safe follows from that

| Change | Safe? | Why |
|---|---|---|
| Add a field | Yes | Old readers skip unknown numbers; proto3 keeps them and writes them back on re-serialize |
| Rename a field | Yes, on the wire | The name is not encoded; generated code and JSON mappings do change |
| Delete a field | Only with `reserved` | The number and name must never be reused |
| Renumber a field | Never | Old data decodes into the wrong field |
| Change the type | Only within one wire type | `int32` ↔ `int64` ↔ `bool` share varint; `string` ↔ `int32` do not |

```protobuf
message Order {
  reserved 2;             // was: string coupon = 2;
  reserved "coupon";
  string id       = 1;
  int32  quantity = 3;    // 0 and "not set" look the same under implicit presence
}
```

- Numbers run from 1 to 536,870,911; 19,000–19,999 are reserved for the runtime
- **Editions** (2023, 2024) replace the `proto2` / `proto3` syntax lines. The one setting that matters here is `field_presence`: `IMPLICIT` fields are not serialized when they hold the default, so a reader cannot tell `0` from "absent". `EXPLICIT` presence gives you `has_quantity()`

### The failure

- A field number reused. Six months after `coupon = 2` was deleted, someone adds `int32 discount_pct = 2`. Messages from the old producer, and every row that stored the old bytes, now decode a string's bytes as a varint. No error, wrong numbers
- Implicit presence on a field where zero means something. `quantity = 0` and "quantity not given" arrive as the same bytes; the consumer cannot ask which
