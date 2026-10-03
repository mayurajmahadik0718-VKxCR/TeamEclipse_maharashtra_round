# Digital Twin API Contract

The **Creator Digital Twin** is the core AI innovation of CreatorAI. It models the creator's personality, speaking style, target demographic, content formats, tone, and strategic preferences so all AI generations stay 100% authentic to the creator.

---

## Digital Twin Persona Structure

A Digital Twin profile represents:
1. **Creator Name**: Identity reference
2. **Niche**: Primary subject matter / domain expertise
3. **Target Audience**: Demographic, experience level, aspirations
4. **Tone**: Voice characteristics (e.g. conversational, analytical, energetic, inspiring)
5. **Preferred Platforms**: Channels targeted (YouTube, Instagram, LinkedIn, X, TikTok)
6. **Content Style**: Structural delivery (hook-heavy, story-driven, bite-sized tutorials)
7. **Interests**: Key topic clusters creator is enthusiastic about
8. **Preferences**: Formatting constraints (emoji density, video length, CTA style)
9. **Past Content & References**: Top performing formats, signature catchphrases, sample hooks

---

## 1. Get Creator Digital Twin

**Endpoint:** `GET /api/creators/:id/digital-twin`  
**Description:** Fetches the digital twin model and persona parameters for a creator.

### Path Parameters
| Parameter | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier of the creator (e.g. `creator_001`) |

### Response Schema (`200 OK`)
```json
{
  "success": true,
  "data": {
    "twinId": "twin_001",
    "creatorId": "creator_001",
    "creatorName": "Aarav Sharma",
    "niche": "AI & Tech Education",
    "targetAudience": {
      "demographic": "College students, junior software developers, tech career switchers",
      "painPoints": ["Overwhelmed by AI jargon", "Struggling to find hands-on AI projects", "Needs fast tutorials under 60 seconds"],
      "skillLevel": "Beginner to Intermediate"
    },
    "tone": {
      "primary": "friendly",
      "attributes": ["encouraging", "practical", "hype-free", "humorous"]
    },
    "preferredPlatforms": [
      "instagram",
      "youtube",
      "linkedin",
      "x"
    ],
    "contentStyle": {
      "hookStyle": "Curiosity gap + immediate visual demonstration",
      "pacing": "Fast, high energy first 3 seconds, concise step-by-step breakdown",
      "visualAesthetics": "Dark mode IDE, vibrant cyan/violet highlights, minimalist overlays",
      "signaturePhrases": ["Let's build this in 60 seconds!", "No fluff, just code."]
    },
    "interests": [
      "Generative AI",
      "Prompt Engineering",
      "Open Source Developer Tools",
      "Productivity Apps"
    ],
    "preferences": {
      "emojiDensity": "moderate",
      "defaultVideoFormat": "9:16 vertical reel",
      "callToAction": "Drop a comment with 'BUILD' for the starter code",
      "hashtagStrategy": "5 targeted niche tags + 2 high-volume tech tags"
    },
    "pastContentReference": [
      {
        "title": "Build a RAG app in 5 minutes",
        "engagementRate": "8.4%",
        "bestPerformingPlatform": "instagram"
      },
      {
        "title": "Top 3 VS Code extensions for 2026",
        "engagementRate": "11.2%",
        "bestPerformingPlatform": "youtube"
      }
    ],
    "lastUpdated": "2026-10-03T11:30:00.000Z"
  }
}
```

### Error Response (`404 Not Found`)
```json
{
  "success": false,
  "error": "Digital twin not found for creator creator_999"
}
```
