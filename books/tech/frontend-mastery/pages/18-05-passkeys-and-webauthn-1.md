## Passkeys and WebAuthn

Every password problem comes from one property: the secret has to be **sent** to the server. Sending it means it can be intercepted, phished, stored badly, and reused on another site where the same user picked the same password.

**Passkeys** remove the sending. They are the consumer-facing name for WebAuthn credentials, a public and private key pair. The private key never leaves the user's device. The server only ever holds the public key, which is useless to a thief.

### Why phishing stops working

This is the part that matters, and it is not "passkeys are longer than passwords."

When a passkey is created, the browser binds it to the **origin** it was created on. A credential made for `bank.com` is invisible to `bank-secure-login.com`. The lookalike site can build a pixel-perfect clone, and the browser will simply not offer the passkey, because the origin does not match.

The user cannot be tricked into handing it over, because there is nothing to hand over. That is a property of the protocol, not of the user's judgement, which is why passkeys succeed where password managers and security training only helped.

### The flow

**Registration.** The server sends a random challenge. The browser asks the platform authenticator, which is Face ID, Touch ID, Windows Hello, or a hardware key, to create a key pair. The user confirms with a biometric or a PIN. The public key and a credential id go back to the server.

**Authentication.** The server sends a fresh challenge. The browser asks the authenticator to sign it with the private key for this origin. The signature goes to the server, which verifies it against the stored public key.

The biometric never leaves the device and is never sent anywhere. It only unlocks local access to the private key.
