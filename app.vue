<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth();
</script>

<template>
  <div class="auth-container">
    <h1 class="status">You are currently {{ status }}.</h1>

    <div v-if="data" class="user-info">
      <p class="welcome">Hello {{ data.user.name }}!</p>
    </div>
    <div v-else class="login-status">You are not logged in.</div>

    <div class="data-display">{{ data }}</div>

    <p class="options-title">Sign-In Options:</p>
    <div class="button-container">
      <button @click="signIn('gakunin')" class="btn sign-in">RDM</button>
      <button @click="signOut" class="btn sign-out">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.status {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.user-info {
  font-size: 1.2rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.login-status {
  font-size: 1.2rem;
  color: #f44336;
  margin-bottom: 1rem;
}

.data-display {
  font-size: 0.9rem;
  color: #666;
  margin: 1rem 0;
  word-wrap: break-word;
}

.options-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 1.5rem 0 0.5rem;
  color: #555;
}

.button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn.sign-in {
  background-color: #4caf50;
  color: #fff;
}

.btn.sign-in:hover {
  background-color: #45a049;
}

.btn.sign-out {
  background-color: #f44336;
  color: #fff;
}

.btn.sign-out:hover {
  background-color: #e53935;
}
</style>
