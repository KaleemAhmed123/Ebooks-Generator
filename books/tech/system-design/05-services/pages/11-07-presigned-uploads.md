## Presigned uploads

- When a user uploads a profile picture, the naïve approach is to have the mobile app upload the image to your API Server, and then have your API Server upload the image to S3
- This wastes API Server CPU, memory, and bandwidth. The API server becomes a useless middleman just passing bytes along
- The standard pattern is a Presigned Upload. The API server mathematically signs a temporary URL granting direct write access to S3, and hands it to the client. The client uploads the bytes straight to S3

<svg viewBox="0 0 460 140" role="img" aria-label="Presigned upload flow. Client gets URL from API, uploads direct to S3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="44" text-anchor="middle">User Client</text>
  
  <rect x="180" y="30" width="80" height="20" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="220" y="44" text-anchor="middle">API Server</text>
  
  <rect x="180" y="90" width="80" height="20" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="220" y="104" text-anchor="middle">S3 Storage</text>
  
  <path d="M100 35 L175 35" stroke="#1a1a1a" fill="none"/>
  <path d="M170 32 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="137" y="28" text-anchor="middle" font-size="7">1. Request URL</text>
  
  <path d="M175 45 L100 45" stroke="#1a1a1a" fill="none"/>
  <path d="M105 42 l-5 3 l5 3 z" fill="#1a1a1a"/>
  <text x="137" y="55" text-anchor="middle" font-size="7">2. Return Signed URL</text>
  
  <path d="M60 55 L175 100" stroke="#b8541a" stroke-width="2" fill="none"/>
  <path d="M170 96 l5 3 l-1 -5 z" fill="#b8541a"/>
  <text x="100" y="95" text-anchor="middle" fill="#b8541a" font-size="7">3. Upload directly to S3</text>
</svg>

````typescript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({ region: "us-east-1" });

async function getUploadUrl(userId: string) {
  const command = new PutObjectCommand({
    Bucket: "user-avatars", Key: `${userId}.jpg`, ContentType: "image/jpeg",
  });
  return await getSignedUrl(client, command, { expiresIn: 900 });
}
````

### The failure

- The failure is forgetting to enforce size constraints on the signed URL. If you sign a URL without specifying a `Content-Length-Range`, a malicious user can use that URL to upload a 500GB file directly into your S3 bucket
- You will be billed for the storage and the transfer. Always enforce a strict `Content-Length-Range` in the presigned POST policy, so S3 automatically rejects massive files on your behalf
