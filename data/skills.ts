export type SkillGroup = { title: string; items: string[]; seenIn: string[] };

export const languages = ["Python", "JavaScript", "TypeScript", "SQL"];

export const skillGroups: SkillGroup[] = [
  {
    title: "Local AI",
    items: ["Ollama", "Whisper", "ChromaDB", "SentenceTransformers", "RAG", "Vector embeddings"],
    seenIn: ["SEVEN"],
  },
  {
    title: "Machine learning",
    items: ["XGBoost", "SHAP", "scikit-learn", "pandas"],
    seenIn: ["Hackathon Team Dynamics"],
  },
  {
    title: "Backend",
    items: ["FastAPI", "asyncio", "REST API design", "Pydantic"],
    seenIn: ["SEVEN", "AgentFetch", "Showtime Sentinel"],
  },
  {
    title: "Interface and desktop",
    items: ["React", "Electron", "Vite", "Tailwind CSS", "Next.js", "TypeScript"],
    seenIn: ["SEVEN", "CoBuild", "AgentFetch"],
  },
  {
    title: "Data",
    items: ["SQLite", "PostgreSQL", "ChromaDB"],
    seenIn: ["SEVEN", "Showtime Sentinel"],
  },
  {
    title: "Shipping",
    items: ["Git", "GitHub Actions", "Docker", "Render", "Vercel", "pytest"],
    seenIn: ["SEVEN", "Showtime Sentinel"],
  },
];

export const alsoWorkedWith = [
  "LangChain",
  "Agentic AI patterns",
  "Node.js",
  "Linux",
  "System design",
  "OOP",
  "Agile",
  "TDD basics",
];

export const principles = [
  {
    title: "Cheapest path first",
    body: "In SEVEN, direct action handlers run before the language model. Opening an app never waits on inference.",
  },
  {
    title: "Make failure boring",
    body: "In Showtime Sentinel an empty allowlist denies everyone, a blocked page is reported and never hammered, and a restart never resends what was already sent.",
  },
  {
    title: "Prove it without the network",
    body: "Showtime Sentinel's 117 tests make zero network calls, so the whole pipeline can be checked anywhere.",
  },
  {
    title: "See why a model decided",
    body: "In the hackathon predictor, SHAP attributes every prediction to its features, so the result can be questioned.",
  },
];
