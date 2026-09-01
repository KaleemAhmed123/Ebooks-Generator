## Advanced TypeScript: Generics & Utility Types

As your application grows, you will find yourself writing duplicate types. TypeScript provides powerful mechanisms to keep your types DRY (Don't Repeat Yourself).

### Generics

Generics allow you to write a reusable function or component that can work with **any** data type, while still maintaining strict, 100% type safety. 

Imagine you want a function that takes an array, and returns the first item.
If you type it as `(items: any[]): any`, you lose all TypeScript safety. The compiler won't know if the returned item is a string, a number, or an object.

Instead, we use a Generic variable, usually denoted as `<T>` (for Type).

```typescript
// <T> tells TS: "Capture the type of whatever array is passed in, and lock it to the variable T"
function getFirstItem<T>(items: T[]): T {
  return items[0];
}

// TS automatically infers that T is a Number. 
// It guarantees that 'firstNum' is a Number.
const firstNum = getFirstItem([1, 2, 3]); 

// TS infers T is a String.
const firstStr = getFirstItem(["apple", "banana"]); 
```

**Generics in React:**
You use Generics in React all the time without realizing it. When you declare `const [count, setCount] = useState<number>(0)`, you are passing the `number` type into the `useState` Generic!
