import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const result = {}
  const paths = [
    '/etc/nginx/nginx.conf',
    '/etc/nginx/sites-enabled/',
    '/etc/nginx/conf.d/',
  ]

  for (const p of paths) {
    try {
      const st = statSync(p)
      if (st.isDirectory()) {
        const files = readdirSync(p)
        for (const f of files) {
          try {
            result[join(p, f)] = readFileSync(join(p, f), 'utf-8')
          } catch (e) {
            result[join(p, f)] = `ERROR: ${e.message}`
          }
        }
      } else {
        result[p] = readFileSync(p, 'utf-8')
      }
    } catch (e) {
      result[p] = `ERROR: ${e.message}`
    }
  }

  return result
})
