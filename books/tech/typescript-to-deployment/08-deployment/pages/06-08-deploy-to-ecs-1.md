## Deploying to ECS

- ECS deployments are declarative. You register a new **task definition** pointing at the new image, and update the service to use it
- ECS then starts new tasks, waits for them to pass health checks, shifts traffic, and stops the old ones

```yaml
      - name: Render the task definition
        id: render
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: infra/task-definition.json
          container-name: api
          image: ${{ needs.build.outputs.image }}

      - name: Deploy
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: ${{ steps.render.outputs.task-definition }}
          service: orders-api
          cluster: production
          wait-for-service-stability: true
```

### The equivalent by hand

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
aws ecs update-service --cluster production --service orders-api \
  --task-definition orders-api:42 --force-new-deployment
aws ecs wait services-stable --cluster production --services orders-api
```
