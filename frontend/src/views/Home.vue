<template>
    <div>Home Page</div>
    <RouterLink v-if="!auth.isLoggedIn" to="/Login">Login</RouterLink>
    <RouterLink v-if="!auth.isLoggedIn" to="/register">Register</RouterLink>
    <RouterLink v-if="auth.isLoggedIn" to="/products">Products</RouterLink>
    <button @click="auth.logout" v-if="auth.isLoggedIn">Logout</button>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();

</script>