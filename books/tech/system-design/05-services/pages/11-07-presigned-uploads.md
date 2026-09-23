## Presigned uploads

- The API signs a URL that grants one operation on one key for a short time, and the client uploads straight to storage. The bytes never pass through the API, so upload bandwidth and worker time stop being application capacity

<svg viewBox="0 0 460 114" role="img" aria-label="A presigned upload as a three-party flow. The client asks the API for a URL, naming the content type and size. The API signs a URL valid for fifteen minutes and returns it. The client then PUTs the bytes straight to the object store, which the API never carries. The store notifies the API with an event when the object lands. The signature carries the signer's permissions, so the URL is a bearer token usable by anyone holding it until it expires. An orange cross marks signing with no size or type condition and a seven-day expiry, which makes one leaked URL a writable bucket for a week." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="4" y="40" width="80" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="44" y="56" text-anchor="middle" font-size="7.5">client</text>
  <rect x="180" y="10" width="100" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="230" y="26" text-anchor="middle" font-size="7.5">API</text>
  <rect x="350" y="40" width="92" height="26" rx="3" fill="#fff" stroke="#1d4e89"/><text x="396" y="56" text-anchor="middle" font-size="7.5">object store</text>
  <line x1="84" y1="46" x2="178" y2="30" stroke="#1d4e89" marker-end="url(#b)"/><text x="131" y="28" text-anchor="middle" font-size="6">1 ask (type, size)</text>
  <line x1="178" y1="36" x2="86" y2="52" stroke="#1d4e89" marker-end="url(#b)"/><text x="132" y="54" text-anchor="middle" font-size="6">2 signed URL · 15 min</text>
  <line x1="84" y1="60" x2="348" y2="60" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="216" y="72" text-anchor="middle" font-size="6.5">3 PUT the bytes — the API never carries them</text>
  <line x1="350" y1="44" x2="282" y2="30" stroke="#1d4e89" stroke-dasharray="3 2" marker-end="url(#b)"/><text x="318" y="28" text-anchor="middle" font-size="6">4 event</text>
  <text x="4" y="92" font-size="7">the signature carries the signer's permissions — the URL is a bearer token for anyone holding it, until it expires</text>
  <text x="4" y="107" font-size="7.5" fill="#bf4c28">✕ no size or type condition and a 7-day expiry: one leaked URL is a writable bucket for a week</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

```typescript
export async function uploadUrl(userId: string) {
  const cmd = new PutObjectCommand({
    Bucket: "avatars",
    Key: `${userId}/${randomUUID()}.jpg`,  // the server names the key, never the client
    ContentType: "image/jpeg",             // signed in, so the upload must match it
  });
  return getSignedUrl(s3, cmd, { expiresIn: 900 });   // 15 min, not the 7-day maximum
}
```

- The key is chosen by the server for a reason. A client-supplied key is a path the client controls, so it can overwrite another user's object or write outside its own prefix — the signature grants exactly what was signed, including a key somebody else chose
- Expiry is the whole security model, and 7 days is the maximum for a URL signed with an IAM user's long-lived credentials. Signing with temporary credentials caps it lower — the URL dies with the credential, which is usually the safer default without anyone configuring it

### The failure

- A signed `PUT` with no bound on what may be written. A presigned `PUT` enforces only the headers actually signed, so pinning `ContentType` is not pinning size; a signed URL with no length condition accepts whatever the holder sends, billed to the bucket owner
- Sign `ContentLength` where the size is known; where it is not, a presigned **POST** carries a `content-length-range` condition the store enforces. Without one of the two, the only limit is the expiry
