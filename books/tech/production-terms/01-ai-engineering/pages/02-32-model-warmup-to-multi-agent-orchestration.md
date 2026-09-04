## Model Warmup

Sending synthetic requests to a freshly started model server so weights are
loaded and compute kernels compiled before real traffic arrives.

A cold server is listening long before it is fast. Weights load from disk, GPU
kernels compile on first use, and allocators settle. A readiness probe that only
checks the process is listening marks the pod healthy, the load balancer sends
real traffic, and the first users get the
slow path — which looks like an intermittent latency spike nobody can reproduce.
Warmup means reporting ready only once synthetic requests at realistic sequence
lengths complete at normal speed.

**It interacts badly with autoscaling.** Scaling out under load adds cold
instances exactly when the system is already stressed, so new capacity makes
things worse before it makes them better. Keep warm headroom: idle capacity
costs money, cold capacity costs an incident.

## Multi-Agent Orchestration

Splitting work across specialised agents. A genuine win on parallelisable work,
a tax on everything else.

| Shape of the work | What you actually get |
|---|---|
| Independent subtasks run at once | wall-clock time drops |
| Subtasks need different tools or permissions | isolation becomes a security property |
| Agents "discuss" a problem | latency, tokens and a lossy handoff per hop |
| The work is inherently sequential | coordination added to a straight line |

If you do split, make each handoff a defined schema rather than free-form prose
the next agent reinterprets in its own way.

**Three agents is three times the failure modes and one debugging story.** Trace
the whole run under a single identifier, or you will be correlating separate
logs by timestamp during an incident — precisely when you can least afford it.
