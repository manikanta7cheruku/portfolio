export const site = {
  name: "Manikanta Cheruku",
  role: "Software Engineer & Product Builder",
  location: "Hyderabad, India",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manikanta-cheruku.vercel.app",
  description:
    "Manikanta Cheruku is a software engineer and product builder in Hyderabad, India. He builds local-first AI software and is looking for software engineering roles.",
  email: "cherukumanikanta77@gmail.com",
  phone: { display: "+91 8074695041", tel: "+918074695041", show: true },
  links: {
    github: "https://github.com/manikanta7cheruku",
    linkedin: "https://www.linkedin.com/in/manikanta-cheruku",
    instagram: "https://www.instagram.com/manikanta_netha.7/",
    resume: "/resume/Manikanta-Cheruku-Resume.pdf",
  },
} as const;

export type SectionMeta = { id: string; n: string; label: string };

export const sections: SectionMeta[] = [
  { id: "opening", n: "01", label: "Opening" },
  { id: "perspective", n: "02", label: "Perspective" },
  { id: "work", n: "03", label: "Work" },
  { id: "seven", n: "04", label: "SEVEN" },
  { id: "engineering", n: "05", label: "Engineering" },
  { id: "experience", n: "06", label: "Experience" },
  { id: "beyond", n: "07", label: "Beyond code" },
  { id: "questions", n: "08", label: "Questions" },
  { id: "contact", n: "09", label: "Contact" },
];
