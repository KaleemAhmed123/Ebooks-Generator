### Where you already meet it

You have probably shipped Wasm without writing any. **`sharp`**, **esbuild**,
**SWC**, **Rolldown** and the Tailwind Oxide engine are all native or Wasm
binaries behind a JavaScript API. Squoosh, Photoshop on the web, AutoCAD web and
Google Earth are all Wasm in the browser.

### What to actually take away

You are unlikely to write Wasm. You are reasonably likely to **decide whether to
use a library that is Wasm**, and that decision needs three questions:

1. How big is the module, and does it load before or after first paint?
2. How much data crosses the boundary, and how often?
3. Is the work actually compute-bound, or does it just feel slow because it is
   on the main thread? If the second, a worker alone fixes it and Wasm adds
   nothing.
