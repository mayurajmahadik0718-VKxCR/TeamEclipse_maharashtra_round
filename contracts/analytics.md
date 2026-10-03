# Analytics API Contract

The Analytics API delivers creator metrics, engagement trends, platform performance comparisons, and AI insight recommendations.

---

## 1. Get Creator Analytics

**Endpoint:** `GET /api/analytics/:creatorId`  
**Description:** Fetches consolidated performance analytics and actionable insights for a creator.

### Path Parameters
| Parameter | Type | Description |
|---|---|---|
| `creatorId` | `string` | Unique identifier of the creator (e.g. `creator_001`) |

### Query Parameters (Optional)
| Parameter | Type | Default | Description |
|---|---|---|---|
| `period` | `string` | `30d` | `7d`, `30d`, `90d`, or `all` |

### Response Schema (`200 OK`)
```json
{
  "success": true,
  "data": {
    "creatorId": "creator_001",
    "period": "30d",
    "summary": {
      "totalViews": 482500,
      "viewsGrowth": "+23.4%",
      "totalLikes": 38400,
      "totalShares": 9150,
      "averageEngagementRate": "8.7%",
      "estimatedWatchTimeHours": 3210
    },
    "platformBreakdown": [
      {
        "platform": "instagram",
        "followers": 45200,
        "views": 265000,
        "engagementRate": "9.2%",
        "postsCount": 14
      },
      {
        "platform": "youtube",
        "subscribers": 28400,
        "views": 182000,
        "engagementRate": "7.9%",
        "postsCount": 6
      },
      {
        "platform": "linkedin",
        "followers": 12800,
        "views": 35500,
        "engagementRate": "6.8%",
        "postsCount": 10
      }
    ],
    "topPerformingContent": [
      {
        "contentId": "content_001",
        "title": "AI in Education - Stop studying 8 hours",
        "platform": "instagram",
        "views": 124000,
        "likes": 14200,
        "shares": 4800,
        "retentionScore": 88
      },
      {
        "contentId": "content_002",
        "title": "Top 3 VS Code Extensions for AI Devs",
        "platform": "youtube",
        "views": 98500,
        "likes": 8900,
        "shares": 2100,
        "retentionScore": 82
      }
    ],
    "aiInsights": [
      "Reels published between 6 PM - 8 PM IST receive 38% higher retention.",
      "Tutorials with split-screen hooks outperform single-camera videos by 2.1x.",
      "LinkedIn audience engages heavily with practical prompt breakdowns."
    ],
    "lastCalculated": "2026-10-03T18:00:00.000Z"
  }
}
```

### Error Response (`404 Not Found`)
```json
{
  "success": false,
  "error": "Analytics not found for creator creator_999"
}
```
