# Content inventory and verification

Sources: the résumé PDF, the GitHub profile and its README, and the public repositories (README and file listings). Facts below were read on 21 September 2026.

## Where each claim comes from

| Claim on the site | Source |
| --- | --- |
| Education, dates, CGPA 7.0, self-study, languages | Résumé |
| Solo developer of SEVEN since January 2026 | Résumé |
| 30+ FastAPI endpoints, PostgreSQL on Render, tiered licensing, referral system | Résumé |
| Whisper, Ollama, ChromaDB, SentenceTransformers | Résumé and GitHub profile README |
| 13-layer pipeline, direct handlers before the LLM, models offered (LLaMA 3, Phi-3, Qwen, TinyLlama), capabilities, hardware, plans, shortcuts | NEURAL-SHELL README |
| Only time in app, license checks and update checks reach a server | Manikanta, in chat |
| 1,200+ commits | NEURAL-SHELL repository page showed 1,286 |
| Retrieval under a second on 8 GB, no GPU | Résumé |
| Showtime Sentinel architecture, 117 tests, SHA-256 dedup, fail-closed auth, BLOCKED behavior | Showtime-Sentinel README |
| 86% classification accuracy, XGBoost, SHAP, three feature groups | Résumé, and `hackathon-team-dynamics` repo contents |
| AgentFetch and CoBuild live URLs | GitHub repository "About" links |
| Resume Builder is one commit, features planned | Repository page and README |
| Forgotten: genre and concept | Manikanta, in chat |
| Nolan, Interstellar, black holes, relativity of time | Manikanta, in chat |

## Needs your confirmation before launch

1. **Live links not checked.** `agent-fetch.vercel.app` and `cobuild-app.vercel.app` come from the GitHub "About" fields. Open both and confirm they load. Remove the `live` field in `data/projects.ts` for any that do not.
2. **Hackathon accuracy figure.** The 86% comes from the résumé. The site says "on the project dataset". If the dataset is synthetic or self-collected, say so in the status note in `data/projects.ts`.
3. **Speech recognition.** The résumé says Whisper. The NEURAL-SHELL README tech table lists SpeechRecognition and PyAudio. The site follows the résumé. Make sure the repository README and the site agree.
4. **Roles on smaller projects.** "Design and implementation" is used for every project except SEVEN. Change it if any were team projects.
5. **CoBuild.** Its README is still the default Next.js text, so the description is only the repository summary. Add one real design decision when you have one.
6. **Phone number.** It is shown, as you asked. Set `phone.show` to `false` in `data/site.ts` to hide it.
7. **Site URL.** The default `https://manikanta-cheruku.vercel.app` is a guess. Set `NEXT_PUBLIC_SITE_URL` to the real one.
8. **Copy drafted from your brief.** These lines are written from what you told me, not from your own words. Edit them until they sound like you: the hero thought, the Perspective paragraphs, the Beyond code paragraphs, the Forgotten caption, and the Questions intro.

## Left out on purpose

- Java (in the brief, not on the résumé).
- The `Hackathon-Prediction` repository and any others not in the list you approved.
- SEVEN's Chrome extension and overlay: present as folders in the repo, not inspected, so not described.
- "100% offline" and "no data leaves your machine": replaced by an explicit list of what runs locally and what reaches a server.
- Instagram content, testimonials, metrics, awards, and any experience beyond SEVEN.
