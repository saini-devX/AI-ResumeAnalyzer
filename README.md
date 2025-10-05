# 🧠 AI Resume Analyzer

**AI Resume Analyzer** helps users analyze resumes for **ATS readiness**, **role-fit**, and **missing skills** using an **AI-assisted MERN app**.  
It includes secure authentication, intelligent PDF parsing, and actionable insights — all powered by **Gemini AI**.

---

## 🌐 Live Demo

🔗 **Deployed App:** [AI Resume Analyzer](https://resumes-analyzer.vercel.app)

---

## 🚀 Features

- 🤖 **AI-Guided Insights** – Get detailed feedback on resume strengths, weaknesses, and job alignment  
- 🧩 **Keyword & Skill Matching** – Detect keywords, skills, and their aliases from job descriptions  
- 📊 **Role-Fit Scoring** – Evaluate how well a resume matches a specific job description  
- 🔐 **Secure Authentication** – JWT-based login, file validation, and safe uploads  
- 🧠 **Gemini-Powered AI Analysis** – Smart parsing and context-aware recommendations  
- ⚡ **Smooth Performance** – Built for speed with Vite, React, and Tailwind CSS  

---

## 🛠 Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express, JWT, PDF Parsing  
**Database:** MongoDB  
**AI Integration:** Gemini API  

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/saini-devX/AI-ResumeAnalyzer.git
cd AI-ResumeAnalyzer
```

### Install Dependencies

```bash
# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Run the App

```bash
# Start backend server
cd server && npm run dev

# Start frontend client
cd ../client && npm run dev
```

---

## ⚙️ Environment Variables

### Server `.env`
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:5173
AI_PROVIDER=gemini
AI_API_KEY=your_ai_api_key
MAX_FILE_SIZE_MB=5
```

### Client `.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 📂 Usage

1. 🔑 Register or sign in  
2. 📄 Upload a PDF resume (optionally include a job description)  
3. 🧠 Review ATS score, keyword matches, missing skills, and AI suggestions  
4. 💾 Save analyses and refine your resume for better job-fit  

---

## 🔐 Security

- HTTP-only cookies for secure sessions  
- Strict file validation and size limits  
- Secrets never exposed in client code  

---

## 🤝 Contributing

Contributions are welcome!  

1. **Fork** the repo  
2. **Create** a new branch (`feature/your-feature-name`)  
3. **Commit** your changes  
4. **Open** a Pull Request  

💬 For major changes, please open an issue to discuss your ideas first.

---

## 📄 License

**MIT License** © 2025 [saini-devX](https://github.com/saini-devX)  
See the [LICENSE](./LICENSE) file for details.

---

## 📬 Contact

📦 **GitHub Repository:** [saini-devX/AI-ResumeAnalyzer](https://github.com/saini-devX/AI-ResumeAnalyzer)  
🌐 **Live App:** [https://resumes-analyzer.vercel.app](https://resumes-analyzer.vercel.app)

---

> _"Empowering smarter hiring decisions with AI-driven resume insights."_ ⚙️
