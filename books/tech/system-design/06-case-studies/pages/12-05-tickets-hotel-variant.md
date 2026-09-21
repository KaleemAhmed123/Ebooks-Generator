## Date-range inventory

- A hotel sells a room type for a range of nights, not a numbered seat for one event, so the row is `(room_type, night)` with a count, and a booking is one row per night in its range. Same invariants, different grain: the thing that must never go negative is the count for one night, and the thing that must never be locked is the whole room type

| Ticket booking | Hotel booking |
| :--- | :--- |
| one row per seat, `status` is the invariant | one row per room type per night: `total`, `reserved`, `version` |
| a booking is one seat | a booking spans consecutive nights: one conditional update per night, all in one transaction, any one failing rolls back the rest |
| never sold twice | `reserved ≤ total × (1 + overbook)`: overbooking is a deliberate business percentage, set per property, because a known share of bookings cancel |
| pessimistic: `FOR UPDATE NOWAIT` on the seat, because 10 buyers want the same row (page 3) | optimistic: `UPDATE … SET reserved = reserved + 1, version = version + 1 WHERE … AND version = $v AND reserved < limit`, because collisions on one night are rare (booklet 03) |
| the hold is the seat row's state | the hold is a row in `holds` with an expiry that counts toward `reserved` until it expires or converts |
| the physical seat is the product | the physical room is assigned at check-in; the product is a unit of inventory |

- Optimistic concurrency, a `version` column checked on every update, fits because two guests wanting the same room type on the same night at the same instant is uncommon; a zero-row update means "retry with fresh numbers", and the retry almost always succeeds. Under the ticketing burst the same scheme would retry 90 % of writers, which is why page 3 locks instead
- A five-night stay is five conditional updates in one transaction; if the fourth night is full, the transaction rolls back and the guest is offered other dates. Partial success would leave three nights reserved for nobody

### The failure

- Locking the room type instead of the night. A booking for one night in June takes a lock that blocks every booking for that room type on every date, and the hotel's whole inventory serialises on one row. The grain of the lock is the grain of the inventory, and the inventory is per night
