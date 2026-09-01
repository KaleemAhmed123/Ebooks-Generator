### The Solution: The STAR Method
You must answer every single behavioral question using the **STAR** framework.

#### 1. Situation (10%)
Set the scene in one or two sentences.
> *"At my last company, our main E-commerce dashboard was taking 8 seconds to load, and the Product Manager was furious."*

#### 2. Task (10%)
What was your specific responsibility?
> *"My task was to figure out why the React application was so slow and fix it before the Black Friday sale."*

#### 3. Action (60%)
What did YOU actually do? (Do not say "We". Say "I"). Explain the technical trade-offs and interpersonal communication.
> *"I ran a Webpack Bundle Analyzer and discovered that we were shipping a massive 2MB charting library to the client on initial load. I scheduled a quick meeting with the Lead Engineer. We disagreed at first on how to fix it. They wanted to switch charting libraries, but I suggested that would take too long. Instead, I proposed using React.lazy() to Code Split the component. I showed him a quick Proof of Concept, and he agreed."*

#### 4. Result (20%)
What was the quantifiable business outcome?
> *"By implementing the lazy loading, the initial bundle size dropped by 60%. The Largest Contentful Paint (LCP) went from 8 seconds to 1.5 seconds. Our Black Friday sale went perfectly, and conversion rates actually increased by 5% because the site felt so much faster."*

### Preparation
Before any interview, write down 4 stories using the STAR method on a piece of paper. You can usually twist those 4 stories to answer almost any behavioral question they throw at you.
