### In a container, do not use pm2

```dockerfile
CMD ["node", "dist/index.js"]
```

- Docker, ECS and Kubernetes already restart a dead container and already scale replicas
- pm2 inside a container hides crashes from the orchestrator, and now the platform believes a broken container is healthy
- One process per container, and let the platform do the supervising

### systemd, the option without extra software

```ini
[Service]
ExecStart=/usr/bin/node /srv/app/dist/index.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

- Restarts, boot on startup and journald logging, with nothing installed
- Enough for a single VM, and one less dependency to keep current
