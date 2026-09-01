## EventBridge

- SNS routes by topic. **EventBridge routes by the content of the event**, with rules that match on any field
- It also receives events from AWS services themselves, and it runs schedules, which makes it three tools in one

```bash
aws events put-events --entries '[{
  "Source": "orders.api",
  "DetailType": "order.created",
  "Detail": "{\"orderId\":\"o_842\",\"totalPaise\":50000,\"tier\":\"gold\"}"
}]'

aws events put-rule --name big-gold-orders --event-pattern '{
  "source": ["orders.api"],
  "detail-type": ["order.created"],
  "detail": { "tier": ["gold"], "totalPaise": [{ "numeric": [">", 100000] }] }
}'

aws events put-targets --rule big-gold-orders \
  --targets 'Id=1,Arn=arn:aws:sqs:ap-south-1:123456789012:vip-queue'
```
