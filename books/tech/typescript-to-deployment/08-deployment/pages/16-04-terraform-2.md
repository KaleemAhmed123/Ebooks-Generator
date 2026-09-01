## Terraform - continued

```bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan -out=tfplan            # always to a file
terraform apply tfplan                # apply exactly what was reviewed
terraform state list
terraform state show aws_ecs_service.api
terraform import aws_s3_bucket.uploads acme-uploads   # adopt something that exists
terraform destroy -target=module.staging
```

- **`plan -out` then `apply` that file.** Applying without it re-plans, and can apply something different from what was reviewed
- **Never run `apply` from a laptop against production.** The pipeline holds the role, and the pipeline holds the lock
