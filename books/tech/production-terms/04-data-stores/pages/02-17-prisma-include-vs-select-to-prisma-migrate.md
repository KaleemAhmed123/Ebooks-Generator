## Prisma include vs select

`include` adds relations to the full model. `select` returns exactly the fields
you list. If you never use `select`, over-fetching is your default.

`include: { posts: true }` on a user with five thousand posts pulls all five
thousand into memory to render ten of them.

The failure scales with your most successful users, which is the worst possible
correlation: the account with the most data is the account that matters most and
the one whose page times out.

On any hot path, name the fields and bound the relation — `select` with a `take`
on the nested query. It is more typing and it is the difference between a
constant-cost endpoint and one that degrades as the account grows.

## Prisma Migrate

Schema-first migrations generated from `schema.prisma`. `migrate dev` locally,
`migrate deploy` in CI and production.

**Never run `db push` against production.** It reshapes the database to match
the schema by whatever means necessary, which includes silently dropping a
column — data loss with no migration record and no rollback path.

The flow that works: edit the schema, run `migrate dev` to generate the SQL,
read the SQL, commit it, and let `migrate deploy` apply the committed file
everywhere else.

Reading the generated SQL is the step people skip. It is also the only point at
which a destructive migration is still cheap to notice.
