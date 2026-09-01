### Conditions worth knowing

```json
"Condition": {
  "StringEquals": { "aws:PrincipalTag/team": "payments" },
  "IpAddress": { "aws:SourceIp": ["203.0.113.0/24"] },
  "Bool": { "aws:SecureTransport": "true" }
}
```

### How to get least privilege without guessing

- **Start from an over-broad policy in a development account, then use IAM Access Analyzer** to generate a policy from what was actually called
- **CloudTrail shows every denied call**, which turns tightening a policy into reading a log rather than trial and error
- **Write `Resource` narrowly first.** A wildcard action on one bucket is far safer than one action on every bucket
