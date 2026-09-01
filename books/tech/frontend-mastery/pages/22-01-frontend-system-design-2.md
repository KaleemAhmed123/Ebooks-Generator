## Frontend System Design - continued

#### 3. Data Model & State (10 mins)
Define the exact shape of the JSON that the API will return.
```typescript
interface Tweet {
  id: string;
  authorId: string;
  content: string;
  likes: number;
}
```
Explain where this data will live on the frontend.
- *"I will use React Query for the Feed data because it handles caching and pagination."*
- *"I will use Zustand for the currently logged-in User Object, because it's global UI state."*

#### 4. Interfaces / Component Tree (10 mins)
Draw the React component hierarchy.
- `<App>`
  - `<Header />`
  - `<Sidebar />`
  - `<FeedList>` (Explain that you will use Virtualization here because the feed is infinite!)
    - `<TweetCard />`

#### 5. Optimizations & Edge Cases (10 mins)
This is where Seniors prove their worth.
- **Performance:** *"I will Code Split the Heavy Video Player component using `React.lazy()` so it doesn't block the initial page load."*
- **Network:** *"If the user is on a subway and likes a tweet, I will use Optimistic UI Updates to turn the heart red instantly, and silently retry the API call in the background if the network drops."*
- **Security:** *"I will store the Authentication JWT in an HttpOnly cookie to prevent XSS attacks."*

If you can articulate these 5 steps clearly, you will pass any Senior System Design interview in the world.
