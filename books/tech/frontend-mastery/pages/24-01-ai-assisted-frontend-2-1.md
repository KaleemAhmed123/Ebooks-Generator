### 1. Context Engineering & Prompt Architecture

An LLM is only as smart as the context window you provide it. If you ask an AI agent to build a component without providing your design system tokens or your architectural guidelines, it will hallucinate outdated patterns (like using `class` components or importing generic CSS instead of Tailwind).

**The `.cursorrules` Pattern:**
Modern repositories contain explicit, markdown-based instructions specifically written for AI agents reading the repository. These files define the rules of engagement.

Example of a `.cursorrules` file in 2026:
```markdown

- **React:** Strictly use React 19 Function Components. DO NOT use `useMemo` or `useCallback` (we rely on the React Compiler).
- **Styling:** Strictly use Tailwind CSS. For complex variants, use `cva` and `tailwind-merge`. NEVER write generic CSS.
- **Data Fetching:** Do not use `useEffect` for data fetching. We use React Server Components exclusively for database reads.
- **Security:** Ensure all user-provided strings are sanitized before being rendered to prevent XSS. 
```

By engineering this context into your repository, the AI acts as a perfect pair-programmer that adheres flawlessly to your specific architectural decisions.

### 2. The Art of Code Auditing

When an AI agent drops 400 lines of code into your Pull Request, you cannot blindly hit "Approve." 
LLMs are confident liars. They will invent NPM packages that do not exist, use deprecated API endpoints, or introduce subtle Race Conditions in asynchronous JavaScript.

**The Senior Audit Checklist:**
1. **Security:** Did the AI accidentally expose a server-side secret (like `process.env.DATABASE_URL`) inside a Client Component?
2. **Performance:** Did the AI introduce a layout-thrashing DOM manipulation or an inefficient `O(n^2)` array traversal on a massive data set?
3. **Accessibility:** Did the AI remember to add `aria-labels` and manage focus state for screen readers? (AI notoriously forgets A11y).
4. **Dependencies:** Did the AI invent a library? Always verify the package exists in `package.json` before running the code.
