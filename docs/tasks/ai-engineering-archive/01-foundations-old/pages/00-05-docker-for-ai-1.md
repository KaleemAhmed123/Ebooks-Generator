## Containers for AI projects

- A **container** is a process running in an isolated namespace with its own filesystem, network, and process tree. It shares the host OS kernel but sees nothing outside its namespace
- An **image** is the read-only template a container runs from — layers of filesystem changes stacked on a base. The Dockerfile describes how to build the image
- AI projects need containers more than most: CUDA toolkit versions are pinned inside the image, so the same container runs on any machine with a compatible GPU driver

### Three container roles in AI

<svg viewBox="0 0 460 100" role="img" aria-label="Three container types in AI: dev container with full toolkit, training container minimal for GPU clusters, inference container optimized for serving" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="8" width="138" height="84" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="73" y="26" text-anchor="middle" font-weight="bold">Dev Container</text>
  <text x="73" y="42" text-anchor="middle" fill="#6b6b6b">Full toolkit</text>
  <text x="73" y="56" text-anchor="middle" fill="#6b6b6b">Jupyter · debugger</text>
  <text x="73" y="72" text-anchor="middle" fill="#6b6b6b">~6 GB image</text>
  <rect x="161" y="8" width="138" height="84" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="230" y="26" text-anchor="middle" font-weight="bold">Training Container</text>
  <text x="230" y="42" text-anchor="middle" fill="#6b6b6b">Minimal — script only</text>
  <text x="230" y="56" text-anchor="middle" fill="#6b6b6b">GPU cluster · no editor</text>
  <text x="230" y="72" text-anchor="middle" fill="#6b6b6b">~2 GB image</text>
  <rect x="318" y="8" width="138" height="84" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="387" y="26" text-anchor="middle" font-weight="bold">Inference Container</text>
  <text x="387" y="42" text-anchor="middle" fill="#6b6b6b">Fast cold start</text>
  <text x="387" y="56" text-anchor="middle" fill="#6b6b6b">Behind load balancer</text>
  <text x="387" y="72" text-anchor="middle" fill="#6b6b6b">~1 GB image</text>
</svg>
