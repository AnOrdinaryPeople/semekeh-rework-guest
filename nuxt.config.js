import { id } from './plugins/i18n'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  env: {
    appName: process.env.MIX_APP_NAME,
    appURL: process.env.MIX_APP_URL
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.MIX_APP_NAME,
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'keywords', content: process.env.MIX_META_KEYWORDS },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    noscript: [{ innerHTML: `We're sorry but ${process.env.MIX_APP_NAME} doesn't work properly without JavaScript enabled. Please enable it to continue.` }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/helper.ts',
    '~plugins/icon.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    'nuxt-i18n',
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  styleResources: {
    scss: ['./assets/sccs/*.scss']
  },

  i18n: {
    locales: ['id'],
    defaultLocale: 'id',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        id
      }
    }
  },

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.MIX_APP_URL,
      headers: {
        common: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    },
  },

  pwa: {
    meta: {
      name: process.env.MIX_APP_NAME,
      author: process.env.MIX_META_AUTHOR,
      description: process.env.MIX_META_DESCRIPTION,
      theme_color: process.env.MIX_META_THEME_COLOR,
      lang: 'id',
      twitterCard: 'summary',
      twitterSite: process.env.MIX_META_TWITTER_SITE
    },
    manifest: {
      name: process.env.MIX_META_AUTHOR,
      short_name: process.env.MIX_APP_NAME,
      description: process.env.MIX_META_DESCRIPTION,
      background_color: process.env.MIX_MANIFEST_BACKGROUND
    }
  }
}
