// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@sidebase/nuxt-auth"],
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    gakuninClientId: process.env.GAKUNIN_CLIENT_ID,
    gakuninClientSecret: process.env.GAKUNIN_CLIENT_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
});
