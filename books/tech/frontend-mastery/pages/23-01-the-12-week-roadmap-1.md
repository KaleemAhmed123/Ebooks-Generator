# Module 23: The Path Forward

## The 12-Week Roadmap to Senior Frontend

If you are a beginner, do not try to learn Next.js, Redux, and Tailwind all at the same time. You will suffer from "Tutorial Hell." You must learn the stack sequentially, understanding *why* each tool exists before you adopt it.

Follow this strict 12-week progression:

### Weeks 1-3: The Vanilla Core
- **The Goal:** Master HTML, CSS, and Vanilla JS.
- **The Project:** Build a classic Calculator and a Weather App using `fetch()`.
- **The Rules:** You are strictly forbidden from using React, Vue, jQuery, or Tailwind. Write raw CSS. Write raw DOM manipulation (`document.createElement`).
- **Why?** Once you feel the pain of manually managing DOM updates, you will deeply understand why React was invented.

### Weeks 4-6: The React Shift
- **The Goal:** Understand Declarative UI and Component Architecture.
- **The Project:** Rewrite your Weather App using React (via Vite).
- **The Rules:** You are only allowed to use `useState` and `useEffect`.
- **Why?** You will learn how to break an app down into reusable components (`<WeatherCard />`, `<SearchBar />`) and how data flows downward via Props.

### Weeks 7-8: State at Scale
- **The Goal:** Escape the "Prop Drilling" nightmare.
- **The Project:** Build a global Shopping Cart for a fake e-commerce store.
- **The Rules:** Integrate Zustand for the Cart, and React Router for the URL navigation.
- **Why?** You will learn how to manage global UI state efficiently without forcing your entire component tree to re-render.
