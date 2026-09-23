## The Senior Portfolio

When a recruiter or Senior Engineer looks at your portfolio, they spend less than 30 seconds deciding if you are worth interviewing.

If your portfolio is full of "To-Do Lists," "Weather Apps," and "Pokedexes," you immediately signal that you are a beginner who only follows YouTube tutorials. These apps do not solve real-world business problems.

To get hired as a React Engineer, you must prove that you can build **architecture that holds up in production**. You only need 3 projects to do this.

### Project 1: The B2B SaaS Dashboard (The Money Maker)
80% of frontend jobs involve building internal dashboards or B2B (Business-to-Business) SaaS tools. 
**The App:** Build an Analytics Dashboard for a fictional e-commerce store.
**Key Features to Include:**
- A massive data table with server-side pagination, sorting, and filtering. *All of this state must live in the URL parameters, not `useState`.*
- A complex, multi-step form to "Create a New Product," using `React Hook Form` and `Zod` for strict validation.
- Interactive charts using `Recharts` or `Chart.js`.
- **The Tech Stack:** Next.js, Tailwind CSS, TanStack Query, and a mock REST API.

### Project 2: The Real-Time Collaboration Tool (The Architecture Test)
Building a standard CRUD app is easy. Building an app that handles real-time data sync proves you understand complex state and network layers.
**The App:** A Slack clone or a Trello clone.
**Key Features to Include:**
- OAuth 2.0 Authentication (Log in with Google/GitHub).
- Real-time WebSockets. When User A drags a Trello card, User B sees it move instantly without refreshing the page.
- Optimistic UI Updates. When a user sends a message, it should instantly appear in the UI *before* the server confirms it, and gracefully roll back if the network request fails.
- **The Tech Stack:** React, Zustand (for global UI state), Firebase or Supabase Realtime.
