### The pre-allocation trap

- If you know exactly how many items you are going to put into a dynamic array, do not let it resize itself.
- **Why it breaks:** If you append 100,000 items starting from capacity 1, the array will trigger roughly 17 resizes, copying tens of thousands of elements pointlessly
- **The fix:** Pre-allocate the capacity. `new ArrayList<>(100000)` or `new Array(100000)`. This guarantees exactly zero resizes

```ts
// Simulating a dynamic array under the hood
class DynamicArray {
  private arr: number[];
  private capacity: number;
  public length: number;

  constructor(initialCapacity = 2) {
    this.capacity = initialCapacity;
    this.arr = new Array(this.capacity);
    this.length = 0;
  }

  push(val: number) {
    if (this.length === this.capacity) {
      this.resize();
    }
    this.arr[this.length] = val;
    this.length++;
  }

  private resize() {
    this.capacity *= 2;
    const newArr = new Array(this.capacity);
    for (let i = 0; i < this.length; i++) {
      newArr[i] = this.arr[i]; // O(N) copy
    }
    this.arr = newArr;
  }
}
```
