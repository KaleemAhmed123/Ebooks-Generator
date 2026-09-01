## Command reference: the AWS CLI

### Setup

```bash
aws --version                      # aws-cli/2.x
aws configure sso                  # the right way for a human
aws sso login --profile prod
aws configure list-profiles
export AWS_PROFILE=prod
aws sts get-caller-identity        # who am I, right now
```

- **`aws sts get-caller-identity` before anything destructive.** It is the difference between deleting in staging and deleting in production

### Reading output usefully

```bash
aws ec2 describe-instances --output table
aws ecs list-services --cluster production --output text

aws ec2 describe-instances \
  --filters Name=tag:Role,Values=orders-api Name=instance-state-name,Values=running \
  --query 'Reservations[].Instances[].{Id:InstanceId,Ip:PrivateIpAddress,Az:Placement.AvailabilityZone}' \
  --output table
```

- **`--query` is JMESPath and it runs on the client.** It is how you get one column instead of four hundred lines of JSON
