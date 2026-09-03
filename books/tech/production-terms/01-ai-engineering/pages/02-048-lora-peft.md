## LoRA & PEFT

*parameter-efficient fine-tuning*

Training small adapter matrices instead of all the weights. Roughly 0.1% of the
parameters, a fraction of the memory, and swappable at serve time.

Full fine-tuning a 13B model needs several high-memory GPUs. LoRA fits on one,
produces a ~50MB adapter, and lets one base model host many task adapters.

### How it works

Fine-tuning normally updates every weight. For a thirteen-billion-parameter
model that means holding the weights, their gradients and optimiser state in
memory simultaneously — several high-memory GPUs for a modest task.

LoRA rests on an observation: the **change** that fine-tuning makes tends to be
low-rank, meaning it is well approximated by a much smaller structure.

So freeze the original weights entirely and train small matrices alongside them
whose product represents the update. You end up training around a thousandth as
many parameters. It fits on one GPU, trains in hours, and produces an artifact
measured in tens of megabytes rather than tens of gigabytes.

**The operational consequence is the interesting part.** Because the base model
is untouched, adapters can be swapped at serve time: one base in memory, many
task-specific behaviours on top of it.

### In practice

That swapping property enables designs that are otherwise impossible — a
per-tenant or per-task adapter selected per request, all served from a single
loaded base model.

Compare that with hosting a separate full fine-tune per tenant, which is
prohibitive at almost any scale. The technique is included here mainly because
the *serving* pattern comes up in architecture conversations far more often than
the training does.
