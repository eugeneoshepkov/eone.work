---
title: TypeScript Patterns That Changed How I Code
description: After 8 years of TypeScript, these are the patterns I reach for daily. Not academic type theory — practical techniques that make codebases better.
date: 2025-03-18
tags: [TypeScript, Engineering]
featured: false
---

I've been writing TypeScript since it was weird and niche. Now it's everywhere, and I've developed strong opinions about what actually holds up in production.

These aren't TypeScript tips you'll find in documentation. They're patterns that made refactors boring and reduced entire classes of bugs.

## Discriminated unions for state management

This is my most-used pattern. Instead of:

```typescript
interface State {
  isLoading: boolean;
  error: Error | null;
  data: User | null;
}
```

Do this:

```typescript
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };
```

Now impossible states are unrepresentable. You can't have `isLoading: true` and `error: SomeError` at the same time.

This pattern eliminated an entire category of bugs from our codebase.

## `satisfies` for type-safe configuration

The `satisfies` keyword was a game-changer for config objects:

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

I use this for routing configs, feature flags, environment variables.

## Branded types prevent mixing IDs

In any non-trivial system, you have multiple string IDs:

```typescript
function getUser(userId: string) { ... }
function getPost(postId: string) { ... }

// This compiles but is wrong:
getUser(postId);
```

Fix with branded types:

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type PostId = string & { readonly __brand: 'PostId' };

function getUser(userId: UserId) { ... }
function getPost(postId: PostId) { ... }

// Now this fails at compile time:
getUser(postId); // ❌ Type error
```

We introduced this after a production bug where someone passed a team ID to a user lookup. Never again.

*When it bites:* if you sprinkle `as UserId` everywhere, you lost. Brand at boundaries (parsers, DB mappers) and keep the rest clean.

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
      // This line ensures we handle all cases
      const _exhaustive: never = state;
      return _exhaustive;
  }
}
```

If you add a new state later, TypeScript will error until you handle it. Saved us from countless bugs when evolving state machines.

## Template literal types for API consistency

Building REST endpoints? Enforce consistency:

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiPath = `/api/${string}`;

type Endpoint = `${HttpMethod} ${ApiPath}`;

const endpoints: Endpoint[] = [
  'GET /api/users',      // ✅
  'POST /api/posts',     // ✅
  'get /api/users',      // ❌ lowercase
  'GET /users',          // ❌ missing /api prefix
];
```

This caught several inconsistencies in our API documentation.

## Type inference over explicit types

Stop over-annotating. Let TypeScript work:

```typescript
// Over-annotated ❌
const users: User[] = data.map((item: DataItem): User => ({
  id: item.id as UserId,
  name: item.name as string,
}));

// Let TypeScript infer ✅
const users = data.map((item) => ({
  id: item.id,
  name: item.name,
}));
```

Explicit types should appear at function boundaries and exports. Internal code should let inference do its job.

## `const` assertions for readonly data

When you have data that shouldn't change:

```typescript
const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  ERROR: 500,
} as const;

// Type is readonly with literal values:
// { readonly OK: 200; readonly NOT_FOUND: 404; readonly ERROR: 500 }
```

Without `as const`, the type would be `{ OK: number; NOT_FOUND: number; ERROR: number }`. Less useful.

## Utility types I actually use

```typescript
// Make selected properties required
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Make selected properties optional
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Extract array element type
type ElementOf<T> = T extends (infer E)[] ? E : never;

// Deep partial (recursive)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

These come up constantly in real codebases.

*When it bites:* `DeepPartial` is convenient, but it can hide required fields. I keep it for internal patch objects, not as a public API type.

## The pattern I avoid: type gymnastics

Just because you can express something in TypeScript's type system doesn't mean you should. I've seen codebases with 200-line type definitions that:

- Nobody understands
- Break with TypeScript upgrades
- Slow down the compiler
- Don't catch real bugs

If your type requires a PhD to read, it's probably wrong. Simple types that model the domain beat clever types that model the type system.

---

These patterns emerged from years of production code. None are revolutionary, but together they've made our codebase more reliable and our team more productive.

What patterns do you reach for?
