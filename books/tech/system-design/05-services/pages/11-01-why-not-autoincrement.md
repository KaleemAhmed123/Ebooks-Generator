## Why not AUTO_INCREMENT

- When you start a new project, every database table usually gets an integer Primary Key with `AUTO_INCREMENT` (or `SERIAL` in Postgres)
- This means the single database instance is the global authority on generating IDs. It guarantees that if the last user was `id=4`, the next user is `id=5`
- At massive scale, this completely breaks down:

| Problem | Explanation |
|---|---|
| **Sharding** | If you split your users across two database servers, Server A and Server B will both generate `id=1`. When you try to merge or query data, you have a collision. |
| **Information Leakage** | If I register for your app and my ID is `405`, and I register again tomorrow and my ID is `420`, I know exactly how many users signed up in the last 24 hours. |
| **Write Bottlenecks** | To get an ID, you *must* insert a row into the database. You cannot generate the ID in the application code beforehand. |

### The failure

- The failure is realizing you need to shard your database, but your entire application relies on `AUTO_INCREMENT` IDs. You cannot easily migrate `user_id = 4` to a sharded environment without risking collisions
- To scale horizontally, you must move ID generation out of the database engine and into the application, or use an algorithm that guarantees global uniqueness without needing a central coordinator
