export type ProjectStatus = { label: string; note: string; live: boolean };

export type Project = {
  slug: string;
  index: string;
  name: string;
  descriptor: string;
  kind: string;
  summary: string;
  question: string;
  decision?: string;
  role: string;
  stack: string[];
  status: ProjectStatus;
  flow: string[];
  links: { github: string; live?: string; releases?: string; caseStudy?: string };
};

const gh = "https://github.com/manikanta7cheruku";

export const projects: Project[] = [
  {
    slug: "seven",
    index: "01",
    name: "SEVEN",
    descriptor: "A local-first desktop agent for Windows",
    kind: "Desktop agent",
    summary:
      "Speak or type, and it acts: opens apps, sets reminders, manages tasks, searches files, answers from your own documents. Speech recognition, the language model and memory run on your machine. It is growing into a layer for operating the computer itself.",
    question: "Why should a voice assistant need the internet to understand you?",
    decision:
      "Direct action handlers run before the language model, so common commands never wait on inference.",
    role: "Built solo: system design, backend, interface, installer, licensing and releases.",
    stack: [
      "Python",
      "FastAPI",
      "Electron",
      "React",
      "Whisper",
      "Ollama",
      "ChromaDB",
      "SentenceTransformers",
      "SQLite",
    ],
    status: {
      label: "Released",
      note: "Public releases on GitHub, still under active development.",
      live: true,
    },
    flow: ["Input", "Understanding", "Decision", "Memory", "Action", "System"],
    links: {
      github: `${gh}/NEURAL-SHELL`,
      releases: `${gh}/seven-releases/releases/latest`,
      caseStudy: "#seven",
    },
  },
  {
    slug: "showtime-sentinel",
    index: "02",
    name: "Showtime Sentinel",
    descriptor: "A ticket watcher that never notifies twice",
    kind: "Async monitoring service",
    summary:
      "Watches a movie listing you point it at and sends a Telegram message when tickets open. It only observes and notifies. It never books, buys or works around a block.",
    question: "How do you watch a listing without spamming yourself, or the site?",
    decision:
      "Every observation is hashed with SHA-256, so the same change never notifies twice, even after a restart. When a page returns a challenge, it reports BLOCKED and stops instead of retrying harder.",
    role: "Design and implementation: architecture, source adapters, tests, container setup.",
    stack: [
      "Python",
      "asyncio",
      "SQLite (WAL)",
      "Playwright",
      "Pydantic",
      "Telegram bot",
      "Docker",
      "GitHub Actions",
      "pytest",
    ],
    status: {
      label: "Working",
      note: "117 tests, none of them need a network. The real BookMyShow adapter is off by default.",
      live: false,
    },
    flow: ["Scheduler", "Source", "Normalize and hash", "Detect change", "Notify"],
    links: { github: `${gh}/Showtime-Sentinel` },
  },
  {
    slug: "hackathon-team-dynamics",
    index: "03",
    name: "Hackathon Team Dynamics",
    descriptor: "Predicting team performance, and showing why",
    kind: "Machine learning",
    summary:
      "An end-to-end ML pipeline that predicts how a hackathon team will perform from commit velocity, sleep patterns and communication frequency. SHAP attributions show which feature pushed each prediction.",
    question: "Can you predict how a team will perform, and see why the model said so?",
    decision:
      "SHAP gives a per-prediction attribution, so the model's decisions can be inspected and not only trusted.",
    role: "Design and implementation: features, training, evaluation and interpretation.",
    stack: ["Python", "XGBoost", "SHAP", "scikit-learn", "pandas"],
    status: {
      label: "Built",
      note: "Reaches 86% classification accuracy on the project dataset.",
      live: false,
    },
    flow: ["Features", "XGBoost", "Prediction", "SHAP attribution"],
    links: { github: `${gh}/hackathon-team-dynamics` },
  },
  {
    slug: "agentfetch",
    index: "04",
    name: "AgentFetch",
    descriptor: "Live data behind an agent-ready interface",
    kind: "API and dashboard",
    summary:
      "Pulls live crypto and weather data from real APIs through an async FastAPI backend, and shows it on a React dashboard and a developer CLI. The agent interface is in place so an LLM can be added later. That part is not built yet.",
    question: "What does a tool layer need so an LLM can use it later without a rewrite?",
    decision:
      "Tools sit behind one interface, so the dashboard, the CLI and a future agent all read data the same way.",
    role: "Design and implementation: backend, dashboard and command line.",
    stack: ["Python", "FastAPI", "React", "REST APIs", "CLI"],
    status: {
      label: "Live",
      note: "Dashboard deployed on Vercel. LLM orchestration is still ahead.",
      live: true,
    },
    flow: ["Live APIs", "FastAPI", "Agent interface", "Dashboard and CLI"],
    links: { github: `${gh}/agent-fetch`, live: "https://agent-fetch.vercel.app" },
  },
  {
    slug: "cobuild",
    index: "05",
    name: "CoBuild",
    descriptor: "Where founders find their squad",
    kind: "Web platform",
    summary:
      "A platform for founders to build projects and find the people to build them with. It comes from a problem I kept running into myself.",
    question: "Where does a founder find the people to build with?",
    role: "Design and implementation.",
    stack: ["Next.js", "TypeScript"],
    status: {
      label: "Early",
      note: "Deployed on Vercel and still taking shape.",
      live: true,
    },
    flow: ["Founder", "Project", "Squad"],
    links: { github: `${gh}/cobuild`, live: "https://cobuild-app.vercel.app" },
  },
  {
    slug: "resume-builder",
    index: "06",
    name: "Resume Builder",
    descriptor: "A resume form with a live preview",
    kind: "Web app",
    summary:
      "A web app for filling in a resume and watching it take shape. Multiple templates and PDF download are planned.",
    question: "What is the simplest way to fill in a resume and see it come together?",
    role: "Design and implementation.",
    stack: ["JavaScript", "Vite"],
    status: {
      label: "In progress",
      note: "One commit so far. Most of the plan is still ahead.",
      live: false,
    },
    flow: ["Form", "Live preview", "Templates", "PDF"],
    links: { github: `${gh}/resume-builder` },
  },
];
