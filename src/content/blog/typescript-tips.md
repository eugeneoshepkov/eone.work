---
title: TypeScript Patterns That Changed How I Code
description: After 8 years of TypeScript, these are the patterns I reach for daily. Not academic type theory — practical techniques that make codebases better.
date: 2025-03-18
tags: [TypeScript, Engineering]
featured: false
---

I started writing TypeScript around 2016, when half the community thought it was Java fans trying to ruin JavaScript. Now it's everywhere, and I've developed strong opinions about what actually holds up when you're maintaining a codebase for years, not writing a conference demo.

These patterns came from real bugs, real refactors, and real 2am debugging sessions. They're boring. They work.

## Discriminated unions for state management

This is my most-used pattern. At Scout24, we had a component that looked like this:

```typescript
interface State {
  isLoading: boolean;
  error: Error | null;
  data: User | null;
}
```

Classic React state shape. The problem: nothing stopped you from having `isLoading: true` and `error: someError` at the same time. We had exactly that bug — a loading spinner that never went away because an error set `error` but forgot to set `isLoading: false`.

Better:

```typescript
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };
```

Now impossible states are unrepresentable. If `status` is `'loading'`, there's no `error` field to forget about. TypeScript won't let you.

We migrated to this pattern across the Text-to-SQL dashboard, and an entire category of bugs just stopped happening.

## `satisfies` for type-safe configuration

The `satisfies` keyword (TypeScript 4.9+) was a game-changer for config objects:

```typescript
const endpoints = {
  users: '/api/users',
  posts: '/api/posts',
  comments: '/api/comments',
} satisfies Record<string, string>;
```

You get:
- Type checking (must be `Record<string, string>`)
- Literal type preservation (`endpoints.users` is `'/api/users'`, not `string`)
- Autocomplete for the specific keys

Before `satisfies`, you had to choose: either type the object loosely and lose literals, or type it exactly and lose validation. Now you get both.

I use this for routing configs, feature flags, environment variable schemas.

## Branded types prevent mixing IDs

At TourRadar, we had a bug that took hours to track down. A function expected a `userId` but somewhere in the call chain, someone passed a `teamId`. Both were strings. TypeScript was happy. The database was not.

The query returned nothing. No error, just empty results. A customer couldn't see their bookings for an entire afternoon before we figured it out.

The pattern that prevents this:

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type TeamId = string & { readonly __brand: 'TeamId' };

function getUser(userId: UserId) { ... }
function getTeam(teamId: TeamId) { ... }

getUser(teamId); // ❌ Type error at compile time
```

The `__brand` property doesn't exist at runtime — it's a phantom type. But TypeScript treats `UserId` and `TeamId` as incompatible, so you can't mix them.

The catch: if you sprinkle `as UserId` everywhere, you lost. Brand at boundaries (API response parsers, DB query results) and keep the rest of your code clean. The types should flow through naturally.

## Exhaustive switch statements

When switching on a discriminated union, make TypeScript enforce exhaustiveness:

```typescript
function handleState(state: State): string {
  switch (state.status) {
    case 'idle':
      return 'Ready';
    case 'loading':
      return 'Loading...';
    case 'success':
      return `Got ${state.data.name}`;
    case 'error':
      return `Error: ${state.error.message}`;
    default:
      const _exhaustive: never = state;
      return _exhaustive;
  }
}
```

If you add a new status later — say, `'retrying'` — TypeScript will error on that `never` assignment until you handle it.

At ImmoScout24, we used this for a booking state machine with 8 states. When product added a 9th state, TypeScript flagged every switch statement that needed updating. Refactor took an hour instead of a week of finding bugs in production.

## Template literal types for API consistency

Building REST endpoints? Enforce consistency at the type level:

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiPath = `/api/${string}`;

type Endpoint = `${HttpMethod} ${ApiPath}`;

const endpoints: Endpoint[] = [
  'GET /api/users',
  'POST /api/posts',
  'get /api/users',      // ❌ Type error: lowercase
  'GET /users',          // ❌ Type error: missing /api prefix
];
```

We introduced this at Scout24 after finding inconsistencies in API documentation — some endpoints were lowercase, some had different prefixes. The template literal type caught about a dozen inconsistencies in one PR.

## Type inference over explicit types

Stop over-annotating. I've reviewed PRs where every variable has an explicit type, including things TypeScript already knows:

```typescript
const users: User[] = data.map((item: DataItem): User => ({
  id: item.id as UserId,
  name: item.name as string,
}));
```

All that noise, and you're just restating what TypeScript already inferred. Worse, those `as` casts actively suppress errors.

Let TypeScript work:

```typescript
const users = data.map((item) => ({
  id: item.id,
  name: item.name,
}));
```

Explicit types belong at function boundaries and exports — the public API of your module. Internal code should let inference do its job.

It's like mixing a song. You don't need to manually set the volume on every track if your gain staging is right. You set levels at the key points and let the rest flow through.

## `const` assertions for readonly data

When you have data that shouldn't change:

```typescript
const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  ERROR: 500,
} as const;
```

Without `as const`, the type would be `{ OK: number; NOT_FOUND: number; ERROR: number }`. With it, you get `{ readonly OK: 200; readonly NOT_FOUND: 404; readonly ERROR: 500 }` — literal values, readonly properties.

This matters when you want to use those values in type positions or ensure nobody accidentally mutates your constants.

## Utility types I actually use

```typescript
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ElementOf<T> = T extends (infer E)[] ? E : never;
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

These come up constantly. `WithRequired` is great for when you've validated that an optional field exists. `ElementOf` extracts the type from an array. `DeepPartial` is useful for patch/update operations.

Fair warning: `DeepPartial` is convenient but can hide required fields. I use it for internal patch objects, never in a public API type where the caller needs to know what's required.

## The pattern I avoid: type gymnastics

Just because you can express something in TypeScript's type system doesn't mean you should.

At one company, someone wrote a 150-line type definition that computed the full type of a deeply nested API response by walking a schema at the type level. It was genuinely impressive. It also:

- Took 3 seconds to compute on every keystroke
- Broke every TypeScript upgrade
- Produced error messages that filled the terminal
- Nobody could modify it when the schema changed

We eventually deleted it and wrote a simple runtime parser with Zod. Took 40 lines. Worked immediately.

If your type requires a PhD to read, it's wrong. Simple types that model the domain beat clever types that model the type system.

---

These patterns emerged from years of production code at TourRadar, ImmoScout24, and other companies. None are revolutionary. Together they've made refactors boring and bugs rarer. That's the goal.
