## Prototypal Inheritance - continued

```js
const animal = {
  eats: true,
  walk() {
    console.log("Animal walk");
  }
};

const rabbit = {
  jumps: true
};

// We manually set rabbit's prototype to be animal
rabbit.__proto__ = animal;

console.log(rabbit.jumps); // true (found on rabbit)
console.log(rabbit.eats);  // true (found on animal via the prototype chain)
rabbit.walk();             // "Animal walk" (found on animal via the prototype chain)
```

### Array Prototypes
When you create an array `const arr = [1, 2, 3]`, how does it magically have access to `.map()` and `.filter()`? 
You didn't write those methods. 

They exist on `Array.prototype`. Every time you create an array, its hidden `__proto__` property is automatically pointed to `Array.prototype`.

```js
const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype); // true
```
