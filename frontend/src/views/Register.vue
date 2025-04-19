<template>
    <div class="register flex flex-col items-center justify-center h-screen bg-blue-500">
      <h2 class="text-4xl font-bold text-white">Register</h2>
      <form @submit.prevent="register" class="mt-8 space-y-4">
        <input v-model="form.name" type="text" placeholder="Name" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
        <span v-if="form?.errors?.name" class="text-red-500 text-sm">{{ form.errors.name[0] }}</span>

        <input v-model="form.email" type="email" placeholder="Email" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
        <span v-if="form?.errors?.email" class="text-red-500 text-sm">{{ form?.errors?.email[0] }}</span>

        <input v-model="form.password" type="password" placeholder="Password" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
        <span v-if="form?.errors?.password" class="text-red-500 text-sm">{{ form?.errors?.password[0] }}</span>

        <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
        <span v-if="form?.errors?.password_confirmation" class="text-red-500 text-sm">{{ form?.errors?.password_confirmation[0] }}</span>

        <button type="submit" class="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">Register</button>
      </form>
      <RouterLink to="/login" class="mt-4 text-white hover:underline">Login</RouterLink>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import type { RegisterCredentials } from '@/types/auth';
  
  const router = useRouter();
  const auth = useAuthStore();
  
  const form : RegisterCredentials = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  errors: {} as Record<string, string[]>
})

const register = async () => {
  try {
    await auth.register(form);
    router.push('/')
  } catch (error: any) {
    if (error.response?.status === 422) {
      form.errors = error.response.data.errors
    }
    console.error('Registration failed:', error)
  }
}
  </script>
  