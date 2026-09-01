# Module 12: The Network Layer

## HTTP Fundamentals

- The internet communicates via HTTP (HyperText Transfer Protocol)
- It is a **stateless** protocol. Every request is completely independent. The server does not remember that you asked for the homepage 5 seconds ago when you now ask for the dashboard
- A request requires:
  - **Method:** `GET` (read), `POST` (create), `PUT` (replace), `DELETE`
  - **URL:** The destination (`/api/users`)
  - **Headers:** Metadata (e.g., `Authorization: Bearer <token>`, `Content-Type: application/json`)
  - **Body:** The actual data (only for POST/PUT/PATCH)
