### The whole surface

- Seven methods are supported

```ts
export async function GET(request: Request) {}
export async function POST(request: Request) {}
export async function PUT(request: Request) {}
export async function PATCH(request: Request) {}
export async function DELETE(request: Request) {}
export async function HEAD(request: Request) {}
export async function OPTIONS(request: Request) {}
```

- If you do not write `OPTIONS`, Next.js writes it for you and sets the `Allow` header from the methods you did define
- Any method you do not export returns `405 Method Not Allowed`
