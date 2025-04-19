<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="form.name" type="text" placeholder="Name" />
        <span v-if="form?.errors?.name">{{ form.errors.name[0] }}</span>

        <input v-model="form.email" type="email" placeholder="Email" />
        <span v-if="form?.errors?.email">{{ form?.errors?.email[0] }}</span>

        <input v-model="form.password" type="password" placeholder="Password" />
        <span v-if="form?.errors?.password">{{ form?.errors?.password[0] }}</span>

        <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" />
        <span v-if="form?.errors?.password_confirmation">{{ form?.errors?.password_confirmation[0] }}</span>

        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
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
    await auth.register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    })
    router.push('/')
  } catch (error: any) {
    if (error.response?.status === 422) {
      form.errors = error.response.data.errors
    }
    console.error('Registration failed:', error)
  }
}
  </script>
  