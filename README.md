# Portfolio

My personal portfolio website, built with React and Vite.

**Live site:** https://denmarthrtn.github.io/portfolio/

## What is in it

- About me, work experience, skills, projects, education and certifications, and contact details
- Animations done in plain CSS, plus a few small React hooks for the typing effect, the number counters and the reveal-on-scroll
- Works on phones, tablets and desktops
- Animations are turned off for people who set their system to reduced motion

There is no UI or animation library. The only dependencies are React and Vite.

## Running it

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints, usually http://localhost:5173.

## Updating the content

All the text is at the top of `src/App.jsx` (profile, experience, skills, projects, education and certifications). The styles and animations are in `src/index.css`.

To add a project, copy one of the entries in the `projects` array and change the details.

## Building and deploying

```bash
npm run build     # writes the site to dist/
npm run preview   # serves dist/ locally
```

Every push to `main` builds the site and publishes it to GitHub Pages using the workflow in `.github/workflows/deploy.yml`.
