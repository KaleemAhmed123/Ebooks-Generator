## The rules that make a service deployable

- The **twelve-factor** list was written in 2011 for a platform that no longer exists, and about half of it is now simply how software is built
- These are the parts that still decide whether a service can be deployed twice, scaled, or rolled back

### 1. Configuration comes from the environment

- No `config.production.json` in the repository. The same artifact must run in staging and production, differing only by environment variables
- **If a build produces a different image per environment, you cannot promote a tested artifact.** You can only rebuild and hope

### 2. The process is stateless

- Nothing important lives in memory or on the local disk. Sessions go to Redis, uploads go to S3, jobs go to a queue
- **A stateless process can be killed at any moment**, which is what makes scaling, rolling deploys and spot instances possible

### 3. Backing services are attached resources

- The database is a URL in an environment variable. Swapping a local Postgres for RDS is a configuration change, not a code change

### 4. Logs go to stdout

- The process writes to standard output. Something else decides where that goes
- **Writing to a log file inside a container is how logs disappear** when the container does

### 5. Start fast, stop cleanly

- A process that takes ninety seconds to boot makes every deploy and every scale-up slow
- On `SIGTERM` it must stop accepting work, finish what it has, and exit. Booklet 3 covers the code; this booklet covers who sends the signal

### 6. Development and production run the same way

- Same image, same Postgres major version, same Node version. **Every difference is a bug that only appears in production**
