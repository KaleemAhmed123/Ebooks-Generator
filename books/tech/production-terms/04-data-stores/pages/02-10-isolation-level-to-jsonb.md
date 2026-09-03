## Isolation Level

How much concurrent transactions can see of one another. Postgres defaults to
Read Committed, which permits non-repeatable reads.

Two requests read a seat count of 1 and both book it. Read Committed allows
exactly that, and the bug appears only under load, which is when it is most
expensive.

| Level | Permits |
|---|---|
| Read Committed — the default | non-repeatable reads; the seat bug above |
| Repeatable Read | a stable snapshot; no phantoms in Postgres |
| Serializable | behaves as if transactions ran one at a time |

For a single contended row, `SELECT ... FOR UPDATE` is the smaller instrument
and usually the right one. Raising the isolation level for the whole transaction
to fix one row is a large hammer with retry consequences.

## JSONB

Binary JSON storage with GIN indexing and containment operators. Excellent for
genuinely variable data, and a poor excuse for skipping schema design.

Storing OCR metadata as JSONB with a GIN index makes
`metadata @> '{"lang":"hi"}'` fast. Storing your core user fields there costs
you constraints, types and every guarantee the database exists to provide.

`json` stores text and reparses it on every read. `jsonb` stores a binary form
and can be indexed. There is almost never a reason to choose the first.

The question to ask before reaching for it: **is this data genuinely variable,
or do I just not want to write a migration today?**
