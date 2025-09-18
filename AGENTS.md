# Repository Guidelines

## Project Overview

- We are building the website for Kowalah using Astro build
- You have access to Astro's MCP server "astro-docs" which includes all their documentation
- Kowalah is a ChatGPT roll-out and training services company supported by the Kowalah platform to serve an AI chat, accelerators and expert requests
- `docs` includes context of our messaging framework, positioning guide and product overview
- `docs/website-structure.md` includes high level navigation and pages required

## Development workflow

- `.codex/prompts/create-page-design.md` guides you through architecting a web page
- `.codex/prompts/create-astro-content.md` takes that page design and guides you through creating the actual content files

## Project Structure & Module Organization
- `src/pages/` owns public routes an/modeld loads Astro layouts that stitch shared UI pieces.
- `src/layouts/components|partials|shortcodes` host reusable blocks; keep new building blocks within these folders.
- `src/content/` stores Markdown/MDX collections validated by `src/content.config.ts`; each entry needs matching schema fields.
- `src/lib/`, `src/hooks/`, `src/styles/`, and `src/tailwind-plugin/` centralize helpers, React hooks, base styles, and Tailwind extensions.
- Static assets live in `public/`; long-form briefs live in `docs/` and `tasks/`; deployment configs stay under `config/nginx/`.

## Build, Test & Development Commands
- `yarn install` (preferred) or `npm install` to sync dependencies defined in `package.json`.
- `yarn dev` launches the Astro dev server (default http://localhost:4321) with hot reload.
- `yarn build` produces the static site in `dist/`; validate before pushing release changes.
- `yarn preview` serves the built output locally to mirror production routing and headers.
- `yarn check` runs Astro’s type/content validation; `yarn format` applies Prettier + Tailwind ordering.

## Coding Style & Naming Conventions
- Use TypeScript everywhere; keep two-space indentation and rely on the repo Prettier configuration.
- Name Astro/React components in PascalCase, routes and asset files in kebab-case, and data keys in camelCase.
- Favor Tailwind utility classes; only add custom CSS in `src/styles` when utilities cannot express the design.
- Co-locate content assets (images, MDX) with their collection entries and mirror the slug in filenames.
- Run `yarn format` before committing; ensure generated code respects `prettier-plugin-astro` and Tailwind sorting.

## Testing Guidelines
- Execute `yarn check` on every branch to catch schema mismatches, invalid frontmatter, and type drift.
- After `yarn build`, use `yarn preview` to smoke test navigation, dynamic components, and Sanity-backed sections.
- Validate interactive blocks for keyboard access, reduced motion, and light/dark parity before requesting review.
- Document any new manual test cases or acceptance notes in the PR description so reviewers can replay them.

## Commit & Pull Request Guidelines
- Follow the existing `Area: concise summary` commit pattern observed in the log; keep bullets for notable points.
- Keep commits scoped; avoid mixing content, styling, and config changes unless they depend on one another.
- PRs should include context, linked task or doc (e.g., items under `tasks/`), and before/after visuals for UI updates.
- Confirm CI or manual checks (`yarn check`, preview smoke tests) in the PR body and call out any follow-up work.
- Never commit `node_modules`, local `.env` files, or experimental assets; add ignores to `.gitignore` when needed.

## Content & CMS Notes
- Update `src/content` collections alongside Sanity schema changes; adjust `src/content.config.ts` when fields evolve.
- Keep marketing voice aligned with `docs/context/messaging-framework.md` and data sources documented in `docs/`.
- Record new imagery or illustrations in `docs/marketing-design-system.md` so future updates stay consistent.
- For Sanity previews, load the required API keys via `.env.example` conventions and avoid checking secrets into git.
