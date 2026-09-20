## Date-range inventory (hotel variant)

- Booking a hotel room is similar to Ticketmaster, but you don't book a specific physical room (Room 101). You book a *Room Type* for a *Date Range*
- **The inventory model:** `room_type_id`, `date`, `total_inventory`, `total_reserved`
- If you book a King Suite from Jan 1st to Jan 5th, the system must decrement the inventory for all 5 specific date rows
- **Overbooking:** Hotels and airlines deliberately oversell by ~10% because cancellations are guaranteed. The business logic allows `total_reserved` to exceed `total_inventory` by a configured margin
- Because users browse for dates and rarely collide on the exact same second, you can use Optimistic Concurrency (a `version` column, →03) instead of strict locks

### The failure

- Locking the entire "King Suite" room type when a user is checking out. This prevents anyone else in the world from booking a King Suite for different dates. You must lock by date.

:::interview
You design a hotel booking system. A user books a room for December 15th. Why don't you assign them physical Room 402 in the database immediately?

Because you want flexibility to shuffle physical rooms to accommodate longer stays. You only reserve inventory (1 unit of "Standard Room" on Dec 15th) and assign the physical room number when they check in.
:::\n