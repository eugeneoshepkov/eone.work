---
title: Legacy Migration at Scale
description: Zero-downtime migration of a high-traffic listing experience to TypeScript/React, with performance and testing modernization.
tags: [TypeScript, React, GraphQL, MongoDB]
featured: true
---

This migration had the worst combination of constraints: high traffic, SEO-sensitive pages, and a business that still needed feature work while we rewired the foundation.

I led the migration of ImmoScout24's Exposé (listing) project from a legacy stack to a modern TypeScript/React architecture.

## Problem

The existing codebase made day-to-day changes slow and risky. The product needed faster iteration without compromising reliability and SEO.

## Constraints

- Millions of daily users
- Zero downtime and safe rollback
- Keep shipping features throughout the migration
- Improve performance (Core Web Vitals) rather than regress it

## Key decisions

- Incremental migration with feature flags and parallel runs (no big-bang rewrite)
- Department-wide TypeScript standardization to reduce ambiguity and improve correctness
- Testing modernization (Enzyme → Testing Library) plus Cypress for E2E confidence
- Performance engineering as a first-class track (CWV instrumentation and optimization)
- GraphQL data fetching to reduce over/under-fetching and simplify UI contracts

## Outcomes

- Zero production incidents during migration rollouts
- Improved developer velocity with modern tooling and tests
- Higher code confidence through better test strategy and safer deployment patterns
- Better SEO outcomes via Core Web Vitals optimization

## Team impact

Acted as a technical mentor for junior engineers via pairing, code reviews, and knowledge-sharing sessions during the migration.
