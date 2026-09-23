### Where the action function runs

Everything so far is client-side React: `updateName` is an ordinary async
function sitting in your bundle.

An action can also be a **Server Function** — a function marked with the
`"use server"` directive, which React calls on the server over the network
instead of running it in the browser. The component passes it to `action={}`
exactly the same way. Only the directive differs, and the network hop it implies.

That hop is the whole design: the form works before any JavaScript has loaded,
because the browser can submit it natively and the server already holds the
handler.

Part Five covers the directive, its security model, and the Next.js wiring.
