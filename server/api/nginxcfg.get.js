import { readFileSync, readdirSync } from 'fs'

export default defineEventHandler(() => {
  const out = []
  try {
    const files = readdirSync('/etc/nginx/sites-enabled')
    for (const f of files) {
      try {
        out.push({ file: f, content: readFileSync('/etc/nginx/sites-enabled/' + f, 'utf-8') })
      } catch (e) { out.push({ file: f, error: e.message }) }
    }
  } catch (e) { out.push({ error: 'sites-enabled: ' + e.message }) }
  try {
    out.push({ file: 'nginx.conf', content: readFileSync('/etc/nginx/nginx.conf', 'utf-8') })
  } catch (e) { out.push({ file: 'nginx.conf', error: e.message }) }
  return out
})
