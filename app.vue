<script setup lang="ts">
const {
  status,
  data,
  lastRefreshedAt,
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  signOut,
} = useAuth();
</script>

<template>
  <div>
    You are currently {{ status }}.
    <div v-if="data">Hello {{ data.user.name }}!</div>
    <div v-else>You are not logged in.</div>
    <div>{{ data }}</div>
    <p>Sign-In Options:</p>
    <button @click="signIn('gakunin')">RDM</button>
    <button @click="signOut()">Sign Out</button>
  </div>
</template>
