### The transport question

- **Winston can write directly to Loki, CloudWatch, Elasticsearch or a file.** That is its appeal and its trap
- **An in-process network transport blocks the event loop when the destination is slow**, and adds a dependency your application now has at runtime
- **Prefer stdout.** The container log driver, Alloy or the CloudWatch agent ships it. The application stays ignorant of where logs go, which is the twelve-factor rule from Module 1

- **Use pino by default. Use Winston when you need a format or a destination it does not have**
