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
