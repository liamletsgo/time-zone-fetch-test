# Dev Contract – Internal Orchestration & Agentic Workflows

## Purpose

This project is a playground for building internal orchestration patterns that will scale to more complex AI Agents (SEO, Content, etc.).

Our core pattern is: **tools → agents → orchestrators → API / jobs**.

## Stack & Conventions

- **Runtime:** Next.js (App Router) on Node.js
- **Language:** TypeScript
- **Testing:** Vitest

### Code Layout

- `src/tools` – pure utility functions, minimal side effects
- `src/agents` – small, single-responsibility wrappers around tools
- `src/orchestrators` – multi-step workflows that call agents/tools
- `src/app/api` – API routes which call orchestrators

### Docs

- `docs/` – architecture, dev contract, agent roles, best practices
- `specs/` – per-feature specs
- `logs/` – human + AI change logs and notes

## Rules for AI Coders (humans & agents)

1. Always read this Dev Contract and the relevant spec in `/specs` before making non-trivial changes.

2. Keep logic layered: **tools → agents → orchestrators → API**.

3. For any new behavior, update or add tests under `src/**/*.test.ts`.

4. Always keep `npm test` green.

5. Use the `@/` alias for imports from `src` (e.g., `@/tools/timeTools`).

6. Do not add new npm dependencies without:
   - a short note in `docs/DEPENDENCIES.md` (if created later), and
   - a clear reason in the PR / commit message.

7. If you're unsure about requirements, prefer leaving a TODO comment or writing a question in `logs/AGENT-CHANGELOG.md` instead of making big hidden assumptions.

## High-level Patterns

- **Tool:** stateless, testable utility (e.g., `getCurrentTimeInZone`).
- **Agent:** configured wrapper around tools (e.g., `TimeSourceAgent`).
- **Orchestrator:** coordinates agents to achieve a goal (e.g., `runTimeWorkflow`).
- **API Route:** thin layer that validates input, calls orchestrator, and returns JSON.

# Dev Contract – Agentic Internal Orchestration

## Project Goal

Build an internal-orchestrated backend for AI agents, using a clear pattern:

> tools → agents → orchestrators → API / jobs

This repo is a playground that will scale from a simple time workflow to SEO and content agents.

## Stack & Conventions

- Runtime: Next.js (App Router) on Node.js
- Language: TypeScript
- Testing: Vitest
- Backend structure:
  - `src/tools` – pure functions, no side effects when possible
  - `src/agents` – small wrappers around tools with clear responsibilities
  - `src/orchestrators` – workflow coordinators (call agents in sequence, shape results)
  - `src/app/api` – API routes that call orchestrators
- Docs:
  - `docs/` – architecture, dev contract, agent stack
  - `specs/` – per-feature specs

## Rules for AI Coders

1. Always read this file and the relevant spec under `/specs` before making non-trivial changes.
2. Prefer adding logic to:
   - `src/tools` for pure utilities
   - `src/agents` for single-responsibility agents
   - `src/orchestrators` for multi-step workflows
3. For any new feature:
   - Ensure there is a spec in `/specs` following the spec template.
4. Always update or add tests under `src/**/*.test.ts` when modifying behavior.
5. Always keep `npm test` green.
6. Do not add new NPM dependencies without:
   - Updating `docs/DEPENDENCIES.md` (once created)
   - Using them in a minimal and focused way
7. Keep imports consistent:
   - Use `@/` alias for modules in `src` (e.g. `@/tools/timeTools`).
8. Favor small, composable functions and classes over large, monolithic ones.

## Patterns

- **Tool**: stateless utility (e.g. `getCurrentTimeInZone`).
- **Agent**: a thin, configured wrapper around one or more tools (e.g. `TimeSourceAgent`).
- **Orchestrator**: coordinates agents to fulfill a higher-level goal (e.g. `runTimeWorkflow`).
- **API Route**: validates input, calls the orchestrator, and returns JSON.

## Testing

- Use Vitest for unit/integration tests.
- Focus on:
  - Tool correctness
  - Orchestrator outputs for given configs
- Use deterministic checks where possible, but it's okay to allow "current time" style tests that only check shape and consistency.

## Developer Utilities

- `npm run time:human-all`  
  - Purpose: Demo and diagnostic script for the time-based agentic workflow.  
  - Behavior: Calls `runAllHumanTimesWorkflow()` and prints:
    - Human-friendly sentences for all supported timezones.
    - The raw JSON payload for debugging.
  - Used by:
    - Humans (for quick sanity checks).
    - The Coder/Assistant Agent (via `.cursorrules`) when the user asks,
      “What time is it in Tokyo/London/New York?” so that responses are based
      on the actual runtime tools, not guesses.
