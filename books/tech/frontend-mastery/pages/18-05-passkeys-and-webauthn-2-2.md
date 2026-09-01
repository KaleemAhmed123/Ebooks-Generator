### Autofill

The better sign-in experience does not have a "use a passkey" button at all. Mark the field and call `get()` with a mediation hint, and the browser offers the passkey in the same dropdown as a saved password.

```html
<input type="text" name="username" autocomplete="username webauthn" />
```

```js
navigator.credentials.get({
  publicKey: { challenge, rpId: 'example.com' },
  mediation: 'conditional',       // no modal, offers itself in autofill
});
```

Guard it, because not every browser supports conditional mediation:

```js
if (await PublicKeyCredential.isConditionalMediationAvailable?.()) {
  // safe to call
}
```

### What the frontend must not do

The client's job is to call two browser APIs and pass the results along. Everything that makes this secure happens on the server:

- The **challenge must be generated server side**, be random, and be accepted exactly once. A replayed challenge is a replayed login.
- The server must verify the **origin** and the **relying party id** in the returned data. Skipping that check throws away the phishing resistance entirely.
- The **signature counter** should be checked to detect a cloned authenticator.

Use a maintained library, `@simplewebauthn/server` on the backend and `@simplewebauthn/browser` on the frontend. The encoding rules here are fiddly and getting them subtly wrong produces a login that works and verifies nothing.

### Rolling it out

Nobody migrates in one step. The usual path is to add passkeys as an additional method, prompt existing users to enroll after a successful password login, keep one recovery route such as an email link, and only then consider making passwords optional. Users will lose devices, and an account with a passkey and no recovery path is an account you have locked them out of.
