# Module 22: The Interview

## Frontend System Design

If you apply for a Junior Frontend role, you will be asked to center a `<div>` and build a To-Do list in React.
If you apply for a Senior Frontend role, you will face the **System Design Round**.

You will be given a whiteboard and a vague prompt: *"Design the Netflix Web App."* or *"Design the Twitter News Feed."*

You are not expected to write code. You are expected to draw boxes and explain trade-offs.

### The RADIO Framework
When given a prompt, do not start drawing immediately. Follow the **RADIO** framework.

#### 1. Requirements (5 mins)
The interviewer's prompt is intentionally vague. You must ask questions to narrow the scope.
- *"Are we building this for Mobile Web or Desktop?"*
- *"How many users do we expect? (1,000 or 10 Million?)"*
- *"Are we building the Video Player, or just the Discovery UI?"*

#### 2. Architecture (10 mins)
Draw the high-level components.
- **Client:** The React SPA.
- **CDN:** Where are the static assets (images, JavaScript bundles) hosted?
- **Backend/API:** Are we using REST or GraphQL? Why?
- **The Edge:** Are we using Server-Side Rendering (Next.js) for SEO, or Client-Side Rendering (Vite) because it's behind a login wall?
