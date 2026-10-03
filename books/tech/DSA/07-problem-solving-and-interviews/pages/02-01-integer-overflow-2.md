### The Trap: Cumulative Sums

If a problem says "the array elements are between 1 and 10⁹", and you need to keep a running total of the array (e.g., Prefix Sums), the sum will easily exceed 2 billion after just 3 elements. 
If you are coding in C++ or Java, you **must** use a 64-bit integer (`long long` or `long`).

```cpp
// THE WRONG APPROACH (C++)
int sum = 0; // will overflow on the 3rd element
for (int x : arr) sum += x;

// THE FIX
long long sum = 0;
for (int x : arr) sum += x;
```

In TypeScript, if a problem warns that numbers can exceed 10¹⁵, you must use the `BigInt` primitive.

```ts
let sum = 0n; // Note the 'n' suffix
for (let x of arr) {
  sum += BigInt(x);
}
```
