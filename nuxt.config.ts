// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
 runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000',
    },
  },
  // Configuration for subdirectory deployment and app settings
  app: {
    baseURL: '/nlgfc-website/',
    buildAssetsDir: '/_nuxt/',
    head: {
      title: 'National Local Government Finance Committee',
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/nlgfc-website/images/logo/NLGFC-Logo.png' },
      ],
      // ✅ Add reCAPTCHA v2 script here
      script: [
        {
          src: 'https://www.google.com/recaptcha/api.js',
          async: true,
          defer: true
        }
      ]
    }
  }
})