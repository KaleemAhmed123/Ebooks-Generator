## Large files

- A large upload is split into independent parts, uploaded in any order and often in parallel, then assembled by the store. Failure becomes cheap: a part that fails is retried alone rather than restarting the whole transfer

<svg viewBox="0 0 460 92" role="img" aria-label="A multipart upload. A ten gigabyte file is split into up to ten thousand parts, uploaded independently and in parallel, and then assembled by the store into one object. Parts are 5 MiB to 5 GiB each, except the last, which has no minimum. The assembled object may reach 48.8 TiB. An orange cross marks the client vanishing after part nine: those parts are stored and billed, and listing the bucket does not show them." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="13" font-size="7.5">one object, uploaded as up to 10 000 parts; a failed part is retried on its own</text>
  <rect x="4" y="26" width="80" height="34" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="44" y="46" text-anchor="middle" font-size="7">10 GB file</text>
  <line x1="84" y1="43" x2="112" y2="43" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="116" y="35" width="32" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="132" y="46" text-anchor="middle" font-size="6">1</text>
  <rect x="154" y="35" width="32" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="170" y="46" text-anchor="middle" font-size="6">2</text>
  <rect x="192" y="35" width="32" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="208" y="46" text-anchor="middle" font-size="6">3</text>
  <rect x="230" y="35" width="32" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="246" y="46" text-anchor="middle" font-size="6">4</text>
  <rect x="268" y="35" width="32" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="284" y="46" text-anchor="middle" font-size="6">5</text>
  <text x="312" y="47" text-anchor="middle" font-size="7">…</text>
  <rect x="326" y="35" width="46" height="16" rx="2" fill="#fff" stroke="#1d4e89"/><text x="349" y="46" text-anchor="middle" font-size="6">10 000</text>
  <line x1="376" y1="43" x2="394" y2="43" stroke="#1d4e89" marker-end="url(#b)"/>
  <rect x="398" y="30" width="56" height="26" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="426" y="46" text-anchor="middle" font-size="7">object</text>
  <text x="4" y="72" font-size="6.5">parts are 5 MiB to 5 GiB, except the last, which has no minimum; the assembled object may reach 48.8 TiB</text>
  <text x="4" y="87" font-size="7.5" fill="#bf4c28">✕ the client vanishes after part 9: those parts are stored and billed, and listing the bucket does not show them</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- The three numbers constrain each other. 10 000 parts at 5 MiB is a ceiling of about 49 GiB, so part size has to be chosen from the expected file size, not from a habit — which is why clients scale the part size with the input rather than fixing it at the minimum
- AWS suggests considering multipart from around 100 MB. Below that a single `PUT` is simpler and the retry cost is small; above it, the ability to resume is worth the extra bookkeeping

### The failure

- Abandoned uploads, which is a billing failure rather than a correctness one. A client that uploads nine parts and disappears leaves those parts stored indefinitely: the multipart upload was never completed, so no object exists, and the parts do not appear in a normal listing of the bucket
- They are charged for regardless, and because nothing lists them, nobody finds them by looking at what is in the bucket. The fix is a lifecycle rule expiring incomplete multipart uploads after some days — one piece of configuration whose absence shows up months later as a storage bill with no visible cause
