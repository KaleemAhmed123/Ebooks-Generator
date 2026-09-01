## Building for more than one architecture

- An image built on an Apple laptop is `arm64`. An ordinary EC2 instance is `amd64`. **The container will not start**, and the error mentions exec format rather than architecture
- Graviton instances are `arm64` and about 20 percent cheaper, so a real deployment often needs both

```bash
docker buildx create --name multi --driver docker-container --use
docker buildx inspect --bootstrap

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t 123456789012.dkr.ecr.ap-south-1.amazonaws.com/orders-api:$SHA \
  --push .
```

- **`--push` is required for a multi-platform build.** The local image store holds one architecture, so there is nowhere to load two
- The result is a **manifest list**: one tag pointing at one image per architecture, and the daemon picks the right one automatically

```bash
docker buildx imagetools inspect myrepo/orders-api:1.4.2
```

### The speed problem

- Building `arm64` on an `amd64` runner uses QEMU emulation and is **five to ten times slower**
- **Build each architecture on native hardware and merge the manifests.** GitHub offers arm64 runners, and it turns a twenty minute build back into three
