### Building a Compound Accordion

1. **Create the Context:**
```jsx
const AccordionContext = React.createContext();
```

2. **Create the Parent Component:** it owns the state and shares it downward.
```jsx
function Accordion({ children }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <AccordionContext value={{ openIndex, setOpenIndex }}>
      <div className="accordion-wrapper">{children}</div>
    </AccordionContext>
  );
}
```

3. **Create the Child Components:**
```jsx
function AccordionItem({ children }) {
  return <div className="border-b">{children}</div>;
}

function AccordionHeader({ index, children }) {
  const { openIndex, setOpenIndex } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  return (
    <button onClick={() => setOpenIndex(isOpen ? null : index)}>
      {children} {isOpen ? '[-]' : '[+]'}
    </button>
  );
}

function AccordionContent({ index, children }) {
  const { openIndex } = useContext(AccordionContext);
  if (openIndex !== index) return null;
  return <div className="p-4">{children}</div>;
}
```
