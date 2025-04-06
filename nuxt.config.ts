// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  target: 'static',
  app: {
    head: {
      title: 'ClipGrid',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    }
  },
  nitro: {
    preset: 'netlify-static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      'Lato': true,
      'Nunito+Sans': true
    }
  }
})