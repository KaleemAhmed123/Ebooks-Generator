## The API and objects

- Everything in Kubernetes is a **declarative object** in the API, and `kubectl` is just an HTTP client for it — `kubectl get pods` is a `GET`, `kubectl apply` is a `POST`/`PATCH`. There is no magic CLI; learn the objects and you've learned the system. Every object has the same four top-level fields:

:::mint
```yaml
apiVersion: apps/v1      # which API group + version
kind: Deployment         # which type of object
metadata:                # name, namespace, labels
  name: api
  labels: { app: api }
spec:                    # DESIRED state — you write this
  replicas: 3
status:                  # ACTUAL state — the system writes this
  readyReplicas: 3
```
:::

- The split that matters: **`spec` is desired (you own it); `status` is actual (the controller owns it).** The reconcile loop's entire job is to make `status` match `spec`. When you debug, you read `status` to see what the system *actually did* versus what you asked for.
- **Labels and selectors are the glue.** Objects don't reference each other by hard links; they match by **labels** (key/value tags). A Service selecting `app: api` routes to *whatever pods* carry that label right now — add a pod with the label and it joins; remove the label and it leaves. This loose coupling is why rollouts, scaling, and canaries work without rewiring anything.
- **Namespaces** partition the cluster into virtual scopes (names, RBAC, quotas); a resource lives in exactly one. **CRDs** (Module 5) let you add your *own* kinds to this same API, which is how the whole ecosystem extends Kubernetes without forking it.

### Module 1 — checkpoint
- **Key concepts:** reconcile loop (observe → diff → act, **level-triggered**, self-healing falls out) · control plane = **API server** (only etcd writer) + **etcd** (Raft state) + **scheduler** (placement) + **controller-manager** (the loops) · node = **kubelet** + **runtime (CRI/containerd)** + **kube-proxy** · every object = `apiVersion/kind/metadata/spec(desired)/status(actual)`, wired by **labels**.
- **Task + questions:** `kubectl run` a pod, `kubectl delete` it, watch it *not* come back; now do it via a Deployment and watch it heal — explain the difference in terms of the loop. Why can the control plane restart mid-operation without losing work?
- **Next:** Module 2 — running workloads (pods → Deployments → Services → Jobs → StatefulSets).
