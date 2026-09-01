## Uploads and downloads

- Streaming a 200 MB upload through your API means holding it in a Node process, paying for the bandwidth twice, and occupying a request slot for minutes
- **A presigned URL lets the browser talk to S3 directly**, with a credential that is valid for one operation, one key, and a few minutes

```ts
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({})

// upload
const key = `uploads/${tenantId}/${crypto.randomUUID()}.pdf`
const url = await getSignedUrl(s3, new PutObjectCommand({
  Bucket: "acme-uploads",
  Key: key,
  ContentType: "application/pdf",
}), { expiresIn: 300 })

// download
const link = await getSignedUrl(s3, new GetObjectCommand({
  Bucket: "acme-uploads", Key: key,
}), { expiresIn: 60 })
```

### The rules

- **Your server chooses the key**, never the client. A client-supplied key can write over another tenant's object
- **Put the tenant id in the key prefix**, so an IAM policy can restrict access by path
- **Pin `ContentType` and enforce a size limit** through a presigned POST policy. A presigned PUT alone accepts any size
- **Short expiry.** Five minutes to upload, one minute to download. A leaked link then expires before it is useful
- **The upload does not tell your application it happened.** Either the client confirms, or an S3 event notification triggers the follow-up work
