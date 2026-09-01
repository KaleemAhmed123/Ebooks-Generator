## Choosing where it runs

| | EC2 | ECS Fargate | Lambda | PaaS |
|---|---|---|---|---|
| You patch the OS | yes | no | no | no |
| Scale to zero | no | no | yes | sometimes |
| Long-running work | yes | yes | 15 min limit | yes |
| Cold starts | none | none | yes | usually none |
| Cost, steady load | lowest | moderate | highest | highest |
| Cost, spiky load | highest | moderate | lowest | moderate |
| Setup effort | highest | moderate | low | lowest |

### The recommendation

- **Start on a PaaS** if the team is small and the product is unproven. Render, Railway or Fly do the whole of this booklet for you, and the cost of leaving later is low if the application is containerised
- **ECS Fargate is the right default for a real service on AWS.** No machines to patch, real rolling deploys, and every AWS integration available
- **EC2 when you need the machine**: a GPU, a specific kernel setting, a licensed agent, or a steady load large enough that reserved instances are much cheaper
- **Lambda for events**, alongside whichever of the above serves HTTP

### Where Kubernetes fits

- **When you are running many services across many teams and need the ecosystem**: operators, service mesh, complex scheduling, or portability between clouds
- EKS gives all of that and gives you a control plane to upgrade, a networking layer to understand, and a full-time operational burden
- **For one to twenty services, ECS does the same work with a fraction of the surface.** That is the honest comparison, and it is why this booklet teaches ECS

### The decision that actually matters

- **Containerise the application.** Every option above then remains open, and moving between them is a pipeline change rather than a rewrite
