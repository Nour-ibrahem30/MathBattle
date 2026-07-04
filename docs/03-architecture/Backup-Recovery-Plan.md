# Backup and Recovery Plan — MathQuest

**Version:** 1.0.0

---

## Goals

- Ensure no student learning data is permanently lost due to infrastructure failure.
- Meet RPO ≤ 1 hour and RTO ≤ 4 hours for all critical data.
- Provide a tested, documented recovery procedure for all failure scenarios.

---

## RPO and RTO Targets

| Data Type | RPO | RTO |
|---|---|---|
| PostgreSQL (all data) | ≤ 1 hour | ≤ 4 hours |
| Redis (cache/sessions) | Acceptable loss (cache is rebuildable) | ≤ 30 minutes |
| Cloud Storage (documents, exports) | ≤ 24 hours | ≤ 2 hours |
| Application configuration | ≤ 0 (version controlled) | ≤ 30 minutes |

---

## Data Classification

| Classification | Examples | Backup Priority |
|---|---|---|
| Critical | Student learning records, match results, user accounts, audit logs | Highest |
| High | Question bank, assignments, gamification data | High |
| Medium | Notifications, AI recommendations | Medium |
| Low | Cache data, session tokens | Low (rebuildable) |

---

## Database Backup Plan

### PostgreSQL

| Backup Type | Frequency | Retention | Storage |
|---|---|---|---|
| Full backup | Daily (02:00 UTC) | 30 days | Cloud Storage (separate region) |
| WAL archiving (incremental) | Continuous (every 5 minutes) | 7 days | Cloud Storage |
| Point-in-time recovery | Enabled | 7 days | Cloud Storage |

**Backup Process:**
1. pg_basebackup or cloud-managed backup (AWS RDS automated backups)
2. WAL files streamed to S3/GCS continuously
3. Backup encrypted with AES-256 before storage
4. Backup integrity verified daily (automated restore test to isolated environment)

**Restore Procedure:**
1. Provision new PostgreSQL instance
2. Restore from latest full backup
3. Apply WAL files to reach desired point in time
4. Verify data integrity (row counts, key record checks)
5. Update application connection string
6. Run smoke tests

---

## Redis Backup Plan

| Backup Type | Frequency | Retention |
|---|---|---|
| RDB snapshot | Every 15 minutes | 24 hours |
| AOF (Append-Only File) | Enabled (everysec) | 24 hours |

**Recovery:** Redis data is largely rebuildable from PostgreSQL. On Redis failure:
1. Start new Redis instance
2. Restore from latest RDB snapshot if available
3. Application will rebuild cache on demand
4. Rate limiting temporarily disabled during recovery

---

## Cloud Storage Backup Plan

- Versioning enabled on all buckets
- Cross-region replication enabled for critical buckets (document imports, exports)
- Retention: 30 days for all versions

---

## Backup Schedule Summary

| Time (UTC) | Job |
|---|---|
| 02:00 daily | PostgreSQL full backup |
| Continuous | PostgreSQL WAL archiving |
| Every 15 min | Redis RDB snapshot |
| Weekly | Backup integrity verification (automated restore test) |
| Monthly | Full disaster recovery drill |

---

## Disaster Recovery Scenarios

### Scenario 1: Single API Instance Failure
- **Detection:** Load balancer health check fails
- **Recovery:** Load balancer routes to healthy instances; auto-scaling replaces failed instance
- **RTO:** < 2 minutes (automatic)

### Scenario 2: Database Primary Failure
- **Detection:** Database health check fails; replication lag alert
- **Recovery:** Automatic failover to read replica (AWS RDS Multi-AZ); application reconnects
- **RTO:** < 5 minutes (automatic failover)
- **Manual steps:** Verify failover complete; update connection string if needed; monitor for data consistency

### Scenario 3: Full Region Failure
- **Detection:** All health checks fail; external uptime monitor alerts
- **Recovery:**
  1. Activate DR region (pre-configured standby)
  2. Restore PostgreSQL from cross-region backup
  3. Update DNS to point to DR region
  4. Verify application functionality
- **RTO:** ≤ 4 hours

### Scenario 4: Data Corruption
- **Detection:** Data integrity checks fail; user reports
- **Recovery:**
  1. Identify corruption scope and timestamp
  2. Restore to point-in-time before corruption
  3. Replay transactions from audit log if possible
  4. Notify affected users
- **RTO:** ≤ 4 hours

### Scenario 5: Accidental Data Deletion
- **Detection:** User report or monitoring alert
- **Recovery:**
  1. Identify deleted records and timestamp
  2. Restore from backup to isolated environment
  3. Extract deleted records
  4. Re-insert into production with audit log entry
- **RTO:** ≤ 2 hours

---

## Restore Testing

| Test | Frequency | Owner |
|---|---|---|
| Automated backup integrity check | Daily | DevOps (automated) |
| Manual restore to isolated environment | Weekly | DevOps |
| Full DR drill (region failover simulation) | Quarterly | Engineering Lead + DevOps |
| Point-in-time recovery test | Monthly | DevOps |

---

## Backup Security

- All backups encrypted with AES-256 before storage
- Backup storage access restricted to DevOps role only
- Backup encryption keys stored in secrets manager (separate from application keys)
- Backup access logged in audit trail
- No backup files accessible from application servers

---

*See `Incident-Response-Playbook.md` for incident procedures and `Deployment-Operations.md` for infrastructure topology.*
