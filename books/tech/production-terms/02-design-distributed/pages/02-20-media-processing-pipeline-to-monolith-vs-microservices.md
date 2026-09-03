## Media Processing Pipeline

Turning an uploaded original into the derivatives you actually serve —
thumbnails, transcodes, previews, extracted text — asynchronously, because all
of it is slow and CPU-heavy.

Generating five thumbnail sizes inline makes an upload take twelve seconds.
Storing the original, returning immediately, and processing off a queue makes
the same upload feel instant, at the cost of the interface having to show
something while the derivatives do not exist yet.

Keep the original untouched. Every derivative is re-derivable from it, which
means a bad transcode setting is a re-run rather than a data loss.

## Modular Monolith

One deployable with hard internal module boundaries. Most of the design
discipline of microservices, without the distributed-systems tax.

Modules talk only through published interfaces, each owns its own tables, and
none imports another's internals. That last rule is the one that needs enforcing
in the build, because it is the one that erodes quietly under deadline.

Done properly, extracting a module into a real service later is mechanical: the
interface already exists, the data is already separated, and the only new
problem is the network. That is the whole argument for starting here.

## Monolith vs Microservices

Microservices buy independent deployment and independent scaling. They cost
network failure, distributed transactions, and an operational surface that
someone has to run. Most teams pay the cost well before they need the benefit.

Six engineers running eleven services spend more of the week on service plumbing
than on the product. The same six on a modular monolith ship faster and can
still split later, because the boundaries are the part that matters and those
exist either way.

**The split is justified by team boundaries, not by code size.** A codebase
being large is not the signal; two teams needing to deploy on different days is.
