# Caching Strategy — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Purpose

Defines what is cached, where, TTLs, invalidation rules, and cache-aside patterns for MathBattle Phase 1.

**Technology:** Redis 7 (single cluster; read replicas in production)

---

## Cache Categories

| Category | Key Pattern | TTL | Purpose |
|---|---|---|---|
| Session / Rate Limit | `rl:{ip}:{endpoint}` | 15 min | Login rate limiting |
| User Profile | `user:{userId}:profile` | 5 min | Dashboard header data |
| Learning Path | `path:{pathId}:tree` | 30 min | Unit/lesson tree |
| Question (published) | `q:{questionId}` | 1 hour | Match and lesson delivery |
| Leaderboard | `lb:{schoolId}:{grade}` | 2 min | Top 100 students |
| School Config | `school:{schoolId}:settings` | 15 min | School settings JSON |
| Match State | `match:{matchId}:state` | Match duration + 5 min | Active match in WS server |
| Feature Flags | `flags:global` | 5 min | Runtime toggles |

---

## Cache-Aside Pattern

```
1. Read from cache
2. Cache hit → return
3. Cache miss → read DB → write cache → return
4. Write operation → update DB → invalidate cache key(s)
```

---

## Invalidation Rules

| Event | Keys Invalidated |
|---|---|
| User profile update | `user:{userId}:profile` |
| Question published/archived | `q:{questionId}`, search index |
| Learning path modified | `path:{pathId}:tree` |
| XP awarded | `user:{userId}:profile`, `lb:{schoolId}:{grade}` |
| School settings change | `school:{schoolId}:settings` |
| Match completed | `match:{matchId}:state`, leaderboard keys for both players |

Use explicit invalidation, not TTL-only, for write-heavy entities.

---

## What NOT to Cache

- Authentication tokens (stateless JWT)
- Audit logs (write-only, query from DB)
- Unpublished / draft questions
- Parental consent tokens
- Password hashes

---

## Match State (WebSocket)

Active match state lives in Redis for reconnect recovery:

```json
{
  "matchId": "uuid",
  "currentCard": 3,
  "player1Score": 5,
  "player2Score": 3,
  "player1Connected": true,
  "player2Connected": false,
  "startedAt": "ISO8601"
}
```

- TTL: match max duration (10 cards × 30s + buffer) + 5 minutes
- On reconnect: WS server reads state, resumes current card timer
- On completion: persist to PostgreSQL, delete Redis key

---

## Leaderboard Strategy

Phase 1: Redis sorted set (`ZADD lb:{schoolId}:{grade} {xp} {userId}`)

- Top 100 cached as JSON blob with 2-minute TTL
- Full rebuild on cache miss from `student_profiles` ordered by `total_xp`
- Phase 2: consider materialized view for school-wide analytics

---

## Production Configuration

| Setting | Value |
|---|---|
| Max memory policy | `allkeys-lru` |
| Persistence | AOF enabled (match state durability) |
| Connection pooling | 10 connections per API instance |
| TLS | Enabled in staging/production |

---

## Monitoring

- Cache hit ratio target: ≥ 85% for profile and path keys
- Alert if Redis memory > 80% or connection errors > 0.1%

---

*See `System-Architecture.md` for Redis placement and `Indexing-Strategy.md` for DB fallback query performance.*
