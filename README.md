# Ketan Vishwakarma — Portfolio

The complete portfolio lives in `website/`: homepage, ten case-study pages, local images, video thumbnails, and the public résumé.

## Run locally

```sh
npm ci --prefix website
npm run dev --prefix website
```

## Deploy on Vercel

Import this GitHub repository into Vercel with the root directory left at the repository root. `vercel.json` configures installation, the Vite build, the `website/dist` output directory, and trailing-slash project URLs. No environment variables are needed for the public website.

The original research and source archives stay local. All assets needed to run the site are included under `website/public`.
