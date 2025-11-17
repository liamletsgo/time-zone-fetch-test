# Spec: Human-Friendly Time Explainer

## 1. Goal

Provide simple, human-readable answers to questions like:

> “What time is it in Tokyo right now?”  
> “What time is it in New York and London?”  

using our existing timezone tools and agents.

This spec extends the existing time workflow by adding:

- A **HumanTimeAgent** that turns raw time data into natural language.
- Orchestrators for a **single timezone** and **all supported timezones**.
- JSON API endpoints to expose these results.
- A simple **Next.js page** to interact with the feature.

The feature must support all of our demo timezones:

- `Asia/Tokyo`
- `America/New_York`
- `Europe/London`
- `UTC`

---

## 2. Existing Context

Reuse types and tools from `src/tools/timeTools.ts`:

- `TimezoneId`
- `ZonedTime`
- Functions:
  - `getCurrentTimeInZone(timezone: TimezoneId): ZonedTime`

We assume the Dev Contract in `docs/01-DEV-CONTRACT.md` and the time workflow spec are already in place.

---

## 3. Shared Types & Constants

### 3.1 Timezone Labels

Create a centralized mapping for human-friendly labels for each supported timezone.

Location (choose one, but be consistent):

- Either in `src/agents/humanTimeAgent.ts`, **or**
- In a small shared module such as `src/config/timeLabels.ts`

Example:

```ts
import type { TimezoneId } from "@/tools/timeTools";

export const TIMEZONE_LABELS: Record<TimezoneId, string> = {
  "Asia/Tokyo": "Tokyo",
  "America/New_York": "New York",
  "Europe/London": "London",
  UTC: "Coordinated Universal Time (UTC)",
};
