# AGENTS.md

A React 19 + Vite + Tailwind v4 prototype: a daily brief, a task list, and an assistant chat. All data is mock data. There is no backend.

## Verify

Run `npx tsc -b && npm run lint` before calling work done. `npm run typecheck` checks nothing: the root `tsconfig.json` has `files: []`, and only `tsc -b` follows the project references.

## UI components

- shadcn uses the `base-nova` style, so components are built on **Base UI**, not Radix. Compose with the `render` prop (`render={<a href="/" />}`). There is no `asChild`.
- Add components with `npx shadcn@latest add <name>`, then run lint. Generated files can break the repo's rules: `use-mobile.ts` was rewritten with `useSyncExternalStore` to satisfy `react-hooks/set-state-in-effect`.
- The Base UI `Checkbox` renders a hidden `<input>` that carries the `id`. In browser tests, click the task's label text instead.

## Data and state

- Mock data lives in `src/lib/tasks.ts` and `src/lib/briefs.ts`. A brief includes every task whose `briefId` matches its `id`.
- `App.tsx` owns all state: the task list and the current view. There is no router. Views switch through state, and a reload resets everything.
- Dates are UTC midnight. Format them with the helpers in `src/lib/format.ts`, which pin `timeZone: "UTC"`.
- The current user is Rudro (`CURRENT_USER` in `chat-widget.tsx`). The brief is written for him.
- Assignees match the domain of the work: Egor for engineering management, Rudro for frontend, Alex for infra/devops/platform, Luke for design.

## Design

Keep the UI plain. Use text, headings and thin row dividers rather than cards, stat boxes or bordered containers. Task rows follow the Linear style: priority bars, a round checkbox, a wrapping title, small pills for assignee and due date, then muted metadata.
