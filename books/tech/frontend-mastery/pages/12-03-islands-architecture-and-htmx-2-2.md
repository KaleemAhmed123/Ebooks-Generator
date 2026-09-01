## Islands Architecture and HTMX - continued - continued

#### Why HTMX is powerful:
1. **Zero Client-Side State:** You don't need Zustand, Redux, or React Query. The server is the single source of truth.
2. **Backend Agnostic:** You can use Python (Django), Go, Rust, or Node.js on the backend. The backend just renders HTML templates (like Jinja or EJS) and sends them over the wire.
3. **Tiny Footprint:** HTMX is a single ~14kb library.

:::note
**When to use what?**
- **React/Next.js**: Highly complex, state-heavy interactive apps (Figma, Google Docs, complex dashboards).
- **Astro (Islands)**: Content-heavy sites with pockets of interactivity (E-commerce, Blogs, Marketing).
- **HTMX**: Internal tools, simple CRUD apps, and dashboards where the backend team wants to build the frontend without learning React.
:::
