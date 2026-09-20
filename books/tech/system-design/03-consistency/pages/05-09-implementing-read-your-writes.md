## Implementing read-your-writes

- Two mechanisms. **Route by recency**: after a write, send that user's reads to the leader for a fixed window. **Carry a token**: return the write's position in the log to the client; a replica serves the read only if it has replayed past that position, otherwise the read goes to the leader
- The token in Postgres is a **log sequence number (LSN)**, the byte offset of a write in the write-ahead log. The primary reports its own with `pg_current_wal_lsn()`; a replica reports how far it has replayed with `pg_last_wal_replay_lsn()`

```typescript
// after the write, on the primary: hand the client a token
const { rows } = await primary.query("SELECT pg_current_wal_lsn() AS lsn");
const token = rows[0].lsn;                          // e.g. "0/16B3A48"; return it in a header or cookie

// on a read that carries a token: is this replica far enough along?
async function readFrom(replica: Client, primary: Client, token: string | null, sql: string) {
  if (token) {
    const { rows } = await replica.query(
      "SELECT pg_wal_lsn_diff(pg_last_wal_replay_lsn(), $1) >= 0 AS caught_up", [token]);
    if (!rows[0].caught_up) return primary.query(sql);   // behind: read at the leader
  }
  return replica.query(sql);
}
```

- The token is compared with `pg_wal_lsn_diff`, never as a string; LSNs are not zero-padded. The client stores only the newest token it has received; older ones are implied
- The time-window variant needs no token but needs a clock decision ("recent" = within the last second?) and sends every read from an active writer to the leader for that window, whether or not the replica has caught up. It is the cheaper thing to build and the more expensive thing to run

### The failure

- A "recent" window measured on the client's clock, compared with a server timestamp. The two clocks disagree by more than the replication lag (Module 9), and the window is either always open or never. Use the log position; it is the only measure of "caught up" that means anything
