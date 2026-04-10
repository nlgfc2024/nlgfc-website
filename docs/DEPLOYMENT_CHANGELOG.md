# Deployment Changelog

This file tracks production deployment-related changes and incidents.

## 2026-04-10 - Production 504 Gateway Timeout Fix

- Issue: `http://41.77.13.188:8080/nlgfc-website/` returned `504 Gateway Time-out` (`nginx/1.24.0`) after deploy.
- Root cause summary: SSR page rendering was blocked by API calls that could hang/fallback to `localhost:8000`.
- Resolution summary:
  - Replaced `localhost:8000` production fallbacks with runtime-safe API base resolution.
  - Added request timeout/fallback behavior for critical SSR/API fetch paths.
  - Updated deployment workflow to pass Nuxt public runtime env vars to server build/restart step.
- Detailed notes: see [2026-04-10-504-timeout-fix.md](./incidents/2026-04-10-504-timeout-fix.md)

## 2026-04-10 - Follow-up: PM2 Port Contention + Slow SSR (>60s)

- New evidence from smoke checks:
  - `node-local` returned `200` but took ~`104s` on `/nlgfc-website/`.
  - nginx route returned `504` around `60s` on `/nlgfc-website/`.
  - PM2 logs showed repeated `EADDRINUSE` on `127.0.0.1:3000` and legacy `nuxt preview` behavior.
- Additional resolution:
  - Deployment workflow now force-deletes old PM2 app names before restart, then starts `node .output/server/index.mjs` with explicit `HOST=127.0.0.1`, `PORT=3000`.
  - Deployment workflow now forces `NITRO_PRESET=node-server` during build.
  - Deployment workflow now clears orphan listeners on `:3000` before PM2 start and fails if PM2 script is not `.output/server/index.mjs`.
  - Smoke checks were expanded to include diagnostics (`pm2 show/logs`, socket list, nginx logs) on failure.
  - Homepage/API-heavy sections were switched to client-side data loading with shorter timeouts so SSR can return quickly and avoid nginx timeout windows.
