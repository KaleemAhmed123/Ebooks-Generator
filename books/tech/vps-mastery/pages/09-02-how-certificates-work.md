## What a certificate actually proves

- A certificate binds a **public key** to a **domain name**, signed by an authority the browser already trusts
- It proves only one thing: whoever holds the matching private key controls this domain. It says nothing about the site being honest or safe

### The files

| File | Contains | Permissions |
|---|---|---|
| `privkey.pem` | The private key. Never leaves the server | `600`, root only |
| `cert.pem` | The certificate for the domain | Public |
| `chain.pem` | Intermediate certificates | Public |
| `fullchain.pem` | `cert.pem` plus `chain.pem` | Public |

- Nginx wants `fullchain.pem` and `privkey.pem`. Serving `cert.pem` alone works in a browser that has the intermediate cached and fails everywhere else, which is a confusing intermittent failure

### The handshake, briefly

1. The client sends the hostname it wants, in the SNI field, unencrypted
2. The server picks the matching certificate and sends it
3. The client checks the signature chain up to a root it trusts, and checks the name and dates
4. Both sides agree on a session key and everything after that is encrypted

### SNI is why one IP serves many domains

- The hostname arrives before the certificate is chosen, so Nginx can hold a separate certificate per `server_name` on one address

### Where TLS ends

- Nginx decrypts, then forwards plain HTTP to containers over the loopback interface or a private Docker network
- That traffic never leaves the machine. Encrypting it again buys nothing on a single box
