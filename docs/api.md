# CreatorAI REST API Documentation

This document describes all API routes exposed by the CreatorAI backend server.

Base URL (Local Development): `http://localhost:5000/api`

---

## Endpoint Summary

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/api/health` | Service health check | 200 OK |
| `POST` | `/api/creators` | Create/onboard a creator | 201 Created |
| `GET` | `/api/creators/:id` | Fetch creator profile by ID | 200 OK / 404 |
| `GET` | `/api/creators/:id/digital-twin` | Fetch creator digital twin persona | 200 OK / 404 |
| `POST` | `/api/content/generate` | Generate AI content draft | 201 Created / 400 |
| `GET` | `/api/content/:id` | Fetch content draft by ID | 200 OK / 404 |
| `POST` | `/api/video/generate` | Generate video storyboard/render | 202 Accepted / 400 |
| `GET` | `/api/video/:id` | Fetch video job status | 200 OK / 404 |
| `GET` | `/api/analytics/:creatorId` | Fetch creator performance analytics | 200 OK / 404 |

---

## Quick Testing Commands (cURL / PowerShell)

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Get Creator Profile
```bash
curl http://localhost:5000/api/creators/creator_001
```

### 3. Get Creator Digital Twin
```bash
curl http://localhost:5000/api/creators/creator_001/digital-twin
```

### 4. Generate Content Draft
```bash
curl -X POST http://localhost:5000/api/content/generate \
  -H "Content-Type: application/json" \
  -d '{"creatorId":"creator_001","topic":"AI in education","platform":"instagram","contentType":"reel","tone":"friendly"}'
```

### 5. Get Video Details
```bash
curl http://localhost:5000/api/video/video_001
```

### 6. Get Analytics
```bash
curl http://localhost:5000/api/analytics/creator_001
```

For complete field definitions and schemas, refer to the respective files in [`contracts/`](file:///contracts/).
