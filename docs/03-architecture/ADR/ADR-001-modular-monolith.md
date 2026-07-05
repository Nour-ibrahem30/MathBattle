# ADR-001: Modular Monolith for Phase 1

**Status:** Accepted  
**Date:** 2026-01-01  
**Deciders:** Engineering Team

## Context

MathBattle needs to ship an MVP quickly with a small team. Microservices add operational complexity (service discovery, distributed tracing, deployment coordination) that is not justified at this stage.

## Decision

Use a **modular monolith** architecture for Phase 1. Modules (auth, learning, questions, matches, gamification, etc.) have clear boundaries within a single deployable API. Extract to microservices in Phase 3+ when team size and traffic justify it.

## Consequences

**Positive:**
- Single deployment unit reduces DevOps overhead
- Shared database transactions simplify consistency
- Faster development velocity for small team

**Negative:**
- All modules scale together (mitigated by separate WebSocket server)
- Must enforce module boundaries via code review
- Future extraction requires planned refactoring
