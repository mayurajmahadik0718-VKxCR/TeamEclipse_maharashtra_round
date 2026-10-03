# Creator API Contract

The Creator API handles registration, onboarding, and profile retrieval for content creators on the CreatorAI platform.

---

## 1. Create Creator Profile

**Endpoint:** `POST /api/creators`  
**Description:** Registers a new creator profile and initializes basic platform preferences.

### Request Headers
| Header | Value | Description |
|---|---|---|
| `Content-Type` | `application/json` | Required |

### Request Body Schema
```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email)",
  "bio": "string (optional)",
  "primaryNiche": "string (required)",
  "socialHandles": {
    "youtube": "string (optional)",
    "instagram": "string (optional)",
    "twitter": "string (optional)",
    "linkedin": "string (optional)",
    "tiktok": "string (optional)"
  }
}
```

### Request Example
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@creatorai.io",
  "bio": "Tech educator simplifying AI and developer tools for students and beginners.",
  "primaryNiche": "AI & Tech Education",
  "socialHandles": {
    "youtube": "@AaravTechExplains",
    "instagram": "@aarav_codes",
    "twitter": "@aarav_ai",
    "linkedin": "aaravsharma-tech"
  }
}
```

### Response Schema (`201 Created`)
```json
{
  "success": true,
  "message": "Creator profile created successfully",
  "data": {
    "id": "creator_001",
    "name": "Aarav Sharma",
    "email": "aarav@creatorai.io",
    "bio": "Tech educator simplifying AI and developer tools for students and beginners.",
    "primaryNiche": "AI & Tech Education",
    "socialHandles": {
      "youtube": "@AaravTechExplains",
      "instagram": "@aarav_codes",
      "twitter": "@aarav_ai",
      "linkedin": "aaravsharma-tech"
    },
    "createdAt": "2026-10-03T10:00:00.000Z"
  }
}
```

### Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    "Name is required",
    "Valid email is required"
  ]
}
```

---

## 2. Get Creator Profile

**Endpoint:** `GET /api/creators/:id`  
**Description:** Retrieves a specific creator profile by ID.

### Path Parameters
| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier of the creator (e.g. `creator_001`) |

### Response Schema (`200 OK`)
```json
{
  "success": true,
  "data": {
    "id": "creator_001",
    "name": "Aarav Sharma",
    "email": "aarav@creatorai.io",
    "bio": "Tech educator simplifying AI and developer tools for students and beginners.",
    "primaryNiche": "AI & Tech Education",
    "socialHandles": {
      "youtube": "@AaravTechExplains",
      "instagram": "@aarav_codes",
      "twitter": "@aarav_ai",
      "linkedin": "aaravsharma-tech"
    },
    "createdAt": "2026-10-03T10:00:00.000Z"
  }
}
```

### Error Response (`404 Not Found`)
```json
{
  "success": false,
  "error": "Creator not found with id creator_999"
}
```
