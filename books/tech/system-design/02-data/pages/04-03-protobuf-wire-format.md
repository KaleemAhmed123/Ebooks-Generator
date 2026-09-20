## Protobuf: numbers on the wire, not names

- Protocol Buffers (the encoding under gRPC) needs a schema, the `.proto` file, on both sides. Because both sides have it, the field names never leave it
- Each value on the wire is a tag and a payload. The tag is one varint: `(field_number << 3) | wire_type`. Field numbers 1–15 fit in one byte; use them for the fields sent most

<svg viewBox="0 0 460 140" role="img" aria-label="Protobuf wire format. The schema defines string firstName = 1. On the wire, it sends only a 1-byte tag (combining the field number and wire type) followed by the length and value." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="160" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="30" y="37" font-family="monospace">message User {</text>
  <text x="40" y="52" font-family="monospace">string firstName = 1;</text>
  <text x="30" y="62" font-family="monospace">}</text>
  
  <rect x="220" y="40" width="220" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="330" y="58" text-anchor="middle" font-family="monospace">[0A] [05] [41 6C 69 63 65]</text>
  
  <path d="M180 45 L220 55" stroke="#1a1a1a" fill="none"/><path d="M220 55 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 220 55)"/>
  
  <text x="250" y="90" text-anchor="middle" font-size="7">Tag (1 byte)</text>
  <text x="250" y="100" text-anchor="middle" font-size="7">Field 1 + Wire Type 2</text>
  <path d="M250 82 L250 72" stroke="#1a1a1a" fill="none"/>
  
  <text x="390" y="90" text-anchor="middle" font-size="7">"Alice" (5 bytes)</text>
  <path d="M390 82 L390 72" stroke="#1a1a1a" fill="none"/>
</svg>

- A **varint** is a variable-length integer: small values take one byte, large ones up to ten. Integers, booleans and enums all travel that way
- Renaming a field is free, because the name is not on the wire. Renumbering is not: the number is the field's identity (next page)

### The failure

- Believing the bytes are self-describing. Without the `.proto`, a Protobuf message is a list of (number, wire type, bytes): no names, no types beyond "varint" or "length-delimited". Decoding it with the wrong schema does not fail; it produces a valid-looking, wrong message
