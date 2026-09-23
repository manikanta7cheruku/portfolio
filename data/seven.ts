export type Stage = {
  id: string;
  name: string;
  verb: string;
  body: string;
  details: string[];
};

export const stages: Stage[] = [
  {
    id: "input",
    name: "Input",
    verb: "You speak or type.",
    body: "A wake word or push to talk starts a request, and speaker verification can check who is asking. Noise filtering, voice activity detection, echo cancellation and gain control clean the signal before anything tries to read it.",
    details: [
      "Wake word",
      "Push to talk",
      "Speaker verification",
      "Noise filtering",
      "Voice activity detection",
      "Echo cancellation",
    ],
  },
  {
    id: "understanding",
    name: "Understanding",
    verb: "Speech becomes text, then intent.",
    body: "Whisper transcribes the audio on the machine. The text then passes through a 13-layer processing pipeline that works out what is being asked.",
    details: ["Whisper", "13-layer pipeline", "Runs locally"],
  },
  {
    id: "decision",
    name: "Decision",
    verb: "The cheapest path goes first.",
    body: "The request is checked against direct action handlers before any model is involved. Opening an app, creating a task or a system command fires immediately. Only what nothing else matches goes to the local language model through Ollama.",
    details: ["Direct handlers", "Ollama", "LLaMA 3", "Phi-3", "Qwen", "TinyLlama"],
  },
  {
    id: "memory",
    name: "Memory",
    verb: "It remembers, on your machine.",
    body: "Facts you tell it and your conversation history live in ChromaDB, embedded with SentenceTransformers so recall works by meaning and not by keyword. You can add your own documents and ask questions from them. On an 8 GB machine with no GPU, retrieval stays under a second.",
    details: ["ChromaDB", "SentenceTransformers", "Semantic search", "Document questions"],
  },
  {
    id: "action",
    name: "Action",
    verb: "Then it does something.",
    body: "Tasks with subtasks, due dates and priorities. Reminders, alarms, timers and recurring events that fire even when the window is closed. Triggers map a phrase or a hotkey to any action, and workspaces save a full app layout so one command brings it back.",
    details: ["Tasks", "Reminders", "Timers", "Triggers", "Workspaces"],
  },
  {
    id: "system",
    name: "System",
    verb: "Windows does the rest.",
    body: "Launch and close apps, change volume and brightness, snap windows, search files, take screenshots, check the battery. An Electron shell and a React interface sit on a Python FastAPI backend with more than 30 endpoints, and a small floating orb always shows what SEVEN is doing.",
    details: ["Electron", "React", "FastAPI", "30+ endpoints", "IPC", "Status orb"],
  },
];

export const stays = {
  local: [
    "Speech recognition",
    "The language model",
    "Conversation memory",
    "Your facts and documents",
    "Tasks and schedules",
    "Voice audio, processed in memory and never stored",
  ],
  server: ["Time spent in the app", "License validation", "Update checks"],
};

export type Step = { label: string; state: "built" | "direction" };

export const trajectory: Step[] = [
  { label: "Voice interaction", state: "built" },
  { label: "Local intelligence", state: "built" },
  { label: "System control", state: "built" },
  { label: "Memory", state: "built" },
  { label: "Actions", state: "built" },
  { label: "Automation", state: "built" },
  { label: "A broader OS interaction layer", state: "direction" },
];

export const facts = [
  { k: "Platform", v: "Windows 10 and 11" },
  { k: "Hardware", v: "Runs without a GPU, 8 GB RAM minimum" },
  { k: "Backend", v: "30+ FastAPI endpoints" },
  { k: "History", v: "1,200+ commits" },
];
