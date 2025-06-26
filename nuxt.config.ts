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

  app: {
    head: {
      title: 'National Local Government Finance Committee',
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
<<<<<<< HEAD
        { rel: 'icon', type: 'image/x-icon', href: '/NLGFC-Logo.png' },
=======
        { rel: 'icon', type: 'image/x-icon', href: 'images/logo/NLGFC-Logo.png' },
>>>>>>> 7e5ed2d6a01bcf0e718976fedc48b66d79aaaade
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
