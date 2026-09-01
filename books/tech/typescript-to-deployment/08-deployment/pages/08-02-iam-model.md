## IAM

- IAM decides who may do what to which resource. It is the one AWS service where a mistake is unrecoverable rather than inconvenient
- Four nouns cover it

| Noun | Is |
|---|---|
| **user** | a long-lived identity for a person, with a password or access keys |
| **role** | an identity anything can temporarily assume, with no permanent credentials |
| **policy** | a document listing allowed and denied actions |
| **group** | a bundle of policies attached to users |

### Roles are the answer almost every time

- **An EC2 instance, an ECS task, a Lambda function and a GitHub Actions job all use roles.** None of them should ever hold an access key
- A role issues credentials that expire in an hour and are rotated automatically by the SDK
- **An access key that leaks is valid until someone notices.** A role credential is useless within the hour, and useless anywhere else

### How a request is evaluated

1. An explicit **`Deny`** anywhere wins, always
2. Otherwise, an explicit **`Allow`** is needed. Absence of a rule is a denial
3. Service control policies, permission boundaries and resource policies can each subtract further

- **Nothing is permitted by default**, which is why a new role does nothing until you say what it may do

### The rules

- **Root is for account setup and nothing else.** Enable multi-factor authentication on it, then leave it alone
- **Humans get roles through identity federation**, not individual users with keys
- **One role per workload**, named for the workload. A shared role means every service has every permission
- **Never attach `AdministratorAccess` to anything that runs code**
