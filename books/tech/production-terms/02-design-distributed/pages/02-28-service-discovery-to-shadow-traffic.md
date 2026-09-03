## Service Discovery

How one service finds the current network address of another, when instances are
created and destroyed continuously.

Hardcoded IPs break the moment autoscaling replaces an instance. Kubernetes DNS
resolves `payments.prod.svc` to whichever pods are healthy right now, and the
caller never learns that anything moved.

The part that matters is deregistration. Registration is easy and happens when
things are going well; removal has to happen when a process has already died and
cannot tell anyone. Health checks are what close that gap, and a discovery
system without them will confidently route traffic to a corpse.

## Service Mesh

The control plane that configures a fleet of sidecars centrally: traffic policy,
mutual TLS, retries and telemetry across every service at once.

Shifting ten percent of traffic to v2 and enforcing mTLS everywhere becomes one
configuration change instead of forty codebases. That is a real gain, and it
arrives attached to a distributed system you now also operate.

The honest test is whether you have enough services for the uniformity to be
worth an extra control plane. Below roughly a dozen, a shared library and a
proxy do the same job with a fraction of the operational surface.

## Shadow Traffic

Sending a copy of real production traffic to a new system without using its
responses. Real load, real data shapes, no user risk.

A new search service handles a mirrored copy of every query for two weeks. Its
results are diffed against the current system and nothing is served to anyone
until the difference rate is close to zero. Synthetic load never finds the
queries that actually break things; production traffic does.

**Shadow reads are safe. Shadow writes are not.** A mirrored request that sends
an email, charges a card or increments a counter has done it for real. Anything
with a side effect must be stubbed before the mirror is turned on, and that
audit is the actual work of setting this up.
