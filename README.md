# 🕵️ Greenwashing Agent Project (LLM + MERN)
A full-stack intelligent system designed to identify potential greenwashing in corporate sustainability disclosures through Large Language Models (LLMs) and the MERN technology stack. The platform seamlessly integrates a file-driven user interface, LLM-based analytical agents, and secure authentication workflows—forming a robust pipeline for evaluating the credibility of environmental claims with automation, transparency, and depth.

## 🔍 Key Features

- **🤖 LLM-Powered Greenwashing Analysis**

  A Python-based backend integrates with OpenAI’s GPT models to analyze uploaded corporate sustainability documents, identify key claims, and surface potential greenwashing through prompt-driven reasoning.

- **🧱 MERN-Based Infrastructure**

  Built with MongoDB, Express, React, and Node.js, the system provides seamless integration between the frontend and backend, supporting secure authentication, file handling, and history retrieval.

- **🔐 Secure JWT Authentication**

  Stateless authentication using JSON Web Tokens and custom middleware ensures protected access to user data and document records.

- **🗂️ Zustand-Powered State Management**

  The frontend leverages Zustand for lightweight, predictable global state—handling authentication flow, UI state, and file submission status with minimal overhead.

- **🎨 Clean UI & History Management**

  A minimal, responsive interface built with Vite and React allows users to upload documents, view past submissions, and track analysis history with intuitive navigation.

## 📁 Project Structure

```bash
greenwashing-agent/
├── backend/                         # Backend - Node.js + Express + MongoDB + FastAPI (LLM Agent)
│   ├── python/                      # Python-based LLM agent
│   │   ├── greenwashing_agent.py    # Core analysis logic using OpenAI
│   │   └── main.py                  # Entry point to run the agent
│   ├── controllers/                 # Request handlers (auth, history, save)
│   ├── db/                          # MongoDB connection setup
│   ├── middleware/                  # Middleware (JWT auth, error handlers)
│   ├── models/                      # Mongoose schemas (User, File)
│   ├── routes/                      # Express API route definitions
│   ├── utils/                       # Utility functions
│   └── server.js                    # Entry point for the backend server
│
├── frontend/                        # Frontend - React + Zustand + Tailwind CSS
│   ├── public/                      # Static assets and index.html
│   ├── src/
│   │   ├── components/              # UI components (Cards, FileZone, Navbar, etc.)
│   │   ├── pages/                   # Pages (Home, Login, Signup, History)
│   │   ├── context/                 # React context for global auth state
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── zustand/                 # Zustand store setup
│   │   ├── utils/                   # Utility helpers
│   │   ├── lib/                     # Shared utility functions
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # App entry point
│   └── package.json                 # Frontend dependencies and scripts
│
├── .env                             # Environment variables
├── .gitignore                       # Git ignored files
└── README.md                        # Project documentation
```

## 🛠 Tech Stack

- **Backend**: `Node.js`, `Express.js`, `MongoDB`, `Mongoose`

- **LLM Agent**: `Python`, `OpenAI API`, `FastAPI`

- **Frontend**: `React`, `React Router`

- **UI & Visualization**: `Tailwind CSS`, `ShadcnUI`, `react-hot-toast`, `framer-motion` (animation), `useDropzone` (file upload interaction)

- **State Management**: `Zustand` (global state management)

- **Authentication**: `JWT` (secure session handling), `bcrypt` (password hashing)

- **File Processing**: `PyPDF2`, `python-docx`, `difflib`


## 🌐 Deployment

👉 **Live Demo**: https://greenwashing-agent-prod.onrender.com
