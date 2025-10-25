### YT Downloader

Professional full‑stack YouTube downloader.

### Stack
- Frontend: React + Vite + TypeScript + TailwindCSS (with shadcn‑style UI components)
- Backend: FastAPI (Python) + yt‑dlp

### Prerequisites
- Node.js 18+
- Python 3.10+
- FFmpeg installed and available on PATH (required by yt‑dlp for audio extraction)

### Backend (port 5000)
1. Create and activate a virtualenv (optional but recommended).
2. Install dependencies:
   - `pip install -r backend/requirements.txt`
3. Run the server:
   - `uvicorn app.main:app --reload --port 5000 --host 0.0.0.0 --app-dir backend`

Downloads will be saved under `backend/downloads/` and served at `/downloads/<filename>`.

### Frontend (port 3000)
1. Install dependencies:
   - `cd frontend`
   - `npm install`
2. Start the dev server:
   - `npm run dev`

### Notes
- The UI uses an accent color `#E50914` (YouTube red variant).
- Three responsive ad placeholders are included: top banner, right sidebar (desktop), bottom bar.

### Security
- This project is for personal/educational purposes. Ensure adherence to YouTube Terms of Service and local laws.


