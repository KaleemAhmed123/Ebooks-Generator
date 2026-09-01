## Terraform - continued

lifecycle { ignore_changes = [task_definition] }   # the pipeline owns the image
}
```

- **`ignore_changes = [task_definition]`** stops Terraform reverting the deploy your pipeline just made. Terraform owns the infrastructure; the pipeline owns the image
- **`default_tags` on the provider tags every resource**, which is what makes the cost reports on the last page work

### The commands
