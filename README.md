# CreatorAI – AI-Powered Creator Operating Platform

> **Hackathon Foundation Project**  
> Empowering content creators to ideate, script, produce, and optimize multimedia content while preserving their authentic voice through a personal **Creator Digital Twin**.

---

## 1. What is CreatorAI?

Content creators often face burnout, creative blocks, and the tedious chore of repurposing scripts across multiple formats (Reels, YouTube, LinkedIn, X). Existing generic AI tools produce generic, robotic content that sounds like everyone else.

**CreatorAI** solves this by introducing the **Creator Digital Twin**:
- An intelligent persona model that captures your tone, preferred vocabulary, audience pain points, visual pacing, and formatting rules.
- Generates high-retention hooks, timed video scripts, captions, and visual storyboards tailored specifically to you.
- Analyzes cross-platform engagement to continually calibrate and improve content performance.

---

## 2. The 3 Team Roles

This codebase is modularly partitioned so our 3-person team can work smoothly in parallel without merge conflicts:

| Role | Team Member | Primary Domain | Focus Area |
|---|---|---|---|
| 🎨 **Frontend** | **Teammate 1** | `frontend/` | UI/UX in React & Vite, Lucide icons, responsive layout, Recharts data visualization, routing |
| 🧠 **AI & Video Intelligence** | **Teammate 2** | `backend/src/services/` & AI pipelines | Creator Digital Twin persona engine, prompt engineering, video storyboard generation |
| 🛠️ **Backend & Integration** | **Teammate 3** | `backend/` & `contracts/` | Express REST API endpoints, Supabase database integration, Zod validations, environment config |

---

## 3. Technology Stack

### Frontend
- **Framework:** React 18 + Vite (ultra-fast hot module reloading)
- **Routing:** React Router v7
- **HTTP Client:** Axios (configured with backend proxy)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Styling:** Modern dark-mode CSS variables & responsive grid layout

### Backend
- **Runtime:** Node.js (ES Modules)
- **Web Framework:** Express.js
- **Database Client:** `@supabase/supabase-js` (ready for Phase 2 connection)
- **Validation:** Zod
- **Environment Management:** `dotenv`
- **Dev Server:** `nodemon` (auto-restarts on code edits)

---

## 4. Current MVP Scope

### In Scope for this Hackathon MVP:
- ✅ **Creator Profile:** Onboarding and storing creator details, niches, and social channels.
- ✅ **Creator Digital Twin:** Persona modeling (tone, audience demographics, pacing, past winning content references).
- ✅ **AI Idea & Content Studio:** Inputting topics to produce tailored hooks, timed scripts, captions, and hashtags.
- ✅ **AI Video Studio:** Storyboarding scripts into camera directions, visual prompts, and scene breakdowns.
- ✅ **Dashboard & Analytics:** Key creator velocity metrics, audience charts, and actionable AI recommendations.
- ✅ **Saving Generated Content:** Structured in-memory and database-ready persistence.

### Intentionally Out of Scope (Kept Simple):
- ❌ Direct social-media auto-publishing / OAuth APIs
- ❌ Payment gateways / billing subscriptions
- ❌ Complex enterprise multi-tenant authentication

---

## 5. Project Directory Structure

```text
CreatorAI/
├── frontend/
│   ├── public/               # Static assets & icons
│   ├── src/
│   │   ├── assets/           # Media & graphics
│   │   ├── components/       # Reusable UI cards, headers, badges
│   │   ├── pages/            # Dashboard, Digital Twin, Studio, Video, Analytics
│   │   ├── layouts/          # Sidebar, Navbar, MainLayout
│   │   ├── services/         # Axios API client
│   │   ├── hooks/            # Custom React hooks (useCreator)
│   │   ├── utils/            # Formatting helpers
│   │   ├── App.jsx           # App routing
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Design system & dark theme
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/           # Port and environment variables
│   │   ├── controllers/      # Route controllers (Creator, Digital Twin, Content, Video, Analytics)
│   │   ├── middleware/       # Zod validation and error handlers
│   │   ├── routes/           # REST endpoints
│   │   ├── services/         # Business logic & AI generation services
│   │   ├── utils/            # Mock data loader
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # HTTP server entrypoint
│   ├── mock-data/            # Realistic JSON seed datasets
│   └── package.json
│
├── contracts/                # Rigid API specs for team collaboration
│   ├── creator.md
│   ├── digital-twin.md
│   ├── content.md
│   ├── video.md
│   └── analytics.md
│
├── docs/                     # Technical architecture & design docs
│   ├── architecture.md
│   ├── database.md
│   └── api.md
│
├── .env.example              # Environment variables template
├── .gitignore                # Ignored files (node_modules, .env, dist)
├── README.md                 # Project guide (this file)
└── package.json              # Root orchestration scripts
```

---

## 6. How to Install and Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended, tested on v24)
- npm (installed with Node)

---

### Step 1: Install Dependencies

From the project root folder:

```bash
# Option A: Install all dependencies at once using root script
npm run install:all

# Option B: Install manually in both folders
cd backend
npm install
cd ../frontend
npm install
```

---

### Step 2: Configure Environment (Optional for Phase 1)

Copy `.env.example` to `.env` if you want to override default ports:
```bash
cp .env.example .env
```
*(No real API keys are needed right now; realistic mock data is used automatically).*

---

### Step 3: Run the Backend Server

In a terminal:
```bash
# From the root directory:
npm run backend:dev

# Or directly from backend/:
cd backend
npm run dev
```
Backend will start on: **`http://localhost:5000`**  
Test the health check: **`http://localhost:5000/api/health`**

---

### Step 4: Run the Frontend Application

In a second terminal:
```bash
# From the root directory:
npm run frontend:dev

# Or directly from frontend/:
cd frontend
npm run dev
```
Frontend will start on: **`http://localhost:3000`** (or Vite's assigned port).  
Open your browser and navigate to `http://localhost:3000` to interact with CreatorAI!

---

## 7. API Quick Reference

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Backend status check |
| `POST` | `/api/creators` | Create new creator profile |
| `GET` | `/api/creators/:id` | Fetch creator profile |
| `GET` | `/api/creators/:id/digital-twin` | Fetch creator's Digital Twin persona |
| `POST` | `/api/content/generate` | Generate AI hook, script, caption, hashtags |
| `GET` | `/api/content/:id` | Retrieve saved content draft |
| `POST` | `/api/video/generate` | Generate video storyboard scenes |
| `GET` | `/api/video/:id` | Retrieve video rendering status |
| `GET` | `/api/analytics/:creatorId` | Fetch creator performance analytics |

For full request/response schemas, check [`contracts/`](contracts/) and [`docs/api.md`](docs/api.md).
