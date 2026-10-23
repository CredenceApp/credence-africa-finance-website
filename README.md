# Credence Africa Finance Website

Production marketing website for Credence Charter Limited, deployed at [credence54.com](https://www.credence54.com/).

## Local development

```bash
pnpm install
pnpm dev
```

Set `VITE_PUBLIC_API_URL` to the Credence backend origin. `VITE_TURNSTILE_SITE_KEY` can override the hostname-restricted production site key in `src/config.ts`; development defaults to Cloudflare's official pass-through test site key. The matching secret belongs only in the backend host's `TURNSTILE_SECRET_KEY` environment variable and must never be added to this repository.

## Deployment

`pnpm build` writes the static site to `dist/`. The build creates a real `dist/report/index.html` entry point for `/report` plus `dist/404.html` as the fallback for other client-side routes on GitHub Pages. The report PDF is intentionally not stored in this public repository; gated downloads are issued by the backend.
