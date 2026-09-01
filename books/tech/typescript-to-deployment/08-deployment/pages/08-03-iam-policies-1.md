## Writing a policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ReadAppSecrets",
      "Effect": "Allow",
      "Action": ["secretsmanager:GetSecretValue"],
      "Resource": "arn:aws:secretsmanager:ap-south-1:123456789012:secret:prod/orders/*"
    },
    {
      "Sid": "UploadsBucketOnly",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::acme-uploads/*"
    },
    {
      "Sid": "NeverDeleteBuckets",
      "Effect": "Deny",
      "Action": ["s3:DeleteBucket"],
      "Resource": "*"
    }
  ]
}
```

| Field | Means |
|---|---|
| `Effect` | `Allow` or `Deny` |
| `Action` | the API calls, as `service:Operation` |
| `Resource` | which ARNs. **`"*"` here is the usual mistake** |
| `Condition` | extra tests: source address, tag, MFA, time |
| `Sid` | a label for humans, and for finding it later |
