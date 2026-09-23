## Vercel vs AWS Amplify vs Netlify

If you want to deploy a React application to the internet, you *could* rent a raw Linux server on AWS EC2, install Node.js, install Nginx, configure SSL certificates, set up a GitHub Actions CI/CD pipeline, and write a Bash script to pull your code.

Or, you could use a **Platform as a Service (PaaS)**.

A PaaS abstracts away the entire DevOps layer. You simply log into the PaaS dashboard, click "Connect to GitHub," select your repository, and hit Deploy. The platform automatically detects that it is a React app, provisions the servers, sets up SSL, and creates a CI/CD pipeline instantly.

### 1. Vercel (The Standard for Next.js)
Vercel is the company that created Next.js, and the platform is built around it.
- **What it does:** Deploying a Next.js app to Vercel turns your Server Components into AWS Lambda functions and pushes your static assets onto an Edge CDN. You write no infrastructure configuration to get either.
- **Preview Deployments:** Whenever a developer opens a Pull Request on GitHub, Vercel automatically deploys a secret, live URL (e.g., `pr-123.vercel.app`) so QA testers can test the exact code in the PR before it is merged.
- **Best For:** Next.js applications, Serverless architectures, and developer experience.

### 2. Netlify (The Standard for Static Sites)
Before Vercel dominated the market, Netlify pioneered the "Jamstack" revolution.
- **What it does:** Netlify is built for purely static single page applications and statically generated sites.
- **Features:** Out of the box it offers Netlify Forms (which automatically captures HTML form submissions without a backend) and Netlify Identity (for quick user auth).
- **Best For:** Vite single page apps, Astro sites, and marketing sites.
