// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  // devtools: { enabled: true },
  modules: ["@sidebase/nuxt-auth"],
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    gakuninClientId: process.env.GAKUNIN_CLIENT_ID,
    gakuninClientSecret: process.env.GAKUNIN_CLIENT_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    drupalClientId: process.env.DRUPAL_CLIENT_ID,
    drupalClientSecret: process.env.DRUPAL_CLIENT_SECRET,
    drupalAuthUrl: process.env.DRUPAL_AUTH_URL,
    drupalScope: process.env.DRUPAL_SCOPE,
    drupalTokenUrl: process.env.DRUPAL_TOKEN_URL,
  },
  auth: {
    baseURL: process.env.NEXTAUTH_URL,
  },
});
