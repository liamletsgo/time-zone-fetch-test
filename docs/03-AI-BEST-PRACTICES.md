# AI Best Practices

## Goals

Keep AI contributions transparent, testable, and reversible.

Avoid "silent" large-scale refactors or magic behavior.

## Best Practices

1. **Always start by reading:** `docs/01-DEV-CONTRACT.md` and relevant `/specs/*.md`.

2. **Prefer small, incremental changes** over giant refactors.

3. **For non-trivial edits, write a short plan in the chat** before touching code.

4. **For every bugfix or new feature, add/extend tests.**

5. **For destructive or risky changes, add a note in `logs/AGENT-CHANGELOG.md`** and highlight it for human review.

6. **When invoking LLMs with tools, keep prompts explicit about:**
   - inputs & outputs
   - which layers to modify (tools vs agents vs orchestrators vs API)
   - the need to run tests afterwards.

7. **When a feature requires external services (APIs, accounts, API keys):**
  - Do NOT hardcode secrets.
  - Add or update `.env.example` with the required variables.
  - Add a short “Setup Steps” section in `README.md` or the relevant spec.
  - In the chat, tell the user exactly what manual steps are required (e.g. create account, generate API key, set env vars).


