# Spec: Time Workflow (Foundational Orchestrator)

## Goal

Demonstrate the internal orchestration pattern using timezones (no external APIs).

## Scope

### Tools (`src/tools/timeTools.ts`)

- `TimezoneId` union: `"UTC" | "Asia/Tokyo" | "America/New_York" | "Europe/London"`.
- `ZonedTime` type with `timezone`, `iso`, `label`.
- `getCurrentTimeInZone(timezone: TimezoneId): ZonedTime`.
- `convertIsoToZone(iso: string, timezone: TimezoneId): ZonedTime`.

### Agents (`src/agents`)

- `TimeSourceAgent` – returns current time in a configured source timezone.
- `TimeConvertAgent` – converts a source ISO timestamp into multiple target timezones.

### Orchestrator (`src/orchestrators/timeWorkflow.ts`)

- `runTimeWorkflow(config)` calls `TimeSourceAgent` then `TimeConvertAgent` and returns `{ source, targets }`.

### API (`src/app/api/time-workflow/route.ts`)

- `GET /api/time-workflow` uses defaults: `source = Asia/Tokyo`; `targets = America/New_York, Europe/London, UTC`.
- `POST /api/time-workflow` accepts JSON `{ sourceTimezone?: TimezoneId, targetTimezones?: TimezoneId[] }`.

### Tests

- Unit tests for tools.
- Happy-path test for `runTimeWorkflow`.

## Acceptance Criteria

- Types are declared and reused (no duplicates).
- `runTimeWorkflow` returns the expected structure.
- API responds with `{ ok: true, data: { source, targets } }` on success.
- `npm test` passes.

