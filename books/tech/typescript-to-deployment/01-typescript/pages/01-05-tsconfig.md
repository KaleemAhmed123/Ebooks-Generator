## The `tsconfig.json` file

- `tsconfig.json` is the compiler's settings file
- It sits at the project root, and it marks where the project begins
- Generate a commented starter with `npx tsc --init`
- Below is a working config for a Node service on TypeScript 7

```json
{
  "compilerOptions": {
    "target": "es2023",
    "lib": ["es2023"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "erasableSyntaxOnly": true,
    "sourceMap": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```
