## The `infer` Keyword

The `infer` keyword is the most advanced, mind-bending feature in TypeScript. It allows the compiler to pattern-match against a type, extract a specific sub-type from it, and assign it to a temporary variable that you can use!

You can only use `infer` inside of a Conditional Type (inside an `extends` clause).

### Unwrapping a Promise
Imagine you are using a third-party API library. The library exports a function `fetchUser()` that returns a `Promise<User>`. However, the library author forgot to export the actual `User` interface!

You have a Promise, but you desperately need to know what the data inside the Promise looks like. 

You can use `infer` to reach inside the Promise and extract the inner type.

```typescript
// 1. We take a generic type 'T'
// 2. We check if 'T' is a Promise.
// 3. If it IS a Promise, we use 'infer U' to say: 
//    "Whatever type is inside this promise, grab it, and call it 'U'".
// 4. We then return 'U'.
type UnwrappedPromise<T> = T extends Promise<infer U> ? U : T;

// The third-party function
declare function fetchUser(): Promise<{ id: string, name: string }>;

// We use the built-in 'ReturnType' utility to grab the Promise, 
// and our custom 'UnwrappedPromise' to extract the data inside!
type FetchedData = UnwrappedPromise<ReturnType<typeof fetchUser>>;
// The type is now correctly extracted: { id: string, name: string }!
```
