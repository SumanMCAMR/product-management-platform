<template>
  <div class="login flex flex-col items-center justify-center h-screen ">
    <h2 class="text-4xl font-bold text-white">Login</h2>
    <form @submit.prevent="login" class="mt-8 space-y-4">
      <div>
        <InputText v-model="form.email" fluid type="email" placeholder="Email" />
        <small v-if="form?.errors?.email" class="p-error">{{ form.errors.email[0] }}</small>
      </div>
      <div>
        <Password v-model="form.password" fluid placeholder="Password" :feedback="false" toggleMask />
        <small v-if="form?.errors?.password" class="p-error">{{ form.errors.password[0] }}</small>
      </div>
      <Button type="submit" :loading="form.loading"
        class="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">Login</Button>
    </form>

    <RouterLink to="/register" class="mt-4 text-white hover:underline">Register</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import type { LoginCredentials } from '../types/auth'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useToast } from 'primevue';

const router = useRouter()
const auth = useAuthStore();

const form: LoginCredentials = reactive({
  email: '',
  password: '',
  errors: {},
  loading: false
})
const toast = useToast();

const login = async () => {
  form.loading = true;
  try {
    await auth.login(form);
    router.push('/')
  } catch (error: any) {
    if (error?.response?.status === 422) {
      form.errors = error.response.data.errors
    }
    toast.add({ severity: 'error', summary: error.response.data.message, life: 3000 });
  } finally {
    form.loading = false;
  }
}
</script>
