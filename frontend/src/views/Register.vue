<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="form.name" type="text" placeholder="Name" />
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" placeholder="Password" />
        <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import api from '../axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  
  const register = async () => {
    await api.get('/sanctum/csrf-cookie')
    await api.post('/register', form)
    router.push('/products')
  }
  </script>
  