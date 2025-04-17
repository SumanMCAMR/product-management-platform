<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import api from '../axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const form = reactive({
    email: '',
    password: '',
  })
  
  const login = async () => {
    await api.get('/sanctum/csrf-cookie')
    await api.post('/login', form)
    router.push('/products')
  }
  </script>
  