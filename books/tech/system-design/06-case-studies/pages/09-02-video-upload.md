## Resumable chunked upload

- The API never carries the bytes. It creates an upload record and hands the client **presigned URLs**, short-lived URLs that grant a `PUT` of one part straight into blob storage; the client uploads the parts, then tells the API it is done. A dropped connection costs one part, not the file. Booklet 05 owns blob storage and presigning; here it is the shape of the flow

<svg viewBox="0 0 460 160" role="img" aria-label="Resumable upload. Step 1: the client posts to the upload API, which writes a videos row in the uploading state and returns an upload id and presigned URLs for each part. Step 2: the client PUTs parts of, say, 8 megabytes directly into blob storage using those URLs, and on a dropped connection retries only the missing parts. Step 3: the client posts complete with the part etags. Step 4: the API asks blob storage to assemble the parts, marks the row uploaded and, step 5, puts one job on the transcode queue. An orange cross marks sending bytes through the API: a 2 gigabyte upload on a slow link holds one API worker for an hour, and a million uploads a day is the whole fleet." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="60" width="56" height="30" rx="3" fill="#fff" stroke="#333"/><text x="34" y="73" text-anchor="middle">client</text><text x="34" y="84" text-anchor="middle" font-size="7">2 GB file</text>
  <text x="6" y="22" font-size="7">1. POST /uploads</text><text x="6" y="32" font-size="7">3. POST /uploads/{id}/complete</text><text x="6" y="42" font-size="7">with the part etags</text>
  <rect x="120" y="10" width="100" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="170" y="23" text-anchor="middle">upload API</text><text x="170" y="34" text-anchor="middle" font-size="7">1. → upload id +</text><text x="170" y="44" text-anchor="middle" font-size="7">presigned URL per part</text>
  <line x1="62" y1="66" x2="120" y2="38" stroke="#333" marker-end="url(#d)"/><text x="82" y="50" font-size="7">1, 3</text>
  <rect x="120" y="118" width="100" height="26" rx="3" fill="#e6f2ff" stroke="#333"/><text x="170" y="129" text-anchor="middle" font-size="7.5">videos</text><text x="170" y="139" text-anchor="middle" font-size="7">uploading → uploaded</text>
  <line x1="130" y1="54" x2="130" y2="118" stroke="#333" marker-end="url(#d)"/>
  <rect x="260" y="40" width="96" height="54" rx="3" fill="#e6f2ff" stroke="#333"/><text x="308" y="53" text-anchor="middle">blob storage</text><text x="308" y="64" text-anchor="middle" font-size="7">parts 1…n under</text><text x="308" y="74" text-anchor="middle" font-size="7">the upload id</text><text x="308" y="86" text-anchor="middle" font-size="7">4. assemble on complete</text>
  <line x1="62" y1="80" x2="260" y2="80" stroke="#1d4e89" marker-end="url(#b)"/>
  <text x="142" y="102" font-size="7" fill="#1d4e89">2. PUT part, say 8 MB, straight to the bucket;</text><text x="142" y="111" font-size="7" fill="#1d4e89">on a drop, retry only the missing parts</text>
  <line x1="220" y1="36" x2="260" y2="54" stroke="#333" marker-end="url(#d)"/><text x="226" y="52" font-size="7">4.</text>
  <rect x="376" y="14" width="78" height="34" rx="3" fill="#fff" stroke="#333" stroke-dasharray="3 3"/><text x="415" y="27" text-anchor="middle" font-size="7.5">transcode queue</text><text x="415" y="38" text-anchor="middle" font-size="7">5. one job (page 3)</text>
  <line x1="220" y1="20" x2="376" y2="26" stroke="#333" marker-end="url(#d)"/><text x="300" y="18" text-anchor="middle" font-size="7">5. on complete</text>
  <text x="6" y="156" font-size="7.5" fill="#bf4c28">✕ bytes through the API: a 2 GB upload on a slow link holds one worker for an hour; 1 M a day is the whole fleet</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- Parts have fixed sizes and numbers, so the client and the store agree on what "missing" means: the client asks which part numbers exist under the upload id and sends the rest. Resume needs no server-side session, only the upload id
- The `complete` call is the commit: the API marks the row `uploaded` and enqueues one transcode job in the same transaction, or via the outbox (booklet 04). A row stuck in `uploading` past a day is garbage-collected together with its parts

### The failure

- Uploading through the API servers. Each worker holds a connection open for the length of a slow upload, memory buffers the body, and the fleet is sized by upload duration instead of request count. The API touches metadata; the bytes go where the storage is
