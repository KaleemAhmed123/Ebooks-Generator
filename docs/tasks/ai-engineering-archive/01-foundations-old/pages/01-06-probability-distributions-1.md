## Probability, random variables, and the five distributions

- **Probability** — a number between 0 and 1 expressing how likely an event is. Three axioms define it all: P(A) ≥ 0; P(sample space) = 1; P(A or B) = P(A) + P(B) when A and B are mutually exclusive
- **Random variable** — a function from outcomes to numbers. Discrete random variables have a **PMF** (probability mass function) giving P(X = k) for each k. Continuous random variables have a **PDF** (probability density function); probability comes from integrating the density, not reading it directly
- **Expected value** E[X] = Σ x·P(X=x) — the long-run average. **Variance** Var(X) = E[(X − μ)²] — how spread out the distribution is

### Five distributions every AI engineer uses

<svg viewBox="0 0 460 88" role="img" aria-label="Five distributions: Bernoulli for binary, Categorical for multiclass, Normal for initialization and noise, Uniform for random sampling, Poisson for counts" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <text x="46" y="14" text-anchor="middle" font-weight="bold">Bernoulli</text>
  <rect x="8" y="20" width="74" height="62" rx="2" fill="none" stroke="#1a1a1a"/>
  <rect x="20" y="56" width="20" height="20" fill="#1a1a1a"/>
  <rect x="50" y="40" width="20" height="36" fill="#24405e"/>
  <text x="30" y="88" text-anchor="middle" fill="#6b6b6b">0</text>
  <text x="60" y="88" text-anchor="middle" fill="#6b6b6b">1</text>
  <text x="46" y="35" text-anchor="middle" fill="#6b6b6b">P(1)=p</text>
  <text x="138" y="14" text-anchor="middle" font-weight="bold">Categorical</text>
  <rect x="100" y="20" width="76" height="62" rx="2" fill="none" stroke="#1a1a1a"/>
  <rect x="108" y="52" width="12" height="24" fill="#1a1a1a"/>
  <rect x="124" y="40" width="12" height="36" fill="#24405e"/>
  <rect x="140" y="56" width="12" height="20" fill="#1a1a1a"/>
  <rect x="156" y="68" width="12" height="8" fill="#1a1a1a"/>
  <text x="138" y="35" text-anchor="middle" fill="#6b6b6b">k classes</text>
  <text x="230" y="14" text-anchor="middle" font-weight="bold">Normal (Gaussian)</text>
  <rect x="192" y="20" width="76" height="62" rx="2" fill="none" stroke="#1a1a1a"/>
  <path d="M196 78 Q230 24 264 78" fill="#e8f4fd" stroke="#24405e"/>
  <text x="230" y="35" text-anchor="middle" fill="#24405e">μ,σ²</text>
  <text x="322" y="14" text-anchor="middle" font-weight="bold">Uniform</text>
  <rect x="284" y="20" width="76" height="62" rx="2" fill="none" stroke="#1a1a1a"/>
  <rect x="296" y="42" width="52" height="34" fill="#e8f4fd" stroke="#24405e"/>
  <text x="322" y="35" text-anchor="middle" fill="#6b6b6b">[a, b]</text>
  <text x="414" y="14" text-anchor="middle" font-weight="bold">Poisson</text>
  <rect x="376" y="20" width="76" height="62" rx="2" fill="none" stroke="#1a1a1a"/>
  <rect x="384" y="64" width="8" height="12" fill="#1a1a1a"/>
  <rect x="396" y="46" width="8" height="30" fill="#24405e"/>
  <rect x="408" y="54" width="8" height="22" fill="#1a1a1a"/>
  <rect x="420" y="68" width="8" height="8" fill="#1a1a1a"/>
  <rect x="432" y="74" width="8" height="2" fill="#1a1a1a"/>
</svg>

| Distribution | When it appears in AI |
|---|---|
| **Bernoulli** | Binary classification output (sigmoid) |
| **Categorical** | Multiclass output (softmax), next-token sampling |
| **Normal** | Weight initialization (He, Xavier), noise in diffusion models |
| **Uniform** | Dropout masks, random hyperparameter search |
| **Poisson** | Modelling count data (tokens per request, events per second) |
