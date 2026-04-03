# Contributing

The site is a npm workspace monorepo: the Vite app is **`apps/web/`**. Install and run scripts from the **repository root** unless you are working only inside `apps/web/`.

- **Setup:** see the root [README.md](README.md) and [docs/engineering/DEVELOPER_GUIDE.md](docs/engineering/DEVELOPER_GUIDE.md).
- **Detailed app notes:** [apps/web/README.md](apps/web/README.md).
- **Agent/automation context:** [AGENTS.md](AGENTS.md).
- **Git hooks:** [Husky](https://typicode.github.io/husky/) runs **lint-staged** on pre-commit (ESLint + Prettier on staged files). Install hooks with `npm install` (the `prepare` script runs `husky`).
- **Before opening a PR:** from the repo root, run `npm run format:check`, `npm run lint`, `npm run typecheck`, and `npm run test:run` (use `npm run test:run` for a one-shot test run; `npm run test` starts Vitest in watch mode).
