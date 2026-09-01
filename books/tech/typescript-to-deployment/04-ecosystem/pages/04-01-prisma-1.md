# Module 4 - Databases

## Prisma

- Talking to a database from Node means writing SQL as strings and turning the rows that come back into objects by hand
- Nothing checks those strings. A renamed column compiles perfectly and fails at runtime, in production, on the one query nobody tested
- An **ORM** is Object Relational Mapper. It sits between your code and the database and generates that layer for you
- You describe your tables once, and the ORM gives you methods that build the SQL and map the results back
- Most ORMs describe tables as classes with decorators, which means your types and your schema live in the same fragile place
- Prisma takes a stricter route. The schema lives in its own file, and a fully typed client is generated from it
- Because the client is generated, it knows every table, column and relation, so a wrong field name is a compile error rather than a 500
- Migrations come from the same file, so the schema, the client and the database cannot disagree
- The cost is a generation step in your build, and less direct control over the exact SQL that gets sent
- For a reporting query with three CTEs and a window function, you will still drop to raw SQL
- Built by a team in Berlin, released in 2019 after a rewrite of an earlier GraphQL tool
- Version 7.10.0 is current, with 8.0 in release candidate

```bash
npm i prisma -D && npm i @prisma/client
npx prisma init
```
