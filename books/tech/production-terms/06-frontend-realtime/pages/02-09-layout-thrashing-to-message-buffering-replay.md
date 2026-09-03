## Layout Thrashing

Alternating DOM reads and writes in a loop, forcing a synchronous layout
recalculation on every iteration.

Reading `offsetHeight` and then setting `style.height` inside a 500-item loop
causes 500 forced reflows and a 900ms freeze.

The browser batches style changes and flushes them lazily. Reading a geometric
property forces that flush immediately, so a read after a write in the same loop
turns a batched operation into a serial one.

**Read everything, then write everything.** Two loops instead of one, and the
same 500 items cost a single layout pass. It is one of the few frontend
performance fixes that is purely structural — no measurement needed once you can
recognise the shape.

## Message Buffering & Replay

Deciding what happens to messages sent while a client was disconnected. Silence
is a design choice, and usually the wrong one.

A user's train enters a tunnel for forty seconds. Without a sequence number they
miss twelve messages and the conversation has a hole nobody can see.

The mechanism is small: the client remembers the last sequence number it
processed, sends it on reconnect, and the server replays everything after it.

**A gap with no sequence number is invisible to both sides.** The client does not
know it missed anything, the server does not know it failed to deliver, and the
first person to notice is the user reading a conversation that does not make
sense.
