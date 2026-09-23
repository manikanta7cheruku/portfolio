# Deployment to Vercel

## 1. Verify locally

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

Fix anything that fails before continuing.

## 2. Initialize Git

```bash
git init -b main
git add .
git commit -m "feat: establish portfolio foundation"
```

Use meaningful commits from here on, for example `feat: add neural shell case study`, `perf: optimize animation rendering`, `a11y: improve keyboard navigation`, `seo: add metadata and sitemap`, `docs: add architecture documentation`.

## 3. Create the GitHub repository

With the GitHub CLI:

```bash
gh repo create manikanta7cheruku/portfolio-site --public --source=. --remote=origin --push
```

Or on github.com create an empty repository, then:

```bash
git remote add origin https://github.com/manikanta7cheruku/portfolio-site.git
git push -u origin main
```

Your old portfolio uses the repository name `portfolio`, so this uses a different name.

## 4. Import into Vercel

1. Sign in at vercel.com with your GitHub account.
2. Add New, then Project, then import the repository.
3. Framework preset: Next.js (detected automatically). Leave build and output settings at their defaults.
4. Under Environment Variables add `NEXT_PUBLIC_SITE_URL` with your final public URL, for example `https://manikanta-cheruku.vercel.app`.
5. Deploy.

## 5. Custom domain (optional)

Project Settings, Domains, add the domain, and follow the DNS instructions. Then update `NEXT_PUBLIC_SITE_URL` to the custom domain and redeploy so the canonical URL, sitemap and Open Graph tags point at it.

## 6. Verify after deploying

- Open the site on a phone and a laptop, in both themes.
- Download the résumé and open it.
- Click GitHub, LinkedIn, Instagram, email and phone links.
- Visit `/robots.txt`, `/sitemap.xml`, `/opengraph-image` and a made-up path to see the 404.
- Paste the URL into a link preview (LinkedIn Post Inspector, Slack, WhatsApp) to check the share card.
- Run Lighthouse and PageSpeed Insights and record the numbers.

## Redeploy and rollback

- Every push to `main` deploys automatically. Pull requests get preview URLs.
- To roll back: Vercel dashboard, Deployments, choose a previous good deployment, then Promote to Production (or Instant Rollback). No code change needed.
- To fix forward: `git revert <commit>` then push.
- To redeploy without a code change (for example after changing an environment variable): Deployments, the three-dot menu, Redeploy.
