## File uploads with multer

- Version 2.3.0. Parses `multipart/form-data`, which `express.json` cannot touch

```js
import multer from "multer"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)
    cb(ok ? null : new AppError("bad_file_type", 400, "images only"), ok)
  },
})

app.post("/products/:id/image", upload.single("image"), async (req, res) => {
  const url = await uploadToS3(req.file.buffer, req.file.mimetype)
  res.json({ url })
})
```

| Call | Gives you |
|---|---|
| `upload.single("image")` | `req.file` |
| `upload.array("photos", 5)` | `req.files` |
| `upload.fields([...])` | `req.files` keyed by field |
| `upload.none()` | text fields only, rejects files |

### The three things that go wrong

- **`fileSize` missing.** A client uploads until memory runs out
- **Trusting `file.mimetype`.** The client sets it. Check magic bytes with `file-type` if it matters
- **`diskStorage` with the original name.** A filename of `../../etc/passwd` writes where you did not expect. Always generate your own name

```js
filename: (req, file, cb) => cb(null, `${randomUUID()}${path.extname(file.originalname)}`)
```

- For large files, hand the browser a presigned S3 URL and skip your server entirely
