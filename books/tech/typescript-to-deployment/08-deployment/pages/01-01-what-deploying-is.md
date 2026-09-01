# Module 1 - What deploying means

## Running somewhere that is not your laptop

- `npm run dev` works because your laptop has the code, the environment variables, a database on `localhost`, and you watching it
- **Deployment is arranging for all four of those to exist somewhere else, without you**, and to keep existing after a reboot
- Everything in this booklet is one of those four problems: the code, the configuration, the dependencies, or the supervision

### The five questions a deployment answers

| Question | Answered by |
|---|---|
| How does the code get there? | a build artifact and a pipeline |
| What environment does it run in? | a container image |
| Who starts it, and restarts it? | systemd, ECS, or Kubernetes |
| How does traffic reach it? | DNS, a load balancer, a reverse proxy |
| How do you know it is working? | logs, metrics, health checks, alarms |

### The order this booklet builds in

- **Docker** packages the environment so the same thing runs everywhere
- **Nginx** sits in front of the process and handles what Node should not
- **GitHub Actions** builds and ships it without anyone touching a server
- **AWS** provides the machines, the network, the data stores and the plumbing between them

### What is deliberately not here

- **Kubernetes.** It is the right answer at a scale most teams never reach, and the wrong first answer for almost everyone. ECS does the same job with a fraction of the surface
- The section on choosing compute says plainly when that changes
