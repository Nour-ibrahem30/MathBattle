# ADR-003: Separate WebSocket Match Server

**Status:** Accepted  
**Date:** 2026-01-01  
**Deciders:** Engineering Team

## Context

1v1 matches require persistent connections, low latency, and server-authoritative state. Running WebSocket alongside REST in the same process creates resource contention and complicates scaling.

## Decision

Deploy the WebSocket match server as a **separate Node.js process** using Socket.io, sharing PostgreSQL and Redis with the REST API.

## Consequences

**Positive:** Independent scaling; connection management isolated; match crashes don't take down API.

**Negative:** Two deployables to manage; shared state via Redis requires consistency care.
