# Environment Variables — MathBattle

**Version:** 1.0.0  
**Status:** Approved for Engineering

---

## Overview

All configuration is injected via environment variables. The canonical template is `.env.example` at the repository root. Never commit real secrets.

---

## Variable Reference

### Database and Caching

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string (Prisma format) |
| `REDIS_URL` | Yes | — | Redis URL for cache, rate limits, BullMQ |

### Server

| Variable | Required | Default | Description |
|---|---|---|---|
| `NODE_ENV` | Yes | `development` | `development`, `staging`, `production` |
| `PORT` | No | `3000` | REST API listen port |
| `WS_PORT` | No | `3001` | WebSocket server port |
| `CORS_ORIGIN` | Staging+ | — | Allowed frontend origin(s), comma-separated |
| `LOG_LEVEL` | No | `info` | `debug`, `info`, `warn`, `error` |

### Authentication (JWT)

| Variable | Required | Default | Description |
|---|---|---|---|
| `JWT_ACCESS_EXPIRY` | No | `15m` | Access token TTL |
| `JWT_REFRESH_EXPIRY` | No | `7d` | Refresh token TTL (DB stores 30-day max) |
| `JWT_PRIVATE_KEY` | Yes | — | Base64-encoded RS256 private key |
| `JWT_PUBLIC_KEY` | Yes | — | Base64-encoded RS256 public key |

Generate keys:
```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
base64 -w0 private.pem   # Linux
certutil -encode private.pem temp.b64 && type temp.b64  # Windows
```

### AI Engine

| Variable | Required | Default | Description |
|---|---|---|---|
| `AI_PROVIDER` | Yes | `mock` | `mock`, `openai`, `anthropic` |
| `AI_PROVIDER_API_KEY` | If not mock | — | Provider API key |
| `AI_MODEL_NAME` | No | `gpt-4-turbo` | Model identifier |
| `AI_MAX_TOKENS` | No | `4096` | Max tokens per request |
| `AI_REQUEST_TIMEOUT_MS` | No | `30000` | Provider call timeout |

### Email

| Variable | Required | Default | Description |
|---|---|---|---|
| `EMAIL_SERVICE_API_KEY` | Staging+ | — | SendGrid or Postmark API key |
| `EMAIL_FROM_ADDRESS` | Yes | — | Sender address (e.g., `noreply@mathbattle.io`) |
| `EMAIL_PROVIDER` | No | `sendgrid` | `sendgrid`, `postmark`, `mock` |

### Cloud Storage

| Variable | Required | Default | Description |
|---|---|---|---|
| `STORAGE_BUCKET_NAME` | Staging+ | — | S3/GCS bucket name |
| `STORAGE_REGION` | Staging+ | — | AWS region or GCS location |
| `STORAGE_ACCESS_KEY_ID` | Staging+ | — | Access key (use IAM roles in production) |
| `STORAGE_SECRET_ACCESS_KEY` | Staging+ | — | Secret key |
| `STORAGE_ENDPOINT` | No | — | Custom endpoint (MinIO local dev) |

### Feature Flags (Phase 1)

| Variable | Required | Default | Description |
|---|---|---|---|
| `FEATURE_AI_GENERATION` | No | `true` | Enable AI question generation |
| `FEATURE_MATCHES` | No | `true` | Enable 1v1 match mode |
| `FEATURE_PARENTAL_CONSENT` | No | `true` | COPPA consent flow |

---

## Environment-Specific Rules

| Environment | Secrets Source | AI Provider | Email |
|---|---|---|---|
| development | `.env` file | `mock` | `mock` (console log) |
| staging | AWS Secrets Manager | `openai` or `anthropic` | SendGrid/Postmark |
| production | AWS Secrets Manager | `openai` or `anthropic` | SendGrid/Postmark |

---

## Security Rules

1. Never log values of secret variables.
2. Rotate `JWT_PRIVATE_KEY` only with coordinated key rollover (support dual keys briefly).
3. Production must not use `AI_PROVIDER=mock`.
4. PII must not appear in any env var name or value used for logging.

---

## Validation on Startup

The API validates required variables at boot. Missing required vars cause immediate exit with a clear error message listing the missing keys.

---

*See `.env.example` for the copy-paste template.*
