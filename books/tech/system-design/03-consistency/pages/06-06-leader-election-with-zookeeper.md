## Leader election with ZooKeeper

- The most common use case for ZooKeeper is deciding which worker node should be the Leader. You do this using **Ephemeral Nodes**
- In ZooKeeper, you can create a file (called a "znode"). If you create it as an ephemeral node, it is tied to your active TCP connection. If you crash, ZooKeeper instantly deletes the file

```typescript
// Five identical workers boot up and run this code
async function becomeLeader() {
  try {
    // Try to create the '/leader' file. 
    // ZooKeeper guarantees only one client can succeed.
    await zk.create('/leader', 'Worker A', { ephemeral: true });
    
    console.log("I am the Leader!");
    startBackgroundJobs();
    
  } catch (error) {
    if (error.code === 'NODE_EXISTS') {
      console.log("Someone else is Leader. Watching for changes...");
      // Ask ZooKeeper to notify us if the file is deleted
      zk.watch('/leader', () => {
        // The Leader died! Try to become the Leader again.
        becomeLeader();
      });
    }
  }
}
```

- Because ZooKeeper is Linearizable, it mathematically guarantees that exactly one worker will successfully create the `/leader` file. The other four workers will fail, and instead place a **Watch** on the file. If Worker A's server burns down, its TCP connection drops, ZooKeeper deletes `/leader`, and the Watch wakes up the other four workers to race for the title

### The failure

- Building custom leader election via database rows. Developers often try to avoid deploying ZooKeeper by adding a `is_leader` boolean column to a database, and having workers ping it. They inevitably fail to handle the edge cases: what if the leader crashes without unsetting the boolean? You have to add a heartbeat column. What if clock drift makes the heartbeat look stale when it isn't? You will accidentally elect two leaders
