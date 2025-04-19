<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="form.email" type="email" placeholder="Email" />
      <span v-if="form.errors.email">{{ form.errors.email[0] }}</span>
      <input v-model="form.password" type="password" placeholder="Password" />
      <span v-if="form.errors.password">{{ form.errors.password[0] }}</span>
      <button type="submit">Login</button>
    </form>

    <RouterLink to="/register">Register</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import type { LoginCredentials } from '../types/auth'

const router = useRouter()
const auth = useAuthStore();

const form : LoginCredentials = reactive({
  email: '',
  password: '',
  errors: {}
})

const login = async () => {
  try {
    await auth.login({
      email: form.email,
      password: form.password,
    });
    router.push('/')
  } catch (error: any) {
    if (error.response.status === 422) {
      form.errors = error.response.data.errors
    }
    console.error('Login failed:', error);
  }
}
</script>
