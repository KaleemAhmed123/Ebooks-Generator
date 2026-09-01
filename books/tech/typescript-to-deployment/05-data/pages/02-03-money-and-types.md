## Choosing column types

- Column types are not decoration. They decide what the database can enforce and how much space a row takes

| Use | Not | Because |
|---|---|---|
| `TEXT` | `VARCHAR(255)` | in Postgres they perform identically, and the limit is arbitrary |
| `TIMESTAMPTZ` | `TIMESTAMP` | one is a moment in time, the other is a reading with no timezone |
| `INTEGER` paise | `FLOAT` rupees | floats cannot represent 0.1 exactly |
| `NUMERIC` | `FLOAT` | when you need exact decimals and are not using integers |
| `BOOLEAN` | `SMALLINT` | says what it means, and the database checks it |
| `JSONB` | `JSON` | `JSONB` is parsed once, indexable, and faster to read |
| `UUID` | `TEXT` | half the storage, and the format is enforced |

### Money is never a float

```sql
SELECT 0.1::float + 0.2::float;   -- 0.30000000000000004
```

- Floating point stores binary fractions, and `0.1` has no exact binary form, the same way `1/3` has no exact decimal form
- Two ways out, and both are used in production
- **Integer minor units.** Store 50000 for 500 rupees. Simple, fast, and every arithmetic result is exact
- **`NUMERIC`.** Arbitrary precision decimals, exact but slower, and it arrives in JavaScript as a string because `Number` cannot hold it safely

### Enum columns

- A `CHECK` constraint is usually better than a real `ENUM` type
- Adding a value to a Postgres enum used to require locking the type, whereas a `CHECK` is a constraint you can drop and recreate
