### Streaming and Suspense

Because RSCs can be asynchronous, you don't have to wait for the slowest database query to finish before sending HTML to the user. You can stream the page in chunks.

```tsx
import { Suspense } from 'react';
import { SlowDataComponent } from './SlowDataComponent';
import { Skeleton } from './Skeleton';

export default function Page() {
  return (
    <main>
      <h1>Fast Header (Sends instantly)</h1>
      
      <Suspense fallback={<Skeleton />}>
        {/* React will stream this piece down the wire whenever it finishes loading */}
        <SlowDataComponent /> 
      </Suspense>
    </main>
  );
}
```
This massively improves the Time to First Byte (TTFB) and perceived performance of your application.
