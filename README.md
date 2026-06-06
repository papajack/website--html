# Cloudflare Pages deployment

This repository is set up as a simple static site that can be deployed to Cloudflare Pages from GitHub.

It also includes a Pages Function at `/api/hello`, which behaves like a small worker endpoint.

## What to do next

1. Create a GitHub repository for this folder.
2. Push these files to the repository.
3. In Cloudflare, go to Pages and connect the GitHub repo.
4. Use these settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`

## API route

Visit `/api/hello` after deployment to confirm the worker-style function is running.

## Local preview

Open `index.html` directly in a browser, or use any simple static server if you want local testing.

## If you want Workers later

If you decide to add a Cloudflare Worker later, I can scaffold a `wrangler.toml` and worker entry file for the same repo.