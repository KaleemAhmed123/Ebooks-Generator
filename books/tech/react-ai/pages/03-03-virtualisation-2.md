### When virtualisation is necessary

- Lists over 200 items where each row has meaningful DOM structure
- Tables with many columns and many rows
- Infinite scroll feeds

### When it is overkill

- Lists under 100 items — the DOM overhead is smaller than the virtualiser overhead
- Lists where rows are very different heights and measurement is expensive
- Lists that are paginated — if you never show more than 20 items at once, virtualise nothing

- The container must have a fixed height. Virtualisation cannot work inside a container that grows to fit its children
