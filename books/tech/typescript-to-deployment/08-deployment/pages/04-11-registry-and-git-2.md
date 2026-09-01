### Gitea or Forgejo

```yaml
  gitea:
    image: gitea/gitea:1
    restart: unless-stopped
    environment:
      GITEA__database__DB_TYPE: postgres
      GITEA__database__HOST: db:5432
      GITEA__server__ROOT_URL: https://git.example.com/
    volumes: ["./data/gitea:/data"]
    ports: ["127.0.0.1:3002:3000", "2222:22"]
```

- **Gitea Actions is compatible with GitHub Actions workflow files**, so the pipeline from Module 6 mostly runs unchanged
- A registry is built in, which removes the separate service above

### The self-hosted CI runner

- **A self-hosted GitHub Actions runner on your own box removes minute charges** and gives the build a warm Docker cache
- **Never run one on a public repository.** A pull request from a stranger executes their code on your machine, with your network access
