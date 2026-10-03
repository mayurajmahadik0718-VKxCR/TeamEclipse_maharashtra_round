# Content API Contract

The Content API coordinates AI-generated scripts, hooks, captions, and outlines aligned with the creator's Digital Twin persona.

---

## 1. Generate Content

**Endpoint:** `POST /api/content/generate`  
**Description:** Generates structured social media content (hook, script, caption, hashtags) personalized to the creator's digital twin.

### Request Headers
| Header | Value | Description |
|---|---|---|
| `Content-Type` | `application/json` | Required |

### Request Body Schema
```json
{
  "creatorId": "string (required)",
  "topic": "string (required)",
  "platform": "string (required, e.g. instagram | youtube | linkedin | x | tiktok)",
  "contentType": "string (required, e.g. reel | post | carousel | long_video_script | thread)",
  "tone": "string (optional, defaults to creator digital twin tone)"
}
```

### Request Example
```json
{
  "creatorId": "creator_001",
  "topic": "AI in education",
  "platform": "instagram",
  "contentType": "reel",
  "tone": "friendly"
}
```

### Response Schema (`201 Created`)
```json
{
  "success": true,
  "contentId": "content_001",
  "data": {
    "contentId": "content_001",
    "creatorId": "creator_001",
    "topic": "AI in education",
    "platform": "instagram",
    "contentType": "reel",
    "tone": "friendly",
    "hook": "Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster without burning out!",
    "script": "[0:00-0:03] Hook with split screen of messy notes vs clean AI mind map.\n[0:03-0:15] Step 1: Feed your lecture slides into an AI tutor and ask for 5 practice questions.\n[0:15-0:30] Step 2: Use voice mode to explain the concept back. If you can't explain it, you don't know it.\n[0:30-0:45] Step 3: Auto-generate flashcards for spaced repetition in under 10 seconds.\n[0:45-0:60] CTA: Comment 'STUDY' and I'll send you my exact free prompt templates!",
    "caption": "Work smarter, not harder 🧠✨ Most students use AI to cheat, but top students use it to practice deeper and remember longer. Save this reel for your next exam session!",
    "hashtags": [
      "#AIinEducation",
      "#StudySmart",
      "#StudentLife",
      "#EdTech",
      "#ProductivityHacks",
      "#AItools"
    ],
    "createdAt": "2026-10-03T12:00:00.000Z"
  }
}
```

### Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Missing required fields",
  "details": ["topic is required", "platform must be one of: instagram, youtube, linkedin, x, tiktok"]
}
```

---

## 2. Get Content by ID

**Endpoint:** `GET /api/content/:id`  
**Description:** Fetches a previously generated content draft.

### Path Parameters
| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | Unique content ID (e.g. `content_001`) |

### Response Schema (`200 OK`)
```json
{
  "success": true,
  "data": {
    "contentId": "content_001",
    "creatorId": "creator_001",
    "topic": "AI in education",
    "platform": "instagram",
    "contentType": "reel",
    "tone": "friendly",
    "hook": "Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster without burning out!",
    "script": "[0:00-0:03] Hook with split screen...",
    "caption": "Work smarter, not harder 🧠✨...",
    "hashtags": ["#AIinEducation", "#StudySmart", "#EdTech"],
    "status": "ready_for_production",
    "createdAt": "2026-10-03T12:00:00.000Z"
  }
}
```

### Error Response (`404 Not Found`)
```json
{
  "success": false,
  "error": "Content not found with id content_999"
}
```
