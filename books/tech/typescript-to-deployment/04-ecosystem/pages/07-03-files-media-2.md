### @aws-sdk/client-s3

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3 = new S3Client({ region: "ap-south-1" })

const url = await getSignedUrl(
  s3,
  new PutObjectCommand({ Bucket: "orders", Key: key, ContentType: type }),
  { expiresIn: 300 }
)
```

- A presigned URL lets the browser upload straight to S3, so a 200MB file never passes through your server
- Constrain `ContentType` and `ContentLength` when signing, or the client can upload anything

### The rest, briefly

| Package | Use |
|---|---|
| `archiver` 8 | build a zip as a stream, no temp file |
| `csv-parse` 7 | streaming CSV parser, handles quoting properly |
| `exceljs` 4.4 | real `.xlsx` with formatting |
| `pdf-lib` | create and edit PDFs, fill form fields |
| `cloudinary`, `imagekit` | hosted transform and CDN, no sharp needed |
