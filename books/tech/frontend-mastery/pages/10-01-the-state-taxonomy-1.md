# Module 10: State Management

## The State Taxonomy

If you built React applications in 2017, you likely used Redux. You were taught to put *everything* into a single, global Redux store. 

The API response for a list of products? Put it in Redux. 
The text currently typed inside an un-submitted search bar? Put it in Redux. 
Whether the dark-mode toggle is checked? Put it in Redux.

This architecture collapsed at scale. It created a monolith where a single keystroke in a search bar would trigger a global state update, potentially forcing the entire application to re-render. It also forced developers to write hundreds of lines of "boilerplate" code (Actions, Reducers, Dispatchers) just to toggle a boolean.
