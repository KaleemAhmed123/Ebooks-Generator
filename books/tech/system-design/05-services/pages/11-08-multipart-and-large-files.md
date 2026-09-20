## Multipart and large files

- S3 limits a single `PUT` request to 5 Gigabytes. If you need to upload a 10GB video, you cannot send it in one request
- You must use a Multipart Upload. You tell S3 you are starting an upload, and it gives you an `UploadId`. You split the 10GB file into 10MB chunks, and upload them individually (often in parallel). If chunk #4 fails, the client only has to retry chunk #4, not the whole file
- Once all chunks are uploaded, you tell S3 to assemble them

<svg viewBox="0 0 460 140" role="img" aria-label="Multipart upload. File split into parts, uploaded separately, then assembled." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="73" text-anchor="middle">Large File</text>
  
  <rect x="140" y="30" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="44" text-anchor="middle">Part 1</text>
  
  <rect x="140" y="60" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="74" text-anchor="middle">Part 2</text>
  
  <rect x="140" y="90" width="40" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="104" text-anchor="middle">Part 3</text>
  
  <rect x="240" y="55" width="100" height="30" fill="#fce4e2" stroke="#b8541a"/>
  <text x="290" y="73" text-anchor="middle">S3 Assembly</text>
  
  <path d="M105 60 L135 40" stroke="#1a1a1a" fill="none"/>
  <path d="M105 70 L135 70" stroke="#1a1a1a" fill="none"/>
  <path d="M105 80 L135 100" stroke="#1a1a1a" fill="none"/>
  
  <path d="M185 40 L235 60" stroke="#1a1a1a" fill="none"/>
  <path d="M185 70 L235 70" stroke="#1a1a1a" fill="none"/>
  <path d="M185 100 L235 80" stroke="#1a1a1a" fill="none"/>
</svg>

### The failure

- The failure is the abandoned multipart upload. If a user uploads 9 out of 10 chunks, and then closes their laptop forever, the upload is never finalized
- S3 stores those 9 chunks invisibly in your bucket. They do not appear when you list the files, but AWS still bills you for the storage. Thousands of abandoned uploads can secretly cost you thousands of dollars
- You must configure an S3 Bucket Lifecycle Rule to automatically delete "Incomplete Multipart Uploads" after 7 days
