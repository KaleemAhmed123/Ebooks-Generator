# Writing It

## Providers and resources

- Terraform/OpenTofu itself knows **nothing** about AWS or Kubernetes. All cloud knowledge lives in **providers** — plugins that translate HCL into a specific API's calls. You declare which providers you need; the tool downloads them on `init`. `aws`, `kubernetes`, `cloudflare`, `datadog` — there are thousands, which is why the *same language* manages your whole stack.
- A **resource** block declares one managed object. Its two labels — **type** (`aws_vpc`, defined by the provider) and **name** (`main`, your local handle) — form its address `aws_vpc.main`, which is how state tracks it and how other resources reference it.

:::mint
```hcl
provider "aws" { region = "us-east-1" }

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = { Name = "platform" }
}

resource "aws_subnet" "a" {
  vpc_id     = aws_vpc.main.id      # reference → implicit dependency
  cidr_block = "10.0.1.0/24"
}
```
:::

- **References create the dependency graph.** Writing `aws_vpc.main.id` inside the subnet tells the tool "the subnet needs the VPC first" — you never declare ordering explicitly; it's inferred from who references whom, and the tool builds the resources in dependency order (and destroys in reverse, Module 1.2).
- A **data source** (`data "aws_ami" "ubuntu" { … }`) is the read-only twin: it **looks up** something that already exists (an AMI ID, an existing VPC) without managing it, so you can wire your resources to infrastructure you didn't create — another team's network or outputs.

:::note
Pin everything. The `required_providers` block takes a **version constraint** (`~> 5.0`) and `init` writes a **`.terraform.lock.hcl`** that records the exact provider versions and checksums — commit it. Without pinning, a new major provider version between two runs can silently change behaviour or force replacements — the cause of most "worked on my machine, destroyed things on CI" surprises.
:::
