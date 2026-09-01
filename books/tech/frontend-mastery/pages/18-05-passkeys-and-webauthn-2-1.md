### On the client

```js
// Registration. The options come from your server.
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: base64ToBuffer(options.challenge),   // random, single use, server side
    rp: { name: 'Example App', id: 'example.com' },
    user: {
      id: base64ToBuffer(options.userId),
      name: 'user@example.com',
      displayName: 'Sam Rivera',
    },
    pubKeyCredParams: [{ alg: -7, type: 'public-key' }],   // ES256
    authenticatorSelection: {
      residentKey: 'required',           // a discoverable passkey
      userVerification: 'required',      // biometric or PIN, not just presence
    },
  },
});

await fetch('/api/passkey/register', {
  method: 'POST',
  body: JSON.stringify(serialize(credential)),
});
```

```js
// Authentication
const assertion = await navigator.credentials.get({
  publicKey: {
    challenge: base64ToBuffer(options.challenge),
    rpId: 'example.com',
    userVerification: 'required',
  },
});
```

`residentKey: 'required'` is what makes it a passkey rather than a second factor. The credential is stored on the device and synced through the user's platform account, so it survives a new phone and works without the user typing an email address first.
