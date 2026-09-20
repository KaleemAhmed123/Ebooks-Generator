## Upload and encoding

- Video files are huge. You cannot upload a 5 GB file through a standard web server; it will consume all available RAM and time out. Instead, the server generates a **Pre-signed URL**
- A Pre-signed URL gives the client temporary, secure permission to upload the file directly to Blob Storage (like Amazon S3). The web server never touches the video bytes
- Once the file lands in S3, S3 fires an event to a Job Queue. Worker nodes pick up the job and begin **Transcoding**. They take the original `1080p.mp4` file and convert it into dozens of different resolutions (720p, 480p) and formats (HLS, DASH) for different devices

<svg viewBox="0 0 600 200" role="img" aria-label="Uploading via Pre-signed URL and transcoding." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <rect x="20" y="80" width="60" height="40" fill="#e2fcf3" stroke="#10b981" rx="4"/>
  <text x="50" y="105" text-anchor="middle" fill="#065f46">Client</text>
  
  <rect x="180" y="20" width="80" height="40" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <text x="220" y="45" text-anchor="middle" fill="#3730a3">API Server</text>
  
  <rect x="180" y="140" width="80" height="40" fill="#ffe4e6" stroke="#f43f5e" rx="4"/>
  <text x="220" y="165" text-anchor="middle" fill="#9f1239">S3 Storage</text>
  
  <rect x="340" y="140" width="80" height="40" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
  <text x="380" y="165" text-anchor="middle" fill="#92400e">Job Queue</text>
  
  <rect x="480" y="130" width="80" height="60" fill="#f3f4f6" stroke="#4b5563" rx="4"/>
  <text x="520" y="155" text-anchor="middle" fill="#1f2937">Transcode</text>
  <text x="520" y="175" text-anchor="middle" fill="#1f2937">Workers</text>
  
  <path d="M 80 85 L 175 55" stroke="#6366f1" stroke-width="2" fill="none" marker-end="url(#arrow-blue)"/>
  <text x="120" y="55" text-anchor="middle" fill="#3730a3" font-size="10">1. Request URL</text>
  
  <path d="M 175 35 L 80 65" stroke="#6366f1" stroke-width="2" stroke-dasharray="4" fill="none" marker-end="url(#arrow-blue)"/>
  
  <path d="M 80 115 L 175 145" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrow-red)"/>
  <text x="120" y="145" text-anchor="middle" fill="#9f1239" font-size="10">2. Upload 5GB</text>
  
  <path d="M 265 160 L 335 160" stroke="#f59e0b" stroke-width="2" fill="none" marker-end="url(#arrow-orange)"/>
  <text x="300" y="155" text-anchor="middle" fill="#92400e" font-size="10">3. Event</text>
  
  <path d="M 425 160 L 475 160" stroke="#4b5563" stroke-width="2" fill="none" marker-end="url(#arrow-gray)"/>
  
  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1"/></marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/></marker>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/></marker>
    <marker id="arrow-gray" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4b5563"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is drawing a line from the client, to the API server, and then to the database. If a user uploads a 5 GB video over a slow 3G connection, the API server must hold that connection open for 3 hours, blocking other users
- Video bytes should never touch the API server. The API server only manages metadata (titles, descriptions, permissions)

:::interview
**The pre-signed URL test**
If the prompt involves large files (images, audio, video), "pre-signed URL" is the magic phrase. It shows you know how to leverage managed cloud services to keep your own compute layer stateless and fast.
:::