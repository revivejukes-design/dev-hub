# dev.hub

A monochrome project showcase for developers. Built with Next.js and designed for GitHub + Vercel hosting. Project entries are stored in a JSON file in a GitHub repository, so no Supabase or separate database is needed.

## Features
- Minimal black/white editorial design
- Multiple project posts per account
- Search, category filters, featured projects, and project detail pages
- GitHub sign-in
- Create, edit, and delete your own posts
- GitHub repository is the content store; Vercel runs the app

## Setup

1. Create a GitHub repository to store content (example: `dev-hub-content`).
2. In that repository, add a file named `data/posts.json` with this content:
   ```json
   []
   ```
3. Create a GitHub OAuth App at **GitHub → Settings → Developer settings → OAuth Apps**.
   - Homepage URL: `https://YOUR-VERCEL-DOMAIN`
   - Authorization callback URL: `https://YOUR-VERCEL-DOMAIN/api/auth/callback`
   - For local development, use `http://localhost:3000` and callback `http://localhost:3000/api/auth/callback` (create a separate OAuth app if needed).
4. Create a fine-grained GitHub Personal Access Token with **Contents: Read and write** access to the content repository.
5. Copy `.env.example` to `.env.local` and fill in every value.
   - `AUTH_SECRET`: use a long random string.
   - `GITHUB_OWNER` and `GITHUB_REPO`: the owner and content repository.
   - `GITHUB_TOKEN`: the repository-scoped token.
6. Run:
   ```bash
   npm install
   npm run dev
   ```
7. Push this project to GitHub, import it into Vercel, and add the same environment variables in **Vercel → Project → Settings → Environment Variables**. Redeploy after adding them.

## How content works
A signed-in GitHub user can create multiple project posts. Posts are saved to `data/posts.json` in your content repository through the GitHub Contents API. The GitHub token stays on the server and is never sent to the browser.

**Important:** Anyone who can sign in to the OAuth app can submit posts. For a private team showcase, add an allowlist check in `app/api/posts/route.ts` before enabling public sign-in. The repository token can write to the configured content repository, so keep it private and never commit `.env.local`.

## Deploy
Push this folder to a GitHub repository, then choose **Add New → Project** in Vercel and import it. No other hosting service or database is required.
