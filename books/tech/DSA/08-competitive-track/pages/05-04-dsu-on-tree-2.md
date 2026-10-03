### Implementation Structure

```cpp
void dfs(int u, int p, bool keep) {
    // 1. Process all light children, clearing their data
    for (int v : adj[u]) {
        if (v != p && v != heavy[u]) {
            dfs(v, u, false);
        }
    }
    
    // 2. Process heavy child, keeping its data
    if (heavy[u] != -1) {
        dfs(heavy[u], u, true);
    }
    
    // 3. Add u's data and light children's data into the global array
    add(u, p, 1); 
    
    // 4. Record answer for u
    ans[u] = countDistinct;
    
    // 5. If this was a light child call, clear everything
    if (!keep) {
        add(u, p, -1);
    }
}
```
