### Calling it

```js
const { instance } = await WebAssembly.instantiateStreaming(
  fetch('/resize.wasm'),
  { env: { memory: new WebAssembly.Memory({ initial: 256 }) } }
);

const { resize, alloc } = instance.exports;
```

`instantiateStreaming` compiles while the bytes are still arriving, which is
strictly better than downloading then compiling.

In practice you use a toolchain rather than the raw API. Rust plus
`wasm-bindgen` generates the JavaScript glue for you:

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn resize(data: &[u8], width: u32, height: u32) -> Vec<u8> {
    // real work here
}
```

```js
import init, { resize } from './pkg/image_tools.js';

await init();
const output = resize(bytes, 800, 600);
```
