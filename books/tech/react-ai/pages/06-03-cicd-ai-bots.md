## CI/CD and AI Code Review Bots

- Continuous Integration (CI) means merging code often and testing it automatically
- Continuous Deployment (CD) means pushing merged code to production automatically
- If your deployment requires someone to run `npm run build` on their laptop and drag a folder to an FTP server, you do not have CD

### The standard frontend pipeline

1. **Lint and Typecheck**: Run `tsc --noEmit` and `eslint`. If this fails, stop. Do not allow broken types to merge
2. **Unit Tests**: Run Jest or Vitest. Test pure functions (data transformers, reducers) heavily. Do not test that a React button calls `onClick` when clicked — React already tests that
3. **End-to-End Tests**: Run Playwright or Cypress on critical paths. "Can a user log in, add an item to the cart, and check out?"
4. **Build**: Run the Next.js or Vite build. Generate source maps
5. **Deploy**: Push to Vercel, AWS S3/CloudFront, or a Docker registry

### AI Code Review Bots

- PR review bots (like CodeRabbit or custom GitHub Actions) read your diff and comment before a human does
- They are excellent at spotting:
  - Missing error handling
  - Accidental hardcoded secrets (API keys)
  - Missing dependency array updates in `useEffect` or `useCallback`
- They are terrible at:
  - Understanding if the feature actually solves the user's problem
  - Judging if a new dependency was necessary
- Use AI bots as an automated first pass, not as a replacement for human architectural review
