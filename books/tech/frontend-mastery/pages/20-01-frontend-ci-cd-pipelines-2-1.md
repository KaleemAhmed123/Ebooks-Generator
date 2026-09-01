## Frontend CI/CD Pipelines - continued

**Visual Regression Testing** is the crown jewel of frontend CI. 
1. Playwright takes a screenshot of your component.
2. It compares it pixel-by-pixel against a baseline screenshot stored in your repo.
3. If a CSS change on the header accidentally shifted the footer by 2 pixels, the CI pipeline will flag the diff and require a human to approve the visual change.

#### 4. Bundle Size Tracking
One of the most insidious problems in frontend development is "bundle bloat." A developer imports a heavy library like `moment.js` or `lodash`, and suddenly the app is 300kb larger. 
Tools like `size-limit` or Next.js Bundle Analyzer run in CI. You can configure them: `"limit": "150 KB"`. If a PR increases the bundle beyond the threshold, it is blocked.

#### 5. Performance Audits (Lighthouse CI)
You can run Google Lighthouse headlessly in your pipeline against a preview deployment. It will generate scores for Performance, Accessibility, Best Practices, and SEO. If your Core Web Vitals drop below a set threshold, the PR fails.
