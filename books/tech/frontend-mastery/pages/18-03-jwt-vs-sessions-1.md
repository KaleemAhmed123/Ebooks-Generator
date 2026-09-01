## Authentication: JWT vs Stateful Sessions

When a user logs in, the backend must verify their credentials (username and password). Once verified, the backend needs a way to "remember" that this user is logged in for all subsequent requests, because HTTP is a stateless protocol.

There are two primary architectures for solving this: Stateful Sessions and Stateless JSON Web Tokens (JWT).

### 1. Stateful Sessions (The Traditional Way)
In a stateful session architecture, the server is responsible for remembering who is logged in.
1. The user sends their username and password.
2. The server verifies them and generates a random string called a `Session ID` (e.g., `xyz123`).
3. The server stores this `Session ID` in a database (like Redis), linked to the User's ID.
4. The server sends the `Session ID` back to the browser in a `Set-Cookie` header.
5. On the next request, the browser automatically sends the cookie. The server looks up `xyz123` in Redis, sees it belongs to User 1, and grants access.

**Pros:** 
- Incredibly secure. If a user's laptop is stolen, an admin can simply delete `xyz123` from the Redis database, and the user is instantly logged out globally.
**Cons:** 
- Scaling is hard. If you have 5 backend servers, they must all connect to the exact same Redis database to verify sessions, creating a central bottleneck.
