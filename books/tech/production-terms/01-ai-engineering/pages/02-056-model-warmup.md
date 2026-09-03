## Model Warmup

Sending synthetic requests to a freshly started model server so weights are
loaded and kernels compiled before real traffic arrives.

The first request after a self-hosted deploy took fourteen seconds. Warmup in
the readiness probe meant the pod only accepted traffic once it was actually
fast.

### How it works

A freshly started model server is not ready to serve well. Weights load from
disk, CUDA kernels compile on first use, and memory allocators settle into their
steady-state pattern.

So the first request after a deploy can take many times the steady-state
latency. On self-hosted infrastructure that is ten seconds against a normal few
hundred milliseconds.

**The failure is in how readiness is usually wired.** A probe that only checks
the process is listening marks the pod healthy immediately, the load balancer
starts sending real traffic, and the first users get the slow path — which looks
like an intermittent latency spike nobody can reproduce.

Warmup means sending synthetic requests representative of real ones, including
realistic sequence lengths, and reporting ready only once they complete at
normal speed.

### In practice

**This interacts badly with autoscaling.** Scaling out under load adds instances
that are slow precisely when the system is already stressed, so the new capacity
makes things worse before it makes them better.

Scale earlier than seems necessary and keep warm headroom, rather than
provisioning at the moment of need. The instinct to run lean is exactly wrong
here: the cost of idle capacity is money, and the cost of cold capacity is a
worsening incident.
