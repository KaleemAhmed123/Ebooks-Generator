## Browser Architecture: The Rendering Pipeline - continued

#### 1. DOM and CSSOM Construction

The browser receives a stream of bytes, converts them to characters, tokenizes them, and builds nodes. These nodes are linked into a tree structure: the **Document Object Model (DOM)**. 

Concurrently, the browser processes CSS. CSS is render-blocking. The browser will not paint anything until the **CSS Object Model (CSSOM)** is fully constructed. Why? Because if it painted before CSS was ready, users would see a Flash of Unstyled Content (FOUC), followed by a massive, jarring layout shift.

#### 2. The Render Tree

The DOM and CSSOM are combined into the **Render Tree**. 
- The DOM contains all HTML elements.
- The Render Tree contains *only the nodes required to render the page*. 
- `display: none` elements are completely excluded from the Render Tree. (Note: `visibility: hidden` elements *are* included, because they still occupy space).

#### 3. Layout (Reflow)

Once the Render Tree is built, the browser calculates the exact geometry of every node: its size and position in the viewport. This phase is called **Layout** (or **Reflow** in WebKit/Blink terminology).

Layout is a recursive, global operation. If you change the width of a `div` at the top of the page, it can push down every subsequent element, forcing the browser to recalculate the geometry for thousands of nodes. This is extremely expensive.

#### 4. Paint and Compositing

After Layout, the browser knows *where* elements go, but not what they *look like*. The **Paint** phase fills in the pixels: text colors, borders, and shadows.

Modern browsers don't paint directly to a single flat canvas. They paint onto separate **Layers**. Finally, the **Compositor Thread** takes these layers and draws them to the screen.
