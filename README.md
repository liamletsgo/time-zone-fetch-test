This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Internal Orchestration v1.0 – Time Demo

This project includes a small **time-based demo** that we use as a sandbox for:

- Practicing **internal orchestration** patterns  
- Teaching AI dev tools (like Cursor) how to:
  - Read specs and dev contracts
  - Generate tools → agents → orchestrators → API → UI → CLI
  - Write and run tests (`npm test`)
  - Log changes in `logs/AGENT-CHANGELOG.md`
- Prototyping **HAi (Human + AI)** workflows, where an AI Agent uses our own code as tools instead of guessing

If you’re trying to understand how the “AI Agent + Internal Orchestration” setup works here, **start with:**

> `docs/04-INTERNAL-ORCHESTRATION-TIME-DEMO.md`

That document explains:

- Why we chose the timezones example
- How the layers fit together:
  - `src/tools` → `src/agents` → `src/orchestrators` → `src/app/api` → `src/app/time-human`
  - CLI scripts in `src/scripts/`
- How Cursor is configured via `.cursorrules` to:
  - Run `npm run time:human-all`
  - Read the CLI output
  - Answer questions like “What time is it in Tokyo, London, and New York?” using real runtime data

### Quick Commands

From the project root:

```bash
# Run tests
npm test

# Run dev server on port 3001
npm run dev -- -p 3001

# Open the human-readable time demo UI
# (after dev server is running)
# http://localhost:3001/time-human

# Run CLI demo (used by Cursor as well)
npm run time:human-all

Use this time demo as a pattern reference when building more advanced agents later
(e.g., SEO health checks, content analyzers, or enterprise workflows).

::contentReference[oaicite:0]{index=0}