## What changed in version 7

- The AI SDK moves quickly, and most examples online are written for version 5. Reading them against version 7 produces errors that look like your mistake
- This page is the translation table, because the renames are mechanical once you know them

| Version 5 | Version 7 |
|---|---|
| `system` | `instructions` |
| `stepCountIs` | `isStepCount` |
| `onFinish` | `onEnd` |
| `onStepFinish` | `onStepEnd` |
| `fullStream` | `stream` |
| `experimental_transcribe` | `transcribe` |
| `experimental_output` | `output` |
| `experimental_telemetry` | `telemetry` |
| `experimental_prepareStep` | `prepareStep` |
| `context` (tool scope) | `runtimeContext` shared, `context` per tool |
| `{ type: "image" }` part | `{ type: "file", mediaType: "image" }` |

### The removals that break a build

- **Node 22 or newer is required.** Node 18 and 20 are dropped
- **ESM only.** There is no CommonJS build, so a `require` of it fails outright
- `needsApproval` on a tool moved to the `toolApproval` call option
- `cachedInputTokens` and `reasoningTokens` left `LanguageModelUsage`, so cost code reading them silently gets `undefined`

### The behavior change worth reading twice

- Top-level `usage`, `content`, `toolCalls`, `files` and `warnings` now **aggregate every step**, where they used to describe the final one
- Code that read `result.toolCalls` on a five-step agent now sees all of them, not the last
- Use `finalStep` when the final step is what you meant
