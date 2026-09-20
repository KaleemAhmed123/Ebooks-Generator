## Pre-allocating inventory

- Even with a waiting room and Redis shedding load, the backend database must eventually write the 50,000 successful ticket sales. A common mistake is using SQL `INSERT` statements to create the tickets during the sale
- `INSERT` is an expensive operation. The database has to allocate new blocks on the disk, update primary key indexes, and check foreign key constraints in real-time

| Strategy | When the work happens | Risk during the burst |
|---|---|---|
| **Dynamic Schema (`INSERT`)** | During the 10:00 AM burst. | High. B-Tree index splits and page allocations slow down the database. |
| **Pre-allocated Inventory (`UPDATE`)** | Three weeks ago. | Zero. The rows already exist on disk. The database just flips a boolean flag in place. |

- **Pre-allocation**: Weeks before the Taylor Swift concert, Ticketmaster runs a background job that inserts all 50,000 rows into the `Tickets` table with `status = 'AVAILABLE'`. 
- During the drop at 10:00 AM, the application only ever runs `UPDATE tickets SET status = 'SOLD', user_id = ? WHERE id = ?`. Because the row size doesn't change, Postgres can update the row efficiently without rewriting indexes (known as HOT updates)

### The failure

- Doing expensive relational checks during the drop. If your `INSERT` statement requires Postgres to verify that the `venue_id` exists, the `event_id` exists, and the user hasn't exceeded their limit, you are burning precious CPU. By pre-allocating the inventory, you move all relational validation to an offline cron job. The live drop becomes a simple, blazing-fast state machine flip
