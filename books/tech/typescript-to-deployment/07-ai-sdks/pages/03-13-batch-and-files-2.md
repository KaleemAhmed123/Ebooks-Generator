### Images and PDFs

```ts
content: [
  { type: "document",
    source: { type: "base64", media_type: "application/pdf", data: pdfBase64 } },
  { type: "text", text: "Extract the invoice total and date." },
]
```

- The model reads the page directly, layout included, so a scanned invoice needs no separate text extraction step
- Module 7 covers when that beats a dedicated document parser and when it does not
- Large or reused files go through the Files API once and are referenced by id, rather than base64 encoded into every request
