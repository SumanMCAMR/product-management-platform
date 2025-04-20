<template>
    <div class="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 class="text-5xl font-bold text-blue-600 mb-4">Welcome to Product Management System</h1>
        <p class="text-gray-400 text-lg max-w-xl mb-10">
            Your all-in-one solution for creating, updating, and deleting products. Enhance your product visibility by
            adding images effortlessly.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
            <RouterLink v-if="!auth.isLoggedIn"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md" to="/login">
                Login
            </RouterLink>

            <RouterLink v-if="!auth.isLoggedIn"
                class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-md"
                to="/register">
                Register
            </RouterLink>

            <RouterLink v-if="auth.isLoggedIn"
                class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md"
                to="/products">
                Go to Products
            </RouterLink>

            <Button v-if="auth.isLoggedIn" @click="auth.logout"
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg shadow-md">
                Logout
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import Button from 'primevue/button';
const auth = useAuthStore();
</script>