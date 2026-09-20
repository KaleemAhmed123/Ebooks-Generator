## API and data model

- The API requires an idempotency key (→01) so upstream services can retry safely

```typescript
POST /v1/notifications
Headers:
  Idempotency-Key: "uuid-1234"
Body:
  userId: "usr_99"
  type: "ORDER_SHIPPED"
  payload: { orderId: "123" }
```

- The model needs a device registry and opt-out preference table to avoid violating spam laws

```typescript
interface DeviceToken {
  userId: string;       // PK
  deviceToken: string;  // APNs/FCM token
  platform: 'IOS' | 'ANDROID';
}

```

### The failure

- Hardcoding the recipient's email or phone number in the API request. The upstream service shouldn't know the phone number. It should just say "notify user 99". The notification system looks up the routing info

:::interview
Your API requires the caller to provide the `deviceToken`. An upstream billing service wants to send a payment failed push. How does the billing service know the user's iPhone token?

It shouldn't. Upstream provides a `userId`. The notification system maintains a registry mapping user IDs to active APNs/FCM tokens.
:::
