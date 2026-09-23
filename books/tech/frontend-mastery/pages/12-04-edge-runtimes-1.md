## Edge Runtimes

Every request in this module so far travels from the browser to a server in one
place. If your server is in Virginia and your user is in Sydney, the speed of
light alone costs about 160ms round trip, before the server does anything at
all.

An **edge runtime** is a small execution environment running in hundreds of
data centers worldwide. Your code runs in the one nearest the user.

### It is not a small Node server

That is the mental model people arrive with and it causes most of the confusion.

Node starts a process per instance, and a process takes tens of milliseconds to
boot and tens of megabytes of memory. You cannot put that in three hundred
locations and leave it idle.

Edge runtimes use **V8 isolates** instead: the same sandboxing mechanism a
browser uses to separate tabs. An isolate starts in about a millisecond, uses a
fraction of the memory, and thousands share one process. That is what makes
running everywhere affordable, and it is also what causes every limitation
below.
