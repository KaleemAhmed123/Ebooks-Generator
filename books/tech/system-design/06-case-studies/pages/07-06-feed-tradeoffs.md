## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| "I posted, refreshed, and it is not there" | the author's own list is written synchronously in the API before the 201; followers' lists go through the queue. The author sees the post at once, followers when the queue drains, seconds later |
| deleting or editing a post | the lists hold ids, so a delete removes the row and hydration drops the id; an edit changes the body in one place. Nothing walks 10 000 lists |
| a follower who has not opened the app in a month | no fan-out for them; the first open rebuilds the list from the pull path, then push resumes. Fan-out cost is spent on people who read |
| an unfollow | the id stays in the cached list until it ages out; hydration filters by current follows only if the product needs it to be immediate, and most do not |
| images and video | the post carries a media id; the bytes are in blob storage behind a CDN (booklet 05), uploaded as in Module 9, page 2. The post row never holds bytes |
| the fan-out queue is a minute behind | the post is late, not lost; queue lag is the dashboard metric and the worker pool scales on it. The author's synchronous write is what stops the double post |
| chronological or ranked | same retrieval, ranking as a stage after it (page 5). The interviewer wants to hear that ranking does not replace fan-out |

- The metric is time from post to visible in a follower's feed, at p99, which is the fan-out queue's lag measured at the far end. It is the one number that says whether the write path is keeping up with the read path it exists to serve
- Cross-references the design leans on: partitioning of `follows` and the hot key of a celebrity's follower list (booklet 02); the cache cluster itself, Module 4; queue, workers and lag (booklet 04); time-ordered ids (booklet 05)

### The failure

- The queue lags, the author does not see the post, and posts again. Two posts, and the proposed fix is a dedupe on text. The real fix is the synchronous write to the author's own list, plus a lag alert that pages before users notice. A lost-looking post is almost always a late one
