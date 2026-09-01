### What is worth testing at this level

- Every route returns the status code you claim it does
- Auth actually blocks, including the ownership check that middleware cannot do
- Validation rejects, with the error shape the client expects
- The error handler converts a thrown `AppError` into the right status

### What belongs lower down

- Business rules belong in service unit tests, where no HTTP is involved
- That split is only possible because services never touch `req` or `res`
