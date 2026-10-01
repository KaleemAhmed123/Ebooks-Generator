## Distributed training: data parallel (DDP)

- **DDP** (Distributed Data Parallel) is the simplest scale-out: replicate the whole model on every GPU, give each a different slice of the batch, and **all-reduce the gradients** so every replica stays identical. For a model that fits one GPU, it is near-linear speedup.

:::mint
```python
import torch, torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

def train_ddp(rank, world_size, model, dataset):
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)
    model = DDP(model.to(rank), device_ids=[rank])   # wraps + hooks all-reduce
    sampler = DistributedSampler(dataset, world_size, rank)  # disjoint shards
    loader = DataLoader(dataset, sampler=sampler, batch_size=bs)
    for x, y in loader:
        _, loss = model(x.to(rank), y.to(rank))
        loss.backward()          # DDP all-reduces grads here, automatically
        opt.step(); opt.zero_grad()
```
:::

- **The magic is in `backward()`.** DDP registers hooks so that as each layer's gradient is computed, it is **all-reduced** (averaged) across all GPUs in the background — overlapping communication with the rest of backprop. By the time `backward()` returns, every GPU has the *same* averaged gradient, so `opt.step()` keeps all replicas identical.
- **The `DistributedSampler`** gives each GPU a disjoint slice of the data, so the effective batch is `per_gpu_batch × world_size` — DDP's speedup is processing that much more data per step, not a faster step.

:::note
DDP's limit is the reason FSDP exists: it *replicates* the full model on every GPU, so it only works when the model (plus gradients, optimiser state, activations) fits on one card. It scales *throughput* (more data per step) but not *model size*. The moment the model overflows one GPU — any frontier-scale model — you need to *shard* the model itself, which is ZeRO/FSDP (next page). Knowing "DDP for throughput when it fits, FSDP for size when it doesn't" is the core distributed-training decision.
:::
