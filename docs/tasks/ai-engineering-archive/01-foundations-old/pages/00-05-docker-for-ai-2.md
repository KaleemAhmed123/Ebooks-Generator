### Minimal GPU Dockerfile

:::mint
```dockerfile
FROM nvidia/cuda:12.4.1-runtime-ubuntu22.04
RUN pip install torch --index-url https://download.pytorch.org/whl/cu124
COPY train.py .
CMD ["python", "train.py"]
```
:::

- The base image (`nvidia/cuda:12.4.1-runtime`) bakes in CUDA 12.4. The host driver must be ≥ CUDA 12.4 — a newer driver runs older CUDA images fine
- **Volume** — a host directory mounted into the container at runtime. Weights downloaded inside the container disappear when it stops; volumes survive

:::mint
```bash
docker run --gpus all \
  -v $HOME/models:/models \   # persistent model storage
  -v $(pwd):/workspace \       # live code
  my-ai-image python train.py
```
:::

:::warn
`nvidia-container-toolkit` must be installed on Linux for `--gpus all` to work. Docker Desktop on macOS/Windows handles GPU passthrough differently and does not need it. Missing the toolkit causes a `could not select device driver ""` error at container start — not a CUDA error.
:::

### When to use Docker Compose

Use Compose when your AI application has more than one service — an inference server plus a vector database (Qdrant, Weaviate), or a training job plus a metrics server (Prometheus). One `docker-compose up` starts all services with shared networking.
