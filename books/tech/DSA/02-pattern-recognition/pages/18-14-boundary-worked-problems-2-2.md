```ts
while (low < high) {
    const mid = low + Math.floor((high - low + 1) / 2); // Bias UP!
    if (isPossible(mid)) {
      low = mid;      // mid works, try to push distance higher
    } else {
      high = mid - 1; // mid failed, distance is too large
    }
  }
  return low;
}
```

### The pattern across both

- Neither problem involves searching for an element in an array
- Both problems construct a monotonic boolean function
- Both rely entirely on transforming an optimization request into a yes/no question
- If it's a "Minimise" problem → First True template. If it's a "Maximise" problem → Last True template (bias up)
