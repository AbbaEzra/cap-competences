# Skill: Deploy to Cloudflare Pages

## Purpose

This skill guides AI agents through deploying Cap Competences to Cloudflare Pages and connecting the custom domain `cap-expertises.com`. The site is currently hosted at `cap-expertises.pages.dev`.

## Prerequisites

### One-Time Setup (Already Complete)

- GitHub repository configured with Cloudflare Pages
- Cloudflare account with access to the Pages project
- Domain `cap-expertises.com` registered and accessible in Cloudflare

### Per-Deployment

- Git access to the repository
- Ability to run `npm run build` locally (optional, Cloudflare auto-builds)
- Browser access to [Cloudflare Dashboard](https://dash.cloudflare.com/)

## How Deployment Works

1. **Git-based deployment** (recommended):
   - Push changes to the Git repository (GitHub/GitLab)
   - Cloudflare Pages **auto-detects** the push
   - Triggers build & deployment (1–2 minutes)

2. **Wrangler CLI** (alternative):
   - Install Wrangler locally
   - Run `wrangler pages deploy`
   - Useful for quick testing or CI/CD integration

This project uses **Git-based deployment** by default.

---

## Workflow: Deploy via Git Push

### Step 1: Commit Your Changes

```bash
git add [modified files]
git commit -m "Descriptive message of changes"
```

**Examples**:
- `git commit -m "Add Excel formation to catalogue"`
- `git commit -m "Update catalogue filter UI"`
- `git commit -m "Fix mobile responsive layout"`

### Step 2: Push to Remote

```bash
git push origin main
```

**Note**: Replace `main` with your default branch name if different (check with `git branch`).

### Step 3: Monitor Deployment

#### Option A: Cloudflare Dashboard

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **cap-competences** (or your project name)
3. View the **Deployments** tab
4. The latest push appears at the top with a status badge:
   - 🟡 **Queued** or **Building** — in progress
   - 🟢 **Success** — deployed and live
   - 🔴 **Failed** — build error (check logs)

#### Option B: GitHub (if using GitHub)

1. Go to the GitHub repository
2. Click **Actions** tab
3. View the Cloudflare Pages workflow
4. Check the build log for details

### Step 4: Verify Deployment

1. **Test staging URL**: `https://cap-expertises.pages.dev/`
   - Should reflect the latest changes immediately after deployment succeeds

2. **Test custom domain**: `https://cap-expertises.com/`
   - Domain setup must be complete (see "Connect Custom Domain" below)
   - Should be identical to the staging URL (both point to the same deployment)

3. **Test key pages**:
   - `/` (home)
   - `/catalogue/` (formation catalogue)
   - `/formations/excel/` (a formation detail page)
   - `/entreprises/` (companies page)
   - Verify responsive design on mobile

### Step 5: Monitor for Errors

If the deployment fails:

1. Check the build logs in Cloudflare Dashboard
2. Common issues:
   - **Syntax errors in JSON** (`lib/data/catalogue-formations.json`) — fix and re-push
   - **TypeScript errors** — check `npm run build` locally
   - **Missing dependencies** — ensure `package.json` includes all imports
3. Fix the issue locally, commit, and push again

---

## Workflow: Deploy via Wrangler CLI (Alternative)

### Prerequisites

```bash
npm install -g @cloudflare/wrangler
```

### Deployment Steps

```bash
# Build the site
npm run build

# Deploy the output folder to Cloudflare Pages
wrangler pages deploy out/
```

**Notes**:
- Wrangler reads `package.json` and build configuration automatically
- The `out/` folder is the static export from `next build`
- No need to commit to Git for this method (useful for testing)

### Verify Deployment

Same as Git-based workflow (visit staging URL and custom domain).

---

## Workflow: Connect Custom Domain (`cap-expertises.com`)

### Prerequisites

- Domain registered and managed in Cloudflare
- Cloudflare Pages project already created and has at least one successful deployment

### Step 1: Navigate to Pages Project Settings

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** → **cap-competences** (your project)
3. Click **Settings** tab

### Step 2: Add Custom Domain

1. Under **Domains**, click **Add domain**
2. Enter `cap-expertises.com` (or your domain)
3. Click **Continue**

### Step 3: Authorize Domain

Cloudflare will check DNS records. If the domain is already in Cloudflare's nameserver:

1. Cloudflare auto-verifies ownership
2. You may see an option to activate SSL/TLS (usually already enabled)
3. Click **Activate domain** or **Save**

### Step 4: Verify Configuration

1. Wait 1–2 minutes for DNS to propagate
2. Visit `https://cap-expertises.com/`
3. Should load the same content as `https://cap-expertises.pages.dev/`
4. Check browser URL bar shows the custom domain (HTTPS with a 🔒 lock icon)

### Troubleshooting Domain Connection

| Issue | Solution |
|-------|----------|
| Domain not recognized | Ensure domain is in the same Cloudflare account. Update nameservers if needed. |
| 404 Not Found on custom domain | Clear browser cache (Ctrl+Shift+R). Wait 2–5 minutes for DNS cache to clear. |
| SSL/TLS error (not HTTPS) | Cloudflare SSL is usually automatic. Check SSL/TLS settings in **Cloudflare → SSL/TLS → Edge Certificates**. |
| Domain points to old site | Verify DNS records in Cloudflare point to Cloudflare Pages. Check with `nslookup cap-expertises.com`. |

---

## Workflow: Rollback to Previous Deployment

If a deployment breaks the site:

### Step 1: Identify Last Working Deployment

1. Open Cloudflare Dashboard → **Pages** → **cap-competences**
2. Go to **Deployments** tab
3. Find a recent deployment with a 🟢 **Success** badge (that's before the broken one)

### Step 2: Rollback

1. Click the working deployment
2. Click **View Details** or the deployment timestamp
3. Click **Rollback to this deployment** (if available) or **Revert**

### Step 3: Verify

1. Wait for the rollback to complete (usually instant)
2. Visit the staging URL and custom domain
3. Confirm the site is restored to the previous state

**Note**: If rollback is not available, manually revert the problematic commit:

```bash
git revert HEAD
git push origin main
```

---

## Workflow: Preview Deployments (PRs on GitHub)

If using GitHub, Cloudflare can auto-deploy **every pull request** as a preview:

### Enable Preview Deployments

1. Cloudflare Dashboard → **Pages** → **cap-competences**
2. **Settings** → **Build & Deployments**
3. Under **Deployments**, toggle **Preview deployments** to **On**

### View PR Previews

1. Create a pull request on GitHub
2. Cloudflare auto-builds and deploys to a unique URL (e.g., `https://pr-123.cap-competences.pages.dev/`)
3. GitHub PR shows a comment with the preview link
4. Reviewers can test changes before merging to `main`

---

## Build Configuration (Reference)

### Build Settings in Cloudflare Pages

The project should be auto-detected with these settings:

| Setting | Value |
|---------|-------|
| **Build command** | `npm run build` |
| **Output directory** | `out/` |
| **Root directory** | `cap-competences-site/` (if in a monorepo) or `.` (if single repo) |
| **Node.js version** | 18+ (default should work) |

If settings are incorrect:

1. Go to **Settings** → **Build & Deployments** → **Build settings**
2. Update the values above
3. Trigger a manual rebuild by going to **Deployments** → click the latest → **Rebuild**

### Environment Variables (if needed)

If the site requires environment variables (currently not the case):

1. **Settings** → **Environment variables**
2. Add `NEXT_PUBLIC_*` variables for client-side access
3. Redeploy after adding variables

---

## Monitoring & Health Checks

### View Deployment Logs

1. Cloudflare Dashboard → **Pages** → **cap-competences**
2. **Deployments** → click a deployment
3. **View build log** to see detailed build output

### Analytics & Performance

1. **Pages** → **cap-expertises** → **Analytics**
2. View traffic, requests, and error rates
3. Check geographic distribution if needed

### Set Up Alerts (Optional)

Use Cloudflare's notification settings to alert on deployment failures:

1. Cloudflare Dashboard → **Notifications**
2. Create a new notification for "Page Build Failure"
3. Choose delivery method (email, Slack, etc.)

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| **Build fails** | JSON syntax error, missing deps | Check build logs; fix locally; push again |
| **Site 404 after deploy** | Static export not in `out/` | Ensure `next.config.js` has `output: 'export'` and `trailingSlash: true` |
| **Custom domain not working** | DNS not propagated, SSL not active | Wait 2–5 min; check SSL/TLS settings; verify nameservers in Cloudflare |
| **Old content still showing** | Browser cache | Hard-refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) |
| **Formation not in catalogue** | JSON added but not deployed yet | Push changes; wait for build to finish (check deployments tab) |
| **Slow deployment** | Large build or network latency | Normal (1–2 min); check Cloudflare status page if prolonged |

---

## Quick Reference

| Task | Command / Steps |
|------|-----------------|
| Deploy changes | `git push origin main` (auto-deploys) |
| Check deployment status | Cloudflare Dashboard → **Pages** → **Deployments** |
| Test staging URL | `https://cap-expertises.pages.dev/` |
| Test custom domain | `https://cap-expertises.com/` |
| Deploy via Wrangler | `npm run build && wrangler pages deploy out/` |
| Rollback deployment | Cloudflare Dashboard → **Deployments** → click old deployment → **Rollback** |
| View build logs | **Deployments** → click deployment → **View build log** |
| Add custom domain | **Settings** → **Domains** → **Add domain** → `cap-expertises.com` |
| Enable PR previews | **Settings** → **Build & Deployments** → toggle **Preview deployments** |

---

## Related Skills

- [SKILL-formations-crud.md](SKILL-formations-crud.md) — Add, update, or delete formations in the catalogue
- [AGENTS.md](AGENTS.md) — Project overview & architecture
