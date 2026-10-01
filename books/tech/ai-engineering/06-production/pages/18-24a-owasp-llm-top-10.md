## The OWASP LLM Top 10

- Security teams speak in frameworks, and the **OWASP Top 10 for LLM Applications** is the one to know — a community-standard list of the most critical LLM security risks, the LLM analogue of the classic web OWASP Top 10. It organises everything in this cluster into a checklist an auditor recognises. **[VERIFY current list]**

| Risk | Where this booklet covers it |
|---|---|
| **prompt injection** | 18-18/19 (direct + indirect) |
| **insecure output handling** | trusting model output in downstream code |
| **training-data poisoning** | 18-09 (sleeper agents), 18-34 (provenance) |
| **model denial of service** | resource-exhausting inputs (long context, loops) |
| **supply-chain vulnerabilities** | 18-34, 19-56 (MCP servers, weights, plugins) |
| **sensitive information disclosure** | 18-16a (prompt leak), 18-39 (PII/extraction) |
| **insecure plugin/tool design** | 19-37 (over-permissioned tools) |
| **excessive agency** | 18-18, Booklet 5 (too much autonomy/privilege) |
| **overreliance** | 18-05a (users trusting confident wrong output) |
| **model theft** | exfiltrating weights or distilling the model via the API |

- **The value is a shared vocabulary and a coverage map.** Most of these you've met under their own names in this cluster; the framework's contribution is naming them as a *standard set* an auditor, a customer's security team, and a penetration tester all recognise — so "we addressed the OWASP LLM Top 10" is a claim they can check, item by item.

:::note
The framework is best used as a **threat-modelling checklist**: for each of the ten risks, walk it against your specific system, decide whether it applies, and name your mitigation. That structured pass catches the risk you'd otherwise miss — most teams remember prompt injection and forget insecure output handling or model DoS. It doesn't replace understanding *why* each risk exists (this whole module) or the architectural defenses (least privilege, trifecta-breaking); it ensures you *cover* them. The next page draws out the two entries this cluster hasn't spotlighted.
:::
