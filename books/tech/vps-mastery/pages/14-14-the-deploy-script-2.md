## The whole deploy script - continued

```bash
# 5. flip
echo "$CURRENT" > .active-color.prev
write_color_conf "$NEXT"
$EDGE exec -T nginx nginx -t
$EDGE exec -T nginx nginx -s reload
echo "$NEXT" > .active-color

# 6. watch real traffic, revert on failure
if ! post_flip_check; then
  write_color_conf "$CURRENT"
  $EDGE exec -T nginx nginx -s reload
  echo "$CURRENT" > .active-color
  echo "reverted to $CURRENT"
  exit 1
fi

# 7. drain and remove the old color
sleep 60
docker compose -p "app-$CURRENT" -f app/docker-compose.yml down --remove-orphans
docker image prune -f

echo "deployed $IMAGE_TAG on $NEXT"
```

- Steps 4 and 6 are the whole point. Every other line is arranging containers
