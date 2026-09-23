## Intersection Observer - continued

```jsx
// 2. Tell it which HTML element to watch
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Clean up
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imageRef}
      src={isVisible ? src : 'placeholder.jpg'}
      alt={alt}
      style={{ opacity: isVisible ? 1 : 0.5, transition: 'opacity 0.5s' }}
    />
  );
}
```

### Implementing Infinite Scroll
You can use this exact same pattern to implement Infinite Scroll.
Place an invisible `<div>` at the very bottom of your list of items. Attach an `IntersectionObserver` to that `<div>`. When the observer fires, it means the user scrolled to the bottom of the list, so you execute your `fetchNextPage()` API call.
