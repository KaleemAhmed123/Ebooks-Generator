## Container Queries and `:has()`

Two selectors changed what CSS can express without JavaScript. Both arrived because the old model asked the wrong question.

### The problem with media queries

A media query asks about the **viewport**. That was the right question in 2012, when a page was one column and the viewport was the only variable.

It is the wrong question for components. A product card does not care how wide the browser window is. It cares how wide **its own slot** is. The same card sits in a 900px main column, a 280px sidebar, and a 3-across grid, and it should look different in each. A media query cannot tell those apart, because the viewport is identical in all three.

Teams worked around it with prop drilling. `<Card variant="compact" />` in the sidebar, `<Card variant="full" />` in the main area. Now layout decisions live in JavaScript, every parent has to know which variant its child needs, and the component cannot be moved without editing its caller.
