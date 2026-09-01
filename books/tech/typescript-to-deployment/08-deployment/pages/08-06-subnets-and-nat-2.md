### NAT gateways cost real money

- Around thirty dollars a month each, **plus a per-gigabyte charge on everything passing through**
- One per zone is the resilient design and triples that cost. One shared gateway is cheaper and fails with its zone
- **Data transfer through NAT is a top-three surprise on an AWS bill**, and it is usually a service pulling images or writing to S3 through it

### VPC endpoints, which pay for themselves

```bash
aws ec2 create-vpc-endpoint --vpc-id vpc-abc --service-name com.amazonaws.ap-south-1.s3 \
  --route-table-ids rtb-123
```

- **A gateway endpoint for S3 is free and removes S3 traffic from the NAT bill entirely.** It is the single easiest AWS cost saving there is
