# Rama Sivaji — React Portfolio

A frontend portfolio for a computer science graduate seeking an entry-level Python backend role. Built with React, Vite, Framer Motion, and Lucide.

## Local development

Use Node.js 24. From the repository root, run:

```sh
npm ci
npm run dev
```

## Netlify

For Git-based deployments, use the repository root as the base directory. The included `netlify.toml` configures Node.js 24, runs `npm run build`, and publishes `dist`. Section links use URL fragments. The portfolio runs as static files with no backend or API credentials.

To preview the production build locally:

```sh
npm run build
npm run preview
```

For a manual Netlify deployment, upload the generated `dist` folder.
