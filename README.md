# StudyFlow Focus 🚀
**Mini Fullstack Productivity App for Modern Students**

StudyFlow Focus adalah aplikasi manajemen tugas (To-Do List) modern yang dirancang khusus untuk mahasiswa. Aplikasi ini membantu pengguna mencatat target belajar, mengatur prioritas, dan memantau progres belajar melalui fitur statistik real-time dan integrasi sistem file JSON sebagai database lokal.

## 🌐 Link Deployment
- **Frontend (Vercel):** [https://studyflow-focus-zeta.vercel.app/](https://studyflow-focus-zeta.vercel.app/)
- **Backend Tunnel (DevTunnels):** [https://dvlb2qxv-8080.asse.devtunnels.ms/api/tasks](https://dvlb2qxv-8080.asse.devtunnels.ms/api/tasks)

## 🛠️ Tech Stack
- **Frontend:** Next.js 15+, Tailwind CSS, Lucide React (Icons).
- **Backend:** Node.js, Express.js.
- **Database:** JSON File Persistence (`tasks.json`).
- **Security:** Helmet.js, CORS Management.
- **Deployment:** Vercel (Frontend) & VS Code Port Forwarding (Local Backend).

## 📂 Struktur Proyek
```text
studyflow-focus/
├── frontend/             # Next.js Application
│   ├── components/       # Reusable UI Components
│   ├── lib/api.js        # API Handler (Fetch)
│   └── app/              # Next.js App Router
├── backend/              # Express.js Server
│   ├── index.js          # Entry Point & API Routes
│   └── tasks.json        # Local Database
└── .gitignore            # Root gitignore
