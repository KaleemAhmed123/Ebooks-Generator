## Dockerizing React Applications

"It works on my machine!" is the oldest excuse in software engineering. 
A React application might build perfectly on your Mac, but fail completely on the company's Linux production server because of a mismatched Node.js version.

**Docker** solves this by packaging your application, the Node runtime, and the exact operating system dependencies into a single, immutable box called a **Container**. If the container runs on your laptop, it is mathematically guaranteed to run on the production server.

### The Dockerfile

To containerize a React application, we create a set of instructions called a `Dockerfile`.

For a standard React Single Page Application built with Vite, you do not need Node.js in production. Node is only needed to *build* the HTML/CSS/JS files. Once built, we just need a static web server like Nginx to serve those files.

This is where **Multi-Stage Builds** come in.

```dockerfile
FROM node:24-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Why Multi-Stage?
If you skip Stage 2 and run your React app inside the Node.js container using a tool like `serve`, your Docker image will be 500+ Megabytes, and it will be vulnerable to Node.js security exploits.

By using a multi-stage build, the final Nginx image is often less than **20 Megabytes**. It boots in milliseconds and is incredibly secure.

*(Note: If you are using Next.js with Server-Side Rendering, you CANNOT use Nginx. You must use Node.js in production to execute the server components on every request).*
