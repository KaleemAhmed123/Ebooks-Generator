### How to implement in React (Without Next.js)

React provides a built-in function called `lazy()` and a component called `<Suspense>` to handle this automatically.

```jsx
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

// BAD: The Old Way: This forces the Settings component into the main bundle!
// import Settings from './pages/Settings';

// GOOD: The Modern Way: This tells Webpack/Vite to create a separate "Settings.js" file
const Settings = lazy(() => import('./pages/Settings'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <BrowserRouter>
      {/* Suspense provides the fallback UI while the chunk is downloading over the network */}
      <Suspense fallback={<div>Loading Page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### Component-Based Code Splitting
You don't have to limit code splitting to routes! You can split massive components on the exact same page.

Imagine a blog post page. At the very bottom of the page is a massive `<HeavyRichTextCommentEditor />` component. The user has to scroll for 2 minutes to even see it.
Why should they download the 2MB Rich Text library when the page first loads?

You can `lazy()` import the Comment Editor. It will not be downloaded until the React Router actually attempts to render it, saving massive amounts of initial load time and drastically improving your Largest Contentful Paint (LCP) score.
