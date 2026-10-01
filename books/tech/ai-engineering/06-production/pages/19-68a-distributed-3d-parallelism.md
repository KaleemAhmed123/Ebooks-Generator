## Distributed training: 3D parallelism, worked

- Frontier training combines all three parallelism axes (19-68) — **3D parallelism** — and mapping them onto a cluster is a concrete optimisation. Worked: train a model too big for one node, on 512 GPUs (64 nodes × 8 GPUs).

:::mint
```text
Model needs 4 GPUs to hold one copy (too big for 1, fits in 4).

Assign the 3 axes to the hardware by communication cost:
  TENSOR parallel  = 4   -> WITHIN a node, over fast NVLink
                          (all-reduce every layer — must be fast)
  PIPELINE parallel = 2   -> across 2 nodes (layers split into 2 stages)
                          (activations passed stage-to-stage — moderate traffic)
  one model copy   = TP×PP = 4 × 2 = 8 GPUs = ... spans 2 nodes

  DATA parallel    = 512 / 8 = 64 copies
                          -> all-reduce gradients across copies (once per step)

Rule: fastest-communication axis (TP) on the fastest link (NVLink);
      slowest axis (DP, once/step) tolerates the slowest link.
```
:::

- **Map each axis to a link by its communication frequency.** *Tensor parallel* communicates *every layer* — put it on the fastest fabric (NVLink, within a node). *Pipeline parallel* passes activations *between stages* — moderate, tolerates crossing a few nodes. *Data parallel* all-reduces gradients *once per step* — the least frequent, so it tolerates the slowest link (across the whole cluster). Mismatch this and communication stalls dominate.
- **The order of assembly:** first TP+PP to *fit one copy* on the smallest fast-connected GPU group, then DP to *replicate* that group across the cluster for throughput. Fit first, scale second — the same rule as serving (17-16a), applied to training's larger scale.

:::interview
"512 GPUs, a model that needs 4 to hold — how do you parallelise?"

3D parallelism, mapping each axis to a link by how often it communicates. **Tensor parallel** (all-reduce *every layer*) on the fastest fabric — NVLink within a node. If a copy overflows a node, add **pipeline parallel** across a few nodes (activations stage-to-stage, moderate traffic). That fits one copy in ~8 GPUs; then **data parallel** replicates it 64× across the cluster, all-reducing gradients *once per step*, tolerating the slowest link. The rule — fastest-communicating axis on the fastest link, fit-one-copy-then-replicate — is the same fit-first-scale-second logic as multi-node serving.
:::
