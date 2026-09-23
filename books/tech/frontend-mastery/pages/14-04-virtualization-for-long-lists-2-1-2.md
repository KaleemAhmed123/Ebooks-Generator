## Virtualization for Long Lists - continued

```jsx
return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      {/* We MUST set the total height of the inner container so the scrollbar represents all 100,000 items */}
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
        
        {/* We ONLY map over the tiny subset of items currently visible in the window. */}
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              // We manually push the row down to its correct absolute pixel position
              transform: `translateY(${virtualRow.start}px)`, 
            }}
          >
            Row {virtualRow.index}: {items[virtualRow.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Do not write this yourself
