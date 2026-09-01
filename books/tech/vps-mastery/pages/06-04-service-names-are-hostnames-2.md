### Aliases

```yaml
services:
  postgres:
    networks:
      default:
        aliases: [db, primary-db]
```

- Useful when an existing configuration file hardcodes a different hostname
