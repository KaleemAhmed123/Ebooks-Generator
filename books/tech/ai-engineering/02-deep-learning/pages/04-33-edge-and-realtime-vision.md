## Edge and real-time vision

- Many vision jobs must run **on the device** — a phone, a camera, a car — where there is no data centre, tight power limits, and a hard latency budget (a self-driving camera cannot wait 200 ms).
- Big accurate models do not fit. Three techniques shrink them to fit the edge.
- **Quantization** stores weights in 8-bit integers instead of 32-bit floats — 4× smaller, and integer maths runs faster on edge chips. **Pruning** deletes weights that barely matter. **Distillation** trains a small "student" model to copy a large "teacher".

<svg viewBox="0 0 320 90" role="img" aria-label="A large cloud model shrunk by quantization, pruning, and distillation into a small model that runs on a device" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="24" width="66" height="46" rx="3" fill="#24405e"/><text x="47" y="45" text-anchor="middle" fill="#fff">large</text><text x="47" y="58" text-anchor="middle" fill="#cfe0d5">model</text>
  <path d="M84 47 L128 47" stroke="#1a1a1a" marker-end="url(#eg)"/><text x="106" y="38" text-anchor="middle" fill="#6b6b6b">quantize</text><text x="106" y="62" text-anchor="middle" fill="#6b6b6b">prune·distill</text>
  <rect x="134" y="34" width="40" height="26" rx="3" fill="#1a3a2a"/><text x="154" y="51" text-anchor="middle" fill="#fff">small</text>
  <path d="M178 47 L212 47" stroke="#1a1a1a" marker-end="url(#eg)"/>
  <rect x="220" y="28" width="50" height="38" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="245" y="51" text-anchor="middle">device</text>
  <defs><marker id="eg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Pair these with efficient architectures (the MobileNet and EfficientNet families) and runtimes built for edge chips (ONNX Runtime, TensorRT, Core ML).

:::warn
Every shrink trades a little accuracy for speed and size. The engineering is finding the point where the model is small and fast enough to ship *and* still accurate enough to trust. Measure that trade on real device hardware — a benchmark on a data-centre GPU tells you nothing about the phone.
:::
