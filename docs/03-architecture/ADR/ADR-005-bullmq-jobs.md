# ADR-005: BullMQ for Background Jobs

**Status:** Accepted  
**Date:** 2026-01-01  
**Deciders:** Engineering Team

## Context

AI generation, email sending, and analytics require async processing with retries and monitoring. The team already uses Redis for caching.

## Decision

Use **BullMQ** (Redis-backed) for all background job processing.

## Consequences

**Positive:** Reuses existing Redis; reliable retries; dead-letter queues; good Node.js integration.

**Negative:** Redis becomes a critical dependency for async work; job state lost if Redis fails without AOF (mitigated by AOF persistence).
