### The rules

- **`.env` is for local development only.** It is in `.gitignore`, and a committed `.env.example` lists the names with no values
- **One artifact, many environments.** The image built from a commit is the image that reaches production
- **No environment names in the code.** `if (env.NODE_ENV === "production")` scattered around a codebase means staging tests a different program
- Secrets never come from environment files in production. Module 13 covers where they come from instead
