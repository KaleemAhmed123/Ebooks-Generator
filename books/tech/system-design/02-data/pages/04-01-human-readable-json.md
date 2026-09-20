# Module 4 - Encoding and schema evolution

## Human-readable JSON

- When data leaves the database to go over the network, it must be encoded into a sequence of bytes. The most ubiquitous format is JSON
- JSON is text-based and schema-less. The structure (keys like `"firstName"`) is repeated in every single message, which inflates the payload size. However, any developer can read it without needing external tools

<svg viewBox="0 0 460 140" role="img" aria-label="JSON payload size inflation. The key 'firstName' consumes 11 bytes in every single payload, while the value 'Alice' only consumes 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="360" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="70" y="45" font-family="monospace">{</text>
  <text x="90" y="65" font-family="monospace">"firstName": "Alice",</text>
  <text x="90" y="85" font-family="monospace">"balance": 9007199254740992</text>
  <text x="70" y="105" font-family="monospace">}</text>
  
  <rect x="90" y="55" width="85" height="12" fill="none" stroke="#b8541a" stroke-dasharray="2 2"/>
  <text x="132" y="50" text-anchor="middle" font-size="7" fill="#b8541a">Repeated string (11 bytes)</text>
</svg>

- JSON does not distinguish between integers and floating-point numbers. It just has "numbers"

### The failure

- Storing a 64-bit ID (like a Twitter Snowflake or a Discord ID) as a JSON number. According to RFC 8259, JSON parsers built on IEEE 754 double-precision floats only guarantee exact integer interoperability in the range `[-(2^53)+1, (2^53)-1]`
- If you send the ID `9007199254740993` in JSON, a JavaScript client will silently parse it as `9007199254740992`. It truncates the ID, breaking your API. You must encode 64-bit IDs as JSON strings
