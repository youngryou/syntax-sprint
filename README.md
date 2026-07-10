# Syntax Sprint

> **A real-time styled typing arena built for web developers or learners to master coding syntax and build programming muscle memory.**

A collaborative full-stack web application designed to help developers transition clumsy keystrokes (like nested brackets and complex symbols) into smooth muscle memory. Featuring isolated validation loops, dynamic scoring, and anti-cheat mechanisms.

---

## Key Features

- **Developer-Centric Snippets:** Real-world code blocks across multiple languages (JavaScript, TypeScript, Python, etc.) categorised by difficulty.
- **Real-time Input Validation:** Instant visual feedback (green/orange) mapped precisely through character-array comparison.
- **Weighted Scoring Algorithm:** Advanced scoring system that calculates CPM (Characters Per Minute) and Accuracy, multiplied by code difficulty factors.
- **Anti-Cheat Defence:** Built-in mechanisms to block `onPaste` macros to ensure fair competitive integrity.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **Database & Auth:** Supabase (PostgreSQL)

## Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase Account

### Installation
1. Clone the repository:
    ```bash
    git clone git@github.com:youngryou/syntax-sprint.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (`.env`):
    ```ini
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
    SUPABASE_URL=your_supabase_project_url
    FRONTEND_URL=http://localhost:5173
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```
