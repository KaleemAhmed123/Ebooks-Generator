## Files and media

- A backend that accepts an image cannot store what the browser sent. It is too large, it may be a format browsers no longer display, and it may not be an image at all
- **Resizing and re-encoding** is what turns a four megabyte phone photo into a forty kilobyte thumbnail
- Doing that in JavaScript is slow, so the fast libraries wrap a native image library written in C
- The second half of the problem is where the file goes. Local disk does not survive a container restart and is not shared between instances
- **Object storage** such as S3 solves that. Files live outside the service, addressed by a key, served through a CDN
- The useful trick is a **presigned URL**, a temporary link letting the browser upload straight to storage so a large file never passes through your server

### sharp 0.35.4

```ts
import sharp from "sharp"

const thumb = await sharp(buffer)
  .resize(400, 400, { fit: "cover" })
  .webp({ quality: 80 })
  .toBuffer()

const { width, height, format } = await sharp(buffer).metadata()
```

- Native libvips underneath, which is why it is an order of magnitude faster than pure JavaScript resizers
- `metadata()` also acts as a validity check, since it throws on a file that is not really an image
- Resizing is CPU work. On a busy service it belongs on a queue, not in the request
