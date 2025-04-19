<template>
  <div class="login flex flex-col items-center justify-center h-screen bg-blue-500">
    <h2 class="text-4xl font-bold text-white">Login</h2>
    <form @submit.prevent="login" class="mt-8 space-y-4">
      <div>
        <input v-model="form.email" type="email" placeholder="Email" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <span v-if="form?.errors?.email" class="text-red-500 text-sm">{{ form.errors.email[0] }}</span>
      </div>
      <div>
        <input v-model="form.password" type="password" placeholder="Password" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        <span v-if="form?.errors?.password" class="text-red-500 text-sm">{{ form.errors.password[0] }}</span>
      </div>
      <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">Login</button>
    </form>

    <RouterLink to="/register" class="mt-4 text-white hover:underline">Register</RouterLink>
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
    await auth.login(form);
    router.push('/')
  } catch (error: any) {
    if (error?.response?.status === 422) {
      form.errors = error.response.data.errors
    }
    console.error('Login failed:', error);
  }
}
</script>

