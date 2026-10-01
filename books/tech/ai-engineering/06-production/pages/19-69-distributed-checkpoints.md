## Distributed training: sharded checkpoints

- A frontier training run lasts weeks across thousands of GPUs — hardware *will* fail, so checkpointing is survival, not hygiene. But when the model is sharded (no GPU holds the whole thing), the checkpoint must be **sharded** too: each GPU saves its own piece, in parallel.

:::mint
```python
import torch.distributed.checkpoint as dcp

# each rank writes ITS shard of model + optimiser state, in parallel
def save_sharded(model, opt, step, path):
    state = {"model": model.state_dict(), "opt": opt.state_dict(), "step": step}
    dcp.save(state, checkpoint_id=f"{path}/step_{step}")     # distributed save

def load_sharded(model, opt, path, step):
    state = {"model": model.state_dict(), "opt": opt.state_dict()}
    dcp.load(state, checkpoint_id=f"{path}/step_{step}")     # each rank its shard
    return state
```
:::

- **Sharded saves are parallel and scalable.** Gathering the whole model to rank 0 to save one file would be slow and might not even fit in one GPU's memory — so each rank writes its own shard concurrently to shared storage, and a resume loads shards back in parallel. For a model that doesn't fit one GPU, this is the *only* way to checkpoint.
- **Save the full training state**, not just weights (Flagship 2): optimiser state (per-shard), the step, the LR schedule, and the data loader position, so a resume continues *exactly* — no lost progress, no loss discontinuity. On a run that costs millions, a checkpoint that loses an hour of progress on every failure is a large, avoidable bill.

:::interview
"How do you train a model too big for one GPU, and survive failures over a multi-week run?"

Combine parallelism axes: **tensor parallel** within a node for per-layer size, **pipeline parallel** across nodes for depth, **ZeRO/FSDP** to shard the optimiser/gradient/parameter state so nothing is redundantly replicated, and **data parallel** on top for throughput — all built from all-reduce/all-gather/reduce-scatter collectives. For survival, **sharded checkpointing**: each rank writes its shard in parallel (gathering to one node won't fit or scale), saving the *full* training state (weights, per-shard optimiser state, step, schedule) so a resume is exact. The two-part answer — a parallelism strategy chosen by where the model overflows, plus sharded checkpoints for resilience — is the frontier-training signal.
:::
