# ADR-002: JWT with Refresh Token Rotation

**Status:** Accepted  
**Date:** 2026-01-01  
**Deciders:** Engineering Team

## Context

The API must scale horizontally without server-side session storage. We need secure, stateless authentication with the ability to revoke sessions.

## Decision

Use RS256-signed JWT access tokens (15-minute TTL) with refresh token rotation stored as hashes in PostgreSQL.

## Consequences

**Positive:** Stateless API scaling; short-lived tokens limit exposure; rotation detects token theft.

**Negative:** Refresh token storage adds DB writes; clients must implement refresh logic.
