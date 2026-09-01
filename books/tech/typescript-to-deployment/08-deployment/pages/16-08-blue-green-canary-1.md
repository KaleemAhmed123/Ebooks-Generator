## Rolling, blue green and canary

| Strategy | How | Cost | Rollback |
|---|---|---|---|
| **rolling** | replace a few at a time | none | roll forward, or roll back slowly |
| **blue green** | a full second environment, switch all at once | double, briefly | **instant** |
| **canary** | a small share of traffic first | small | instant, before most users saw it |

### Rolling

- The default on ECS and in an ASG instance refresh. **Both versions serve traffic at the same time**, which the application has to tolerate
- Good enough for most services, and it is why backward-compatible migrations matter

### Blue green

```bash
aws elbv2 modify-listener --listener-arn <listener> \
  --default-actions Type=forward,TargetGroupArn=<green-tg>
```

- Two target groups. Deploy to the idle one, verify it properly, then move the listener
- **Rollback is moving the listener back, in seconds.** That is the entire reason to accept the doubled cost
- CodeDeploy automates it for ECS, including automatic rollback on an alarm
