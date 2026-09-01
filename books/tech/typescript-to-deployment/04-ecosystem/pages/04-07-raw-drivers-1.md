## Raw drivers and query builders

- An ORM generates SQL for you. Underneath it, something still has to open a socket to the database and speak its wire protocol
- That something is the **driver**, and every ORM in this booklet sits on top of one
- Knowing the driver matters because an ORM covers the common ninety percent and gets awkward at the edges
- A reporting query with three CTEs and a window function is clearer written as SQL than as a chain of method calls
- Drivers also expose the **connection pool**, which is where most database problems in production actually live
- Between the two sits a **query builder**, which composes SQL as JavaScript without managing entities or migrations for you
- Dropping to raw SQL is not a failure of the ORM. It is what the escape hatch exists for

### `pg` 8, the PostgreSQL driver

```ts
import { Pool } from "pg"

const pool = new Pool({ connectionString, max: 10 })

const { rows } = await pool.query(
  "SELECT id, total FROM orders WHERE seller_id = $1",
  [sellerId]
)
```

- `$1` is a real placeholder. The values never touch the SQL string
- Every ORM here sits on top of `pg`. Knowing it means you can drop down when you need to

### `mysql2` 3.24

```ts
import mysql from "mysql2/promise"
const pool = mysql.createPool({ host, user, database, connectionLimit: 10 })
const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id])
```

- Import `mysql2/promise`, not `mysql2`, or you get callbacks
