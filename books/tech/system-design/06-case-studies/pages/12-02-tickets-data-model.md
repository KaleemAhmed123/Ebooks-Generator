## Data model

- A naive approach is to use a counter: `UPDATE events SET seats_remaining = seats_remaining - 1`. This is a disaster. What if a user cancels? Which specific seat did they buy?
- **The Seat Row:** Every single physical seat in the stadium must have its own dedicated database row
  - `id: 1, event_id: 42, row: A, seat: 14, status: AVAILABLE`
- **The invariant:** The `status` column is the absolute source of truth. It can be `AVAILABLE`, `HELD`, or `BOOKED`
- To show the seat map, the frontend queries all rows for the event. This is read-heavy, so the seat map is heavily cached

### The failure

- Using a single integer counter for remaining inventory. A counter cannot track physical seat assignments, cannot be safely held without blocking all other users, and provides no audit trail of who owns which ticket.

:::interview
You design a booking system for a 50,000-seat stadium. Your database has an `Events` table with a `tickets_left` column. What is the fundamental flaw?

A counter cannot track physical seat assignments (Row A, Seat 14), and it creates massive database lock contention when 10,000 users try to decrement the same integer row simultaneously. You need a dedicated row per seat.
:::\n