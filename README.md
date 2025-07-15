# 🧠 reddit-persona

**Reddit Persona Analyzer** is a full-stack web app that generates a psychological profile of any Reddit user by analyzing their public posts and comments. It leverages language patterns, subreddit behavior, and prompt-driven reasoning to generate MBTI-style personality traits, behaviors, goals, and frustrations.

<div align="center">
  <img src="./images/main-ui.png" alt="Reddit Persona UI" width="700"/>
  <p><em>Enter a Reddit profile URL to analyze</em></p>
</div>

---

## 🚀 Features

- 🔍 Analyze any Reddit user's public activity
- 🧬 Auto-generates MBTI-style personality metrics
- 📊 Displays personality traits, behaviors, goals & frustrations
- 🧠 Powered by language model analysis
- ⚡ Fast frontend-backend communication over REST API

---

## 🧰 Tech Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | React + TypeScript + Tailwind CSS                |
| Backend  | Node.js + Express + OpenAI (LLM)                 |
| LLM      | Local or cloud-based (e.g., GPT, Gemini, Claude) |
| Styling  | TailwindCSS, Lucide Icons                        |
| API Comm | REST via Axios                                   |

---

## 📁 Project Structure

```
reddit-persona/
├── backend/
│   └── src/
│       ├── llm/          # Prompt builders, persona analyzers
│       ├── routes/       # API endpoints
│       └── utils/        # Data parsers, validators
├── frontend/
│   └── src/
│       ├── components/   # React components (e.g., URLInput)
│       ├── types/        # TypeScript interfaces
│       └── utils/        # Client-side utilities
├── images/               # Screenshots used in README
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (18+)
- npm or yarn
- (Optional) OpenAI API key or any LLM setup in `backend/src/llm`

---

## 🧪 Local Development

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/reddit-persona.git
cd reddit-persona
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

> By default runs at: `http://localhost:8000`

Ensure you add any API keys for using Reddit API and Google Gemini API KEY or model settings in a `.env` file (e.g., `GEMINI_API_KEY=...`).

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Runs by default at: `http://localhost:5173`

---

## 🔗 API Endpoint

**POST** `/api/user/link`

**Request Body:**

```json
{ "url": "https://www.reddit.com/user/username/" }
```

**Response:**

```json
{
  "userInfo": { ... },
  "userPosts": [ ... ],
  "reply": "AI-generated persona summary"
}
```

---

## 🖼️ Screenshots

### 🔍 Profile Analyzer UI

<img src="./images/query-page.png" width="700"/>

### 🧠 Persona Output (Sample)

<img src="./images/output-page.png" width="700"/>

---

## 💡 Example URLs

- `https://www.reddit.com/user/kojied/`
- `https://www.reddit.com/user/Hungry-Move-6603/`

---

## 📄 License

MIT License © 2025 Abhik4004
