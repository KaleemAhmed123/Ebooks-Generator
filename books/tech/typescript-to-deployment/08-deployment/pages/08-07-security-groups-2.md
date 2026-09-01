### Security groups against network ACLs

| | Security group | Network ACL |
|---|---|---|
| Attached to | a resource | a subnet |
| State | stateful | stateless, needs both directions |
| Rules | allow only | allow and deny |
| Use | **everything** | blocking a specific address range |

- **Use security groups. Leave the default network ACL alone** unless you have a specific reason, because a stateless rule set is easy to get subtly wrong

- **`0.0.0.0/0` on port 22 or 5432 is the finding every audit opens with.** Neither should ever exist
