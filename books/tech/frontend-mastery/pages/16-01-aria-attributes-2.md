### What is ARIA?
Sometimes, native HTML isn't enough. If you build a complex Custom Dropdown, a Custom Slider, or a Modal window, there is no `<modal>` tag in HTML. 

**ARIA (Accessible Rich Internet Applications)** is a set of special HTML attributes that you add to your custom elements to explicitly tell Screen Readers what the element is and what state it is in.

#### 1. `role`
If you absolutely *must* use a `<div>` as a button (which you shouldn't), you must give it a role.
`<div role="button" tabindex="0">Click Me</div>`

#### 2. `aria-label`
If a button only has an icon (like a trash can icon) and no text, a Screen Reader doesn't know what it does.
`<button aria-label="Delete Item"><TrashIcon /></button>`

#### 3. `aria-expanded` and `aria-hidden`
If you have an accordion, the Screen Reader needs to know if it is currently open or closed.
```jsx
function Accordion() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
        More Info
      </button>
      {/* We hide the content from the screen reader when it is closed */}
      <div aria-hidden={!isOpen}>
        Hidden details here...
      </div>
    </div>
  );
}
```

**The Golden Rule of ARIA:** No ARIA is better than bad ARIA. Only use it when native HTML elements fall short.
