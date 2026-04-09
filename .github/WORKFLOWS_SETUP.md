# GitHub Actions Setup (CI/CD)

This project now has:

- `.github/workflows/ci.yml` for build checks on PRs and pushes.
- `.github/workflows/deploy-production.yml` for production deployment on push to `main`.

## Required Repository Secrets

Create these in GitHub: **Settings -> Secrets and variables -> Actions -> New repository secret**

- `DEPLOY_HOST`  
  Example: `41.77.13.188`
- `DEPLOY_PORT` (optional)  
  Example: `22` (default if not set)
- `DEPLOY_USER`  
  Example: `nlgfc_admin`
- `DEPLOY_PATH`  
  Example: `/home/nlgfc_admin/nlgfc_website/front-end`
- `DEPLOY_SSH_PRIVATE_KEY`  
  Private key for SSH access from GitHub Actions to your server.

## Optional Secrets for Process Restart

Use one of these approaches:

- `PM2_APP_NAME`  
  Example: `nlgfc-frontend`
- `SYSTEMD_SERVICE_NAME`  
  Example: `nlgfc-frontend.service`

If both are empty, deployment will sync and build, but skip restart.

## Recommended GitHub Settings

- Protect `main` branch:
  - Require pull request reviews.
  - Require status check: `Build (Node 22)`.
- Restrict direct pushes to `main` (optional, recommended).
- Add Environment protection on `production` (optional):
  - Required reviewers.
  - Wait timer.

## Notes

- The deploy workflow runs a preflight build on GitHub before deploying.
- Deployment syncs repository files to the server, runs `npm ci`, then `npm run build`.
- Runtime `.env` stays on your server (it is not committed and not overwritten from this repo).

