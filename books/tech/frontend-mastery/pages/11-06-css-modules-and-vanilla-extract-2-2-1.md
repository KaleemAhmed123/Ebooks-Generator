### The Problem with CSS-in-JS (Runtime)

A few years ago, libraries like **Styled Components** and **Emotion** were extremely popular. They allowed you to write CSS directly inside your JavaScript files using template literals.

```tsx
// Styled Components example
const StyledButton = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
`;
```

However, these libraries rely on **Runtime CSS injection**. 
When your component mounts, JavaScript has to parse the template literal, generate CSS strings, create a `<style>` tag, and inject it into the `<head>` of the document.

This has devastating performance implications:
1. It increases your JavaScript bundle size.
2. It blocks the main thread during render.
3. **It is incompatible with React Server Components (RSC).** Because Server Components never run in the browser, there is no runtime available to inject the `<style>` tag.
