import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const result = { timestamp: new Date().toISOString(), configs: {} }
  const searchPaths = [
    '/etc/nginx/nginx.conf',
    '/etc/nginx/sites-enabled/',
    '/etc/nginx/conf.d/',
  ]

  for (const p of searchPaths) {
    try {
      if (!existsSync(p)) {
        result.configs[p] = 'PATH_NOT_FOUND'
        continue
      }
      const st = statSync(p)
      if (st.isDirectory()) {
        const files = readdirSync(p)
        result.configs[p] = { type: 'directory', files }
        for (const f of files) {
          const fp = join(p, f)
          try {
            result.configs[fp] = readFileSync(fp, 'utf-8')
          } catch (e) {
            result.configs[fp] = `READ_ERROR: ${e.code || e.message}`
          }
        }
      } else {
        result.configs[p] = readFileSync(p, 'utf-8')
      }
    } catch (e) {
      result.configs[p] = `ERROR: ${e.code || e.message}`
    }
  }

  return result
})
