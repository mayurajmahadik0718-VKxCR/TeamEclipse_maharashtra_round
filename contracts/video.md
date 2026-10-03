# Video API Contract

The Video API manages AI video storyboard generation, scene breakdowns, prompt compilation, and video asset pipeline metadata.

---

## 1. Generate Video Storyboard / Asset

**Endpoint:** `POST /api/video/generate`  
**Description:** Initiates AI video storyboard generation or video rendering job based on script and visual prompts.

### Request Headers
| Header | Value | Description |
|---|---|---|
| `Content-Type` | `application/json` | Required |

### Request Body Schema
```json
{
  "creatorId": "string (required)",
  "contentId": "string (optional, links to generated script)",
  "title": "string (required)",
  "script": "string (required)",
  "aspectRatio": "string (required, e.g. 9:16 | 16:9 | 1:1)",
  "visualStyle": "string (optional, e.g. cinematic | hyperrealistic | 3d_animation | minimal_tech)",
  "voiceProfile": "string (optional, e.g. conversational_male_indian_accent | natural_female_us)"
}
```

### Request Example
```json
{
  "creatorId": "creator_001",
  "contentId": "content_001",
  "title": "AI in Education - 60s Reel",
  "script": "Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster without burning out!",
  "aspectRatio": "9:16",
  "visualStyle": "minimal_tech",
  "voiceProfile": "conversational_male_indian_accent"
}
```

### Response Schema (`202 Accepted`)
```json
{
  "success": true,
  "videoId": "video_001",
  "data": {
    "videoId": "video_001",
    "creatorId": "creator_001",
    "contentId": "content_001",
    "title": "AI in Education - 60s Reel",
    "status": "processing",
    "progressPercentage": 25,
    "aspectRatio": "9:16",
    "estimatedDurationSeconds": 58,
    "scenes": [
      {
        "sceneNumber": 1,
        "timestamp": "0:00 - 0:03",
        "narration": "Stop studying 8 hours a day. Here is how AI actually helps you learn 3x faster...",
        "visualPrompt": "Close up modern desk with glowing holographic study plan, smooth cinematic camera push-in",
        "bRollKeywords": ["student desk", "hologram", "focus"]
      },
      {
        "sceneNumber": 2,
        "timestamp": "0:03 - 0:15",
        "narration": "Step 1: Feed your lecture slides into an AI tutor and ask for 5 practice questions.",
        "visualPrompt": "Screen recording UI showing PDF drop and instantaneous flashcard breakdown",
        "bRollKeywords": ["ui demo", "ai prompt", "flashcards"]
      }
    ],
    "audioUrl": "https://storage.mockcreatorai.com/audio/video_001_preview.mp3",
    "videoUrl": null,
    "createdAt": "2026-10-03T12:05:00.000Z"
  }
}
```

---

## 2. Get Video Status & Details

**Endpoint:** `GET /api/video/:id`  
**Description:** Fetches the generation status and asset URLs for a specific video job.

### Path Parameters
| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | Unique video ID (e.g. `video_001`) |

### Response Schema (`200 OK`)
```json
{
  "success": true,
  "data": {
    "videoId": "video_001",
    "creatorId": "creator_001",
    "contentId": "content_001",
    "title": "AI in Education - 60s Reel",
    "status": "completed",
    "progressPercentage": 100,
    "aspectRatio": "9:16",
    "durationSeconds": 58,
    "scenes": [
      {
        "sceneNumber": 1,
        "timestamp": "0:00 - 0:03",
        "narration": "Stop studying 8 hours a day.",
        "visualPrompt": "Close up desk, glowing holographic UI",
        "renderedClipUrl": "https://storage.mockcreatorai.com/clips/v001_s1.mp4"
      }
    ],
    "audioUrl": "https://storage.mockcreatorai.com/audio/video_001_master.mp3",
    "videoUrl": "https://storage.mockcreatorai.com/videos/video_001_final.mp4",
    "thumbnailUrl": "https://storage.mockcreatorai.com/thumbnails/video_001_thumb.jpg",
    "createdAt": "2026-10-03T12:05:00.000Z",
    "completedAt": "2026-10-03T12:06:30.000Z"
  }
}
```

### Error Response (`404 Not Found`)
```json
{
  "success": false,
  "error": "Video job not found with id video_999"
}
```
