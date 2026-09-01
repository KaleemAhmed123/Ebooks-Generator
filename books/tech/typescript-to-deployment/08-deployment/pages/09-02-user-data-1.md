## Bootstrapping an instance

- A new instance is a blank machine. **User data** is a script that runs once, as root, the first time it boots
- It is how an instance in an auto scaling group configures itself with nobody watching

```bash
#!/bin/bash
set -euxo pipefail

dnf update -y
dnf install -y docker amazon-cloudwatch-agent
systemctl enable --now docker

REGION=ap-south-1
ACCOUNT=123456789012
IMAGE=$ACCOUNT.dkr.ecr.$REGION.amazonaws.com/orders-api:latest

aws ecr get-login-password --region $REGION \
  | docker login --username AWS --password-stdin $ACCOUNT.dkr.ecr.$REGION.amazonaws.com

aws ssm get-parameters-by-path --path /prod/orders/ --with-decryption \
  --query 'Parameters[].[Name,Value]' --output text \
  | awk -F'\t' '{ n=$1; sub(/.*\//,"",n); print n "=" $2 }' > /etc/app.env
chmod 600 /etc/app.env

docker run -d --name api --restart unless-stopped \
  -p 127.0.0.1:3000:3000 --env-file /etc/app.env \
  --log-driver awslogs --log-opt awslogs-group=/ec2/orders-api \
  "$IMAGE"
```
