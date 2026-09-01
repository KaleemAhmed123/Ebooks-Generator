### The ES6 `class` Keyword
In 2015, JavaScript introduced the `class` keyword. It looks exactly like Java.
**Do not be fooled.** 

Under the hood, it is 100% "syntactic sugar" over the exact same Prototypal Inheritance model we just discussed. It does not introduce classical inheritance to JavaScript; it just hides the ugly `__proto__` syntax from developers.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

const dog = new Animal("Rex");
// Under the hood, dog.__proto__ points to Animal.prototype!
```
