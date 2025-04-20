<template>
  <div class="register flex flex-col items-center justify-center h-screen ">
    <h2 class="text-4xl font-bold text-white">Register</h2>
    <form @submit.prevent="register" class="mt-8 space-y-4 w-1/3">
      <InputText v-model="form.name" type="text" placeholder="Name" fluid />
      <small v-if="form?.errors?.name" class="text-red-500 w-1/3">{{ form.errors.name[0] }}</small>

      <InputText v-model="form.email" type="email" placeholder="Email" fluid />
      <small v-if="form?.errors?.email" class="text-red-500 w-1/3">{{ form.errors.email[0] }}</small>

      <Password v-model="form.password" placeholder="Password" fluid toggleMask />
      <small v-if="form?.errors?.password" class="text-red-500 w-1/3">{{ form.errors.password[0] }}</small>

      <Password v-model="form.password_confirmation" placeholder="Confirm Password" fluid toggleMask />
      <small v-if="form?.errors?.password_confirmation" class="text-red-500 w-1/3">{{
        form.errors.password_confirmation[0] }}</small>

      <Button type="submit" :loading="form.loading" label="Register"
        class="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent" />
    </form>
    <RouterLink to="/login" class="mt-4 text-white hover:underline">Login</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import type { RegisterCredentials } from '@/types/auth';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const router = useRouter();
const auth = useAuthStore();

const form: RegisterCredentials = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  errors: {} as Record<string, string[]>,
  loading: false
})

const register = async () => {
  form.loading = true
  try {
    await auth.register(form);
    router.push('/')
  } catch (error: any) {
    if (error.response?.status === 422) {
      form.errors = error.response.data.errors
    }
    console.error('Registration failed:', error)
  } finally {
    form.loading = false
  }
}
</script>
