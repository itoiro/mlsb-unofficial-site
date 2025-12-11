# Repository Guidelines

## Project Structure & Module Organization
mlsb-fan-web relies on the devcontainer defined in `.devcontainer/` and the `docker-compose.yml` service to provide a consistent Node toolchain. Place all app code under `src/`, grouping features in `src/features/<feature>` with colocated hooks, styles, and tests. Shared UI primitives should live in `src/components/`, long-lived utilities in `src/lib/`, and API façades or mock clients in `src/services/`. Static assets belong in `public/`, and test fixtures in `tests/fixtures`. Keep environment-specific secrets in `.env.local` files that are already gitignored.

## Build, Test, and Development Commands
Use `docker compose up dev --build` from the repo root to launch the VS Code-ready container that already installs Codex, Serena MCP, and supporting CLI tools. Inside the container run `npm install` after cloning to hydrate dependencies. `npm run dev` starts the Vite dev server on port 3000, `npm run build` emits production bundles, and `npm run preview` (port 4173) validates the optimized build. Prefer running every script inside the container so everyone shares Node, npm, and system package versions.

## Coding Style & Naming Conventions
ESLint and Prettier (see `.devcontainer/devcontainer.json`) enforce formatting—2-space indentation, single quotes, semicolons, and trailing commas. Use camelCase for variables/functions, PascalCase for React components and TypeScript types, and SCREAMING_SNAKE_CASE only for constants exported from `config/`. File names should mirror the main export (e.g., `UserCard.tsx`) and stay under 200 lines by extracting helpers.

## Testing Guidelines
Vitest drives unit tests through `npm run test`; place cases next to source using the `*.test.ts[x]` pattern. Use Testing Library for component assertions, MSW for network mocks, and snapshot tests only for stable presentational components. Run `npm run test -- --coverage` locally before opening a PR and avoid skipping tests—mark new work with a regression test when fixing bugs.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: add ticket summary`, `fix: correct locale fallback`). Keep PRs scoped to a single feature or fix, include a short description, reproduction steps (for bug fixes), and screenshots for UI changes. Reference relevant issues (e.g., `Closes #42`), ensure the branch is rebased on `main`, and confirm tests/build succeed inside the container before requesting review.
