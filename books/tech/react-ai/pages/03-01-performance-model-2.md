### When memo helps

| Scenario | Memo helps? |
|---|---|
| Large list of rows, parent re-renders on unrelated state | Yes |
| Simple UI primitive, parent re-renders often | No — comparison costs as much as the render |
| Component does heavy calculation per render | Fix with `useMemo` first, memo second |
| Component always gets new object props from parent | No — shallow compare always fails |

- The last row is the most common mistake: wrapping a component in `memo` while passing `{ id: order.id }` as a new object on every render, making the memo useless
