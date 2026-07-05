# ADR-004: PostgreSQL as Primary Database

**Status:** Accepted  
**Date:** 2026-01-01  
**Deciders:** Engineering Team

## Context

MathBattle has highly relational data (users, schools, classes, learning paths, questions, matches) requiring ACID transactions and complex joins.

## Decision

Use **PostgreSQL 15+** as the primary data store with read replica for analytics queries.

## Consequences

**Positive:** Strong consistency; mature ecosystem; JSONB for flexible fields; full-text search.

**Negative:** Horizontal write scaling limited (mitigated by read replicas and caching); schema migrations require discipline.
