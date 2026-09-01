### Announce it

```bash
# a line in the team channel, and an annotation on the dashboard
curl -sX POST http://grafana:3000/api/annotations -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d "{\"text\":\"deploy $SHA\",\"tags\":[\"deploy\"]}"
```

- **The annotation is the one that matters.** When something breaks in an hour, the graph answers "did this start with a deploy" instantly

### Take the snapshot

- **Before anything with a migration**, take a database snapshot and write the id in the deploy notes. It costs a minute
