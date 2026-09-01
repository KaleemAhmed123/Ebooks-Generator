### Canary is the next step, and it is a large one

- Blue-green switches everyone at once. Canary sends 5% of traffic to the new version and watches error rates

```nginx
split_clients "${remote_addr}${date_gmt}" $backend {
    5%      gateway_green;
    *       gateway_blue;
}
```

- This works, and then the questions start: which metrics decide, over what window, what happens to a user who lands on green then blue, how do sessions behave
- **Canary needs monitoring good enough to make an automated judgment.** Without that it is blue-green with extra confusion

### The order to build things in

1. Health checks and a deploy that verifies
2. Backups that have been restored
3. Blue-green
4. Monitoring that can tell a bad deploy from a bad afternoon
5. Only then, canary
