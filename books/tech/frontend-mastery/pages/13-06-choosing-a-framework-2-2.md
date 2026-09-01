### The questions that actually decide it

Framework comparison articles rank on features. Teams decide on these:

1. **What is the content-to-interaction ratio?** A page that is 95% text and 5%
   widget wants Astro. A page that is one large stateful interface wants a React
   framework, or no framework at all.
2. **Do you need SEO?** If the answer is no, and it is no for anything behind a
   login, half the framework's value evaporates and a Vite single page app is
   simpler and faster to build.
3. **Where does the data live?** If your database is in one region, the edge
   story you are being sold is worth less than the diagram suggests.
4. **Who maintains this in two years?** Hiring for Next.js is easy. Hiring for
   Qwik is not. That is a real cost even when it is not a technical one.
5. **How much does the hosting lock you in?** Next.js runs anywhere, but some
   features are markedly better on Vercel. Know which ones before you depend on
   them.

### One thing that transfers

Underneath the branding, all of these frameworks are solving the same four
problems: **routing, data loading, rendering strategy, and bundling.** Learn
those four as concepts and switching framework is a week of syntax rather than
a re-education.

That is why this booklet spends its time on Server Components, streaming,
caching and hydration rather than on any one framework's API surface. The API
will be renamed. The problem will not.
