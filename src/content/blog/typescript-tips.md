---
title: TypeScript Patterns That Changed How I Code
description: After nine years of TypeScript, these are the patterns I reach for daily. Not academic type theory - practical techniques that make codebases better.
date: 2025-03-18
tags: [TypeScript, Engineering]
featured: false
---

I picked up TypeScript around 2016, back when a decent chunk of the community was convinced it was Java people trying to ruin JavaScript. Nine years later I have opinions about which parts actually hold up when you're maintaining something for years rather than demoing it at a meetup.

None of what follows is clever. Clever is how you get a type definition nobody can modify. These are the boring ones that survived.

## Discriminated unions for state

The pattern I use more than any other. The shape it replaces looks like this:

```typescript
interface State {
  isLoading: boolean;
  error: Error | null;
  data: User | null;
}
```

Perfectly normal React state, and nothing in it stops you from being in `isLoading: true` and `error: someError` simultaneously. We shipped exactly that bug at Scout24 - a spinner that never went away, because the error path set `error` and forgot to unset `isLoading`. It took an embarrassing amount of time to find, because the code that set the error and the code that rendered the spinner were nowhere near each other.

```typescript
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };
```

Now the broken state has nowhere to live. If `status` is `'loading'` there is no `error` field to forget about, because it doesn't exist on that branch.

We moved the Text-to-SQL dashboard onto this shape and a whole category of bug quietly stopped happening. Not fewer bugs of that type - none, as far as I can tell.

## `satisfies` for configuration

Before TypeScript 4.9 you had to pick: type a config object loosely and lose the literal types, or type it exactly and lose the validation.

```typescript
const endpoints = {
  users: '/api/users',
  posts: '/api/posts',
  comments: '/api/comments',
} satisfies Record<string, string>;
```

Now you get both. The object is checked against `Record<string, string>`, and `endpoints.users` is still `'/api/users'` rather than widening to `string`. Autocomplete knows the actual keys.

I use it for routing configs, feature flags, and environment variable schemas. It's a small thing that removed a recurring annoyance, which describes most good language features.

## Branded types stop you mixing IDs

At TourRadar a function that expected a `userId` got handed a `teamId` somewhere up the call chain. Both were strings. TypeScript was delighted. The database returned nothing - no error, just an empty result set - and a customer couldn't see their bookings for an afternoon while we worked out which of the seventeen string parameters was the wrong one.

```typescript
type UserId = string & { readonly __brand: 'UserId' };
type TeamId = string & { readonly __brand: 'TeamId' };

function getUser(userId: UserId) { ... }
function getTeam(teamId: TeamId) { ... }

getUser(teamId); // Type error at compile time
```

The `__brand` property never exists at runtime. It's there purely so the compiler treats the two as incompatible.

The failure mode is real though: if you end up writing `as UserId` all over the codebase you've built ceremony, not safety. Brand at the boundaries - API response parsers, database query results - and let the types flow from there. If you're casting in application code, the boundary is in the wrong place.

## Exhaustive switches

Make the compiler tell you when you've added a case and forgotten to handle it:

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
    default: {
      const _exhaustive: never = state;
      throw new Error(`Unhandled state: ${JSON.stringify(_exhaustive)}`);
    }
  }
}
```

Two details that matter. The braces around the `default` body are load-bearing - without them, declaring a `const` inside a case is an ESLint `no-case-declarations` error. And throwing rather than returning is deliberate: if you've genuinely reached this branch at runtime, something upstream lied about its types and you want to know loudly.

Add a `'retrying'` status later and TypeScript errors on that `never` assignment until every switch is updated. At ImmoScout24 we had a booking state machine with a handful of states, and when product added another one the compiler pointed at every place that needed attention. The refactor was an afternoon of following errors rather than a week of finding out in production.

## Template literal types

```typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiPath = `/api/${string}`;

type Endpoint = `${HttpMethod} ${ApiPath}`;

const endpoints: Endpoint[] = [
  'GET /api/users',
  'POST /api/posts',
  'get /api/users',      // Error: lowercase
  'GET /users',          // Error: missing /api prefix
];
```

We introduced this at Scout24 after noticing the API docs had drifted - some methods lowercase, some paths missing the prefix, all of it technically working and none of it consistent. The type caught the stragglers in a single PR.

This is one where I'd caution against enthusiasm. Template literal types are fun and it is very easy to end up expressing your entire URL scheme in the type system, at which point you've written a parser that only runs in your editor and only produces error messages nobody can read. Use it for the shape, not the semantics.

## Let inference do its job

I review a lot of PRs that look like this:

```typescript
const users: User[] = data.map((item: DataItem): User => ({
  id: item.id as UserId,
  name: item.name as string,
}));
```

Every annotation here restates something TypeScript already knew, and the `as` casts are actively suppressing the errors that would have told you something was wrong.

```typescript
const users = data.map((item) => ({
  id: item.id,
  name: item.name,
}));
```

Explicit types belong at function boundaries and module exports - the surface other code depends on. Inside a function, annotations are mostly noise, and worse, they're noise that drifts out of sync with the code beneath them.

## `const` assertions

```typescript
const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
  ERROR: 500,
} as const;
```

Without `as const` you get `{ OK: number; NOT_FOUND: number; ERROR: number }`, which is almost useless. With it, the literal values survive and the properties are readonly, so you can use them in type positions and nobody can reassign them.

## Utility types I actually use

```typescript
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type ElementOf<T> = T extends (infer E)[] ? E : never;
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

`WithRequired` is for after you've validated that an optional field is present. `ElementOf` pulls the type out of an array. `DeepPartial` is genuinely useful for patch objects and genuinely dangerous in a public API type, because it hides which fields the caller is actually required to send. I keep it internal.

## The pattern I avoid

Someone I worked with once wrote a 150-line type that computed the shape of a deeply nested API response by walking a schema definition at the type level. It was legitimately impressive work and I remember being a little jealous of it.

It also took a few seconds to evaluate on every keystroke, broke on every TypeScript upgrade, and produced errors that filled the terminal and identified nothing. When the schema changed, nobody could modify it. Including, eventually, the person who wrote it.

We deleted it and replaced it with a runtime parser using Zod. Forty-ish lines. Worked immediately. Slightly sad, in the way that deleting good work always is.

If a type needs a specialist to read, it's the wrong type. Simple types that model the domain beat clever types that model the type system, and the gap widens every year you have to maintain them.

None of this is revolutionary. Collectively it's made refactors boring, which is the highest compliment I have for a type system.
