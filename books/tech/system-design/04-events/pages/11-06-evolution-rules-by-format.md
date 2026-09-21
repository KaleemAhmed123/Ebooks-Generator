## Schema formats and their evolution rules

| Format | Encoding | Adding a field | Removing a field | The trap |
|---|---|---|---|---|
| Avro | binary, needs a registry | safe if it has a default | safe if it had a default | reader missing a writer field with no default: "an error is signalled" |
| Protobuf | binary, needs a registry | always safe | mark `reserved`, never reuse the number | "changing field numbers for any existing field is not safe" |
| JSON Schema | text, no registry required | safe by convention only | breaks any reader still checking for it | nothing enforces the schema at write time |

- Avro resolves reader and writer schemas independently at read time: a field the writer has and the reader does not is "ignored"; a field the reader expects and the writer does not have falls back to the reader's declared default, or errors if there is none. Aliases let a field be renamed without breaking either side
- Protobuf's field number, not the field name, is what's on the wire — renumbering a field is indistinguishable from deleting the old one and adding a new one. Marking a removed number `reserved` stops it being accidentally reused later, and proto3 preserves unknown fields it does not recognise instead of dropping them
- JSON with no schema at all pushes every one of these rules onto human discipline: nothing rejects a field that silently changes from a number to a string. This is the version of "adding a field" with no format-level safety net — the registry (page 4) and a compatibility mode (page 5) are what most systems add back

### The failure

- Renumbering a Protobuf field during a "cleanup" pass. The field name reads better, the number moved, and every message already on the wire with the old number now decodes into a different, wrong field on the new code — silently, no error, because Protobuf never looks at the name
