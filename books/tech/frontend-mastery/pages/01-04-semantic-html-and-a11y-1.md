## Semantic HTML and Accessibility (A11y)

In modern web development, HTML is often treated as a mere skeleton to hang JavaScript and CSS on. Developers instinctively reach for `<div>` and `<span>` for everything, recreating native functionality from scratch. This is a severe anti-pattern that destroys accessibility, SEO, and developer ergonomics.

Semantic HTML is about using elements for their given meaning, not just their default visual presentation.

### The Document Outline

A web page is not a flat canvas; it is a structured document. Assistive technologies, like screen readers, navigate this document using the implicit outline created by semantic tags.

- **`<header>`**: Represents introductory content or navigational links.
- **`<nav>`**: Reserved strictly for major navigation blocks.
- **`<main>`**: The dominant content of the document. There should only be one `<main>` visible on a page.
- **`<article>`**: A self-contained composition that could theoretically be syndicated independently (e.g., a blog post, a news story).
- **`<section>`**: A generic thematic grouping of content, typically with a heading.
- **`<aside>`**: Content tangentially related to the main content (e.g., sidebars, pull quotes).

When you use these tags, you automatically provide **landmarks** for screen reader users, allowing them to jump directly to the main content or navigation without tabbing through every single link on the page.
