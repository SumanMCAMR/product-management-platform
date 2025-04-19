<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <h1 class="text-6xl font-bold text-blue-500">Home Page</h1>
        <div class="mt-12">
            <RouterLink v-if="!auth.isLoggedIn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to="/Login">Login</RouterLink>
            <RouterLink v-if="!auth.isLoggedIn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" to="/register">Register</RouterLink>
            <RouterLink v-if="auth.isLoggedIn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4" to="/products">Products</RouterLink>
            <button @click="auth.logout" v-if="auth.isLoggedIn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">Logout</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '../stores/auth';
const auth = useAuthStore();

</script>
