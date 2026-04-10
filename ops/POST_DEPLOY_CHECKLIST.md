# Post-Deploy Checklist (Production)

Use this after each deploy on the VPS.

## 1) Quick Health Check (1 minute)

Run from `~/nlgfc_website/front-end`:

```bash
pm2 describe frontend
curl -s -o /dev/null -w "node-local: %{http_code} %{time_total}s\n" http://127.0.0.1:3000/nlgfc-website/
curl -s -o /dev/null -w "nginx-home: %{http_code} %{time_total}s\n" http://127.0.0.1:8080/nlgfc-website/
curl -s -o /dev/null -w "nginx-contact: %{http_code} %{time_total}s\n" http://127.0.0.1:8080/nlgfc-website/contact
ss -ltnp | grep :3000 || true
```

Expected:
- PM2 `status` is `online`.
- PM2 `script path` is `.output/server/index.mjs`.
- `node-local` and `nginx-home` return `200`.
- `:3000` has one stable listener.

## 2) Log Sanity Check

```bash
pm2 logs frontend --nostream --lines 80
```

Expected:
- No repeated `EADDRINUSE`.
- No `nuxt preview --port 3000`.
- No `attempt to write a readonly database`.

## 3) Save Good State

```bash
pm2 save
```

## Fast Recovery (If health check fails)

Run this exact block:

```bash
cd ~/nlgfc_website/front-end

pm2 delete frontend || true
pm2 delete frontendclear || true
pkill -f "nuxt preview" || true
pkill -f "npx serve ./public" || true
fuser -k 3000/tcp || true

unset NODE_ENV
export NITRO_PRESET=node-server
npm ci --include=dev
npm run build

export NODE_ENV=production
export HOST=127.0.0.1
export PORT=3000
export NITRO_HOST=127.0.0.1
export NITRO_PORT=3000

pm2 start .output/server/index.mjs --name frontend --cwd "$PWD" --interpreter "$(which node)" --update-env
pm2 save
```

Then rerun section **1) Quick Health Check**.

