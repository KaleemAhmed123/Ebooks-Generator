### Canary

```bash
aws elbv2 modify-listener --listener-arn <listener> --default-actions '[{
  "Type":"forward",
  "ForwardConfig":{"TargetGroups":[
    {"TargetGroupArn":"<blue>","Weight":95},
    {"TargetGroupArn":"<green>","Weight":5}]}}]'
```

- 5 percent, watch the error rate and latency for ten minutes, then 25, then 50, then 100
- **The watching must be automatic.** A canary where a human decides is a canary that gets promoted because it is late

### The rule

- **Rolling by default, blue green for anything where a bad release is expensive**, canary when you have the metrics to judge automatically
- **All three are useless without a backward-compatible database.** The schema is the constraint, and the next page is about that
