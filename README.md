AI Resume Analyzer

Analyze resumes for ATS readiness, role-fit, and missing skills with an AI-assisted MERN app. Secure authentication, PDF parsing, and actionable insights included.

🚀 Features

AI-guided resume insights: strengths, weaknesses, and role-aligned suggestions

PDF parsing with keyword/skill matching (aliases supported)

Role-fit scoring & gap analysis against job descriptions

Secure JWT-based auth, file validation, and safe uploads

🌐 Live Demo

https://resumes-analyzer.vercel.app

🛠 Tech Stack

Frontend: React, Tailwind CSS, Vite

Backend: Node.js, Express, JWT, PDF parsing

Database: MongoDB

AI : Gemini

⚡ Quick Start
git clone https://github.com/saini-devX/AI-ResumeAnalyzer.git
cd AI-ResumeAnalyzer

# Install dependencies
cd server && npm install
cd ../client && npm install

# Run
cd server && npm run dev
cd ../client && npm run dev

Environment Variables

Server .env:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
AI_PROVIDER=gemini
AI_API_KEY=your_ai_api_key
MAX_FILE_SIZE_MB=5


Client .env:

VITE_API_URL=http://localhost:5000

📂 Usage

Register & sign in

Upload PDF resume (optional job description)

Review ATS score, keyword matches, missing skills, and suggestions

Save analyses and iterate

🔐 Security

HTTP-only cookies for sessions

File validation & size limits

No secrets in client code

🤝 Contributing

Fork → Branch → Commit → PR. Discuss major changes via GitHub Issues.

📄 License

MIT License. See LICENSE.

📬 Contact

GitHub Repository
