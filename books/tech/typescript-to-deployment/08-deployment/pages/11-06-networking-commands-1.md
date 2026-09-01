## Command reference: finding the broken layer

### From outside, layer by layer

```bash
dig +short api.example.com                       # is DNS right
dig +trace api.example.com                       # where the resolution goes wrong
curl -svo /dev/null https://api.example.com/health 2>&1 | grep -E '^[<>]'
curl -sI https://api.example.com | grep -iE 'x-cache|via|server'
curl --resolve api.example.com:443:<alb-ip> https://api.example.com/health   # skip the CDN
openssl s_client -connect api.example.com:443 -servername api.example.com </dev/null | head
```

- **`x-cache: Hit from cloudfront`** confirms the CDN answered and your origin was never reached

### From inside the VPC

```bash
aws ssm start-session --target i-0abc123
curl -s localhost:3000/health                    # is the app alive at all
curl -s http://<private-ip>:3000/health          # can this host reach that one
nc -zv orders.abc.ap-south-1.rds.amazonaws.com 5432   # is the security group open
```
