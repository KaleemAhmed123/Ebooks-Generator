## Regulatory frameworks

- Lab frameworks are voluntary (18-29). **Regulation** is the binding backstop, and by 2026 it is real, fragmented, and something a deployer must design for — the rules differ by jurisdiction and by use-case risk. **[VERIFY current status/dates]**

| Jurisdiction | Instrument | Shape |
|---|---|---|
| **EU** | AI Act | risk-tiered, binding, phased rollout |
| **US** | executive actions + sectoral + state | patchwork, agency-led, evolving |
| **UK** | pro-innovation + AISI | principles-based, safety-institute-led |
| **Korea / others** | AI Basic Act and peers | emerging national frameworks |

- **The EU AI Act is the template to know.** It classifies systems by risk: *unacceptable* (banned — e.g. social scoring), *high-risk* (heavy obligations — conformity assessment, documentation, human oversight, for uses like hiring, credit, medical), *limited* (transparency — tell users they're dealing with AI), and *minimal* (unregulated). General-purpose/frontier models carry their own tier of obligations (documentation, systemic-risk evaluation).
- **The US is a patchwork:** executive actions, sector regulators (FTC, FDA), and state laws rather than one comprehensive act — so compliance depends on your sector and states. The UK leans principles-based with the AI Safety Institute doing evaluation rather than a single statute.

:::interview
"Your product will ship in the EU, US, and UK. What does regulation force into the design?"

Design to the strictest binding regime and layer the rest. The **EU AI Act** likely puts a hiring/credit/medical use in the *high-risk* tier — so I'd build in conformity documentation, logged decisions, human oversight, and bias evaluation *from the start*, because retrofitting them is expensive (17-54). At minimum, **transparency** (disclose it's AI) is near-universal. For the **US** I'd check the relevant sector regulator and state laws; for the **UK**, principles plus AISI engagement for a frontier model. The senior move is treating the risk *tier of the use-case*, not the technology, as what sets the obligations — and pulling compliance into requirements, not launch.
:::
