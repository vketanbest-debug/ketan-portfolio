# Ketan Vishwakarma — portfolio review

The portfolio includes ten complete case studies at distinct `/work/` URLs. All selected-work cards and archive links open their local project pages.

## Local use

Install with `npm ci`, start with `npm run dev`, and open http://127.0.0.1:5173/. The first case study is at http://127.0.0.1:5173/work/angel-one-for-everyone/.

`npm run build` creates a static multi-page build in `dist`. `npm run preview` serves that build (stop the development server first, since both use port 5173). Do not open the HTML directly from disk; serve the folder over HTTP. No public deployment has been made.

## Editing

Content and interactions: `src/main.js`. Shared styling and responsive rules: `src/style.css`. Optional Three.js interaction: `src/shape.js`. Source assets are preserved outside this folder. The website uses copies in `public/assets`. See `DESIGN-SYSTEM.md` for the editorial direction, tokens, structure and source boundaries.

GSAP is loaded for entry and scroll interactions. Anime.js loads when a campaign image is opened. Three.js loads only after Explore in 3D is clicked and renders on pointer input or button activation. Reduced-motion preferences disable entry motion and pointer-driven 3D rotation.

## 21st.dev

The official `@21st-dev/cli` is installed as a development dependency. The official Codex MCP setup command has been run. Account authentication is still missing, so no 21st component retrieval or hosted generation is claimed. Authenticate with 21st.dev and supply the configured API_KEY_21ST environment variable securely before enabling/using the connection. Never commit credentials or add them to browser code.

## Content provenance

The supplied résumé is the source for job titles, dates, education, contact information and career claims. The supplied Wix archive is the source for campaign copy, 10M+ reach and 10+ formats. Visual commentary describes the supplied executions. Product offer claims inside historic artwork are not current product recommendations.

## Project pages

The nine additional stories are configured in `scripts/generate-projects.mjs`, using the supplied `Portfolio Assets` archive. Run `node scripts/generate-projects.mjs` to rebuild their route entries, local media and `src/projects.json`. Run `node scripts/check-videos.mjs` afterward to verify the original YouTube URLs and refresh film titles. `src/project-page.js` renders the project-specific content using the shared design system. YouTube players load only after a visitor chooses Play; direct YouTube links are also available.

Run `npm run build` and `node scripts/verify.mjs` to check all eleven routes and local assets while the development server is running. The failed images in the original archive are not referenced by the site.

## Original review checklist

- Approve the dark editorial direction and typography.
- Check the first case study’s narrative, role attribution and reported reach.
- Review the chapter navigation and full-size images on desktop and phone.
- Review the nine additional project narratives and galleries, now created following approval to continue.
