<script setup lang="ts">
import { useAuthStore } from './stores/auth';
const store = useAuthStore();
</script>

<template>
  <RouterView />
  <Toast />
</template>

<style scoped></style>
