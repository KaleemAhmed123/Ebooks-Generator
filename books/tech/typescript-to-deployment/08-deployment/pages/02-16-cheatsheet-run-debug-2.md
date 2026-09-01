### Lifecycle

```bash
docker stop -t 45 api                      # give it 45 seconds
docker restart api
docker kill -s HUP api                     # send an arbitrary signal
docker rm -f api
docker update --memory 1g --cpus 2 api     # without recreating it
docker rename api api-old
```

### The debug container, for images with no shell

```bash
docker run -it --rm --pid container:api --network container:api \
  nicolaka/netshoot
```
