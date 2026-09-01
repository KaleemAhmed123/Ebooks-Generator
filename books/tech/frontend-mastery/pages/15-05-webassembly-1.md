## WebAssembly

JavaScript is fast enough for almost everything a web page does. WebAssembly
exists for the cases where it is not.

**Wasm** is a low-level binary format that runs in the same sandbox as
JavaScript, at close to native speed. It is not a JavaScript replacement and it
is not a framework. It is a way to run code written in Rust, C, C++, Go or
AssemblyScript inside the browser.

It stopped being exotic. As of 2026 it runs on roughly **5.5% of all Chrome page
loads**, and benchmarks put it around **95% of equivalent native speed**.

### What it is genuinely for

The mature browser use case is **work that would otherwise be a server round
trip**:

- Image and video processing. Resize, crop, filter, transcode, in the tab.
- PDF generation and manipulation.
- Audio encoding and effects.
- Document parsing. A spreadsheet or CAD file the browser has no parser for.
- Cryptography and compression.
- Physics, geometry, and anything genuinely numeric.

The canonical example is **Figma**, whose vector rendering engine is C++
compiled to Wasm. That is the shape of a good fit: a hot, numeric, self-contained
computation, called from JavaScript that still owns the UI.

The fastest growing new use is **client-side AI inference**. Running a quantized
model in the 50MB to 500MB range in the browser is now practical, which means
the user's data never leaves their machine. For anything privacy-sensitive that
is an architectural argument, not a performance one.

### What it is not for

This is the more useful half.

- **Not for DOM work.** Wasm has no direct DOM access. Every DOM call goes
  through JavaScript, and the crossing costs more than the operation saves.
- **Not for a faster React.** Rendering is DOM-bound, not compute-bound.
- **Not for typical business logic.** Mapping an array of API results is not
  slow because JavaScript is slow.
- **Not free.** A Wasm module is a download, a compile, and an instantiation
  before it does anything. A 2MB module to speed up a 40ms function is a loss.

The test: is the work **numeric, hot, and self-contained**? All three, or leave
it in JavaScript.
