## Metrics and alarms

- A metric is a number over time. CloudWatch collects them from AWS services automatically, and from your application if you send them

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name orders-5xx-high \
  --namespace AWS/ApplicationELB \
  --metric-name HTTPCode_Target_5XX_Count \
  --dimensions Name=LoadBalancer,Value=app/alb/abc \
  --statistic Sum --period 60 --evaluation-periods 3 --datapoints-to-alarm 2 \
  --threshold 10 --comparison-operator GreaterThanThreshold \
  --treat-missing-data notBreaching \
  --alarm-actions arn:aws:sns:ap-south-1:123456789012:oncall
```

| Setting | Why |
|---|---|
| `evaluation-periods 3`, `datapoints-to-alarm 2` | **two bad minutes out of three.** Stops a single spike paging someone |
| `treat-missing-data notBreaching` | no data usually means no traffic, not an outage |
| `alarm-actions` | an SNS topic, which fans out to email, Slack or a pager |
