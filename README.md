# LED Second Hand Market - Deployment Guide

This project is a pure static website for Cloudflare Pages.

## Required root files

Keep these files in the repository root:

- `index.html`
- `style.css`
- `script.js`

## Deploy from GitHub to Cloudflare Pages

1. Create a GitHub repository.
2. Upload or push the three root files.
3. Open Cloudflare Dashboard > Pages > Create a project.
4. Connect your GitHub repository.
5. Use these build settings:
   - Framework preset: `None`
   - Build command: leave empty
   - Build output directory: `/`
6. Click `Save and Deploy`.

## Local testing

Open `index.html` in your browser to test quickly.

## Editing products

All product data is in `script.js` inside the `products` array.

You can update:

- `name`
- `image`
- `specs`
- `description`
- `price`

No backend or database is needed.