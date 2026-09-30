## A minimal AI Dockerfile

- A **Dockerfile** is the recipe for an image: start from a base, add your dependencies, copy your code, say how to run it.

:::mint
```dockerfile
# start from a base that already has Python and CUDA
FROM nvidia/cuda:13.0-runtime-ubuntu24.04

# install uv, then dependencies from the lockfile
RUN pip install uv
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen          # exact versions — reproducible build

COPY . .                      # copy the project code in last
CMD ["uv", "run", "python", "train.py"]
```
:::

### Why the order matters

- Docker caches each step as a **layer** and reuses unchanged ones. Dependencies change rarely; your code changes constantly.
- Copying dependencies *before* code means editing `train.py` only rebuilds the last cheap layer — not the slow dependency install. Get this order wrong and every build reinstalls everything.

:::warn
To use the GPU inside a container you need the base CUDA image *and* the NVIDIA Container Toolkit on the host, then run with `--gpus all`. Forgetting the flag is the usual reason a container that trains fine locally sees no GPU — the same `torch.cuda.is_available()` check from earlier applies inside the box.
:::
