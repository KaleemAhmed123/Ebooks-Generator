## Integer Overflow

In a coding interview, failing to account for integer overflow turns a perfect algorithm into a failed test case. 

### The Problem

In languages like C++ and Java, standard 32-bit signed integers wrap around at roughly 2.14 billion (2 times 10⁹).
If you add two numbers that exceed this limit, the result wraps around to negative two billion. Your algorithm will quietly proceed with garbage data.

While JavaScript numbers are double-precision floats that can safely represent integers up to 9 times 10¹⁵ (`Number.MAX_SAFE_INTEGER`), interviewers will still test your awareness of overflow mechanics. In TypeScript, bitwise operations (`|`, `&`, `>>`) implicitly coerce numbers to 32-bit signed integers, meaning they **will** overflow if you use them on numbers larger than 2 billion.

### The Trap: Calculating the Midpoint

The single most common overflow bug occurs on line 3 of a Binary Search.

```ts
// THE WRONG APPROACH
let left = 0;
let right = 2_000_000_000;
let mid = Math.floor((left + right) / 2); // left + right = 4 Billion! OVERFLOW!
```

If `left + right` exceeds the 32-bit limit, the addition happens *before* the division. The sum wraps to a massive negative number, and dividing it by 2 gives a massive negative index. `array[-1000000000]` throws an out-of-bounds error.

### The Fix

Never add `left` and `right` together. Calculate the distance between them, divide the distance in half, and add it to `left`.

```ts
// THE FIX
let left = 0;
let right = 2_000_000_000;
let mid = left + Math.floor((right - left) / 2); // Safe!
```

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
