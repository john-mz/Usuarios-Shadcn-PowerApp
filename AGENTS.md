# Project Rules

## Architecture Default

- Every new feature must live in `components/<FeatureName>/`.
- `app/**/*.tsx` must stay thin. Pages should only compose feature entry components and route-level wrappers.
- Shared shadcn primitives stay in `components/ui/*`.
- Do not create new feature UIs in `features/*` by default.

## Feature Folder Contract

For a feature such as `Login`, use this structure by default:

```text
components/Login/
  index.tsx
  Login.tsx
  LoginForm.tsx
  hooks/
  services/
  types.ts
  utils.ts
```

- `index.tsx` is the public entry point for the feature.
- `Login.tsx` is the orchestration component for the feature.
- Child pieces such as forms, tables, dialogs, and cards must stay inside the same feature folder.
- Feature-specific hooks, types, schemas, mappers, and utilities must stay inside the same feature folder unless they are truly shared.

## Reusability Rules

- Prefer composition over large monolithic components.
- Extract repeated UI into local feature subcomponents before promoting it to `components/ui`.
- Promote code to `components/ui`, `hooks`, or `lib` only when it is reused by at least two features or is clearly cross-cutting.
- Keep business logic, validation, and transformation code out of `app/**/*`.
- Feature components must expose typed props so they can be reused by other pages or layouts.
- Imports should use the `@/` alias.

## Page Composition

Preferred:

```tsx
import { Login } from "@/components/Login"

export default function Page() {
  return <Login />
}
```

Avoid:

```tsx
export default function Page() {
  return (
    <main>
      {/* feature UI and logic here */}
    </main>
  )
}
```
