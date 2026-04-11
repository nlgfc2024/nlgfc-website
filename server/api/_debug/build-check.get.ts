import { readdirSync, statSync, existsSync } from 'fs'
import { resolve, join } from 'path'

export default defineEventHandler(() => {
  const cwd = process.cwd()
  const outputDir = resolve(cwd, '.output')
  const publicDir = resolve(outputDir, 'public')
  const nuxtDir = resolve(publicDir, '_nuxt')
  const buildsDir = resolve(publicDir, '_nuxt', 'builds')

  const result: Record<string, any> = {
    cwd,
    outputExists: existsSync(outputDir),
    publicExists: existsSync(publicDir),
    nuxtDirExists: existsSync(nuxtDir),
    buildsDirExists: existsSync(buildsDir),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      NITRO_PRESET: process.env.NITRO_PRESET,
      NUXT_PUBLIC_API_BASE: process.env.NUXT_PUBLIC_API_BASE ? '(set)' : '(empty)',
      NUXT_PUBLIC_BASE_URL: process.env.NUXT_PUBLIC_BASE_URL ? '(set)' : '(empty)',
    },
  }

  if (existsSync(publicDir)) {
    try {
      result.publicContents = readdirSync(publicDir).slice(0, 30)
    } catch (e: any) {
      result.publicContentsError = e.message
    }
  }

  if (existsSync(nuxtDir)) {
    try {
      const files = readdirSync(nuxtDir)
      result.nuxtFileCount = files.length
      result.nuxtSample = files.slice(0, 15)
      // Check for JS files
      const jsFiles = files.filter(f => f.endsWith('.js'))
      result.nuxtJsCount = jsFiles.length
    } catch (e: any) {
      result.nuxtReadError = e.message
    }
  }

  if (existsSync(buildsDir)) {
    try {
      result.buildsContents = readdirSync(buildsDir)
      const metaDir = join(buildsDir, 'meta')
      if (existsSync(metaDir)) {
        result.buildsMetaContents = readdirSync(metaDir)
      }
    } catch (e: any) {
      result.buildsReadError = e.message
    }
  }

  // Check .output/server exists
  const serverDir = resolve(outputDir, 'server')
  result.serverDirExists = existsSync(serverDir)
  if (existsSync(serverDir)) {
    try {
      result.serverContents = readdirSync(serverDir).slice(0, 10)
    } catch {}
  }

  return result
})
