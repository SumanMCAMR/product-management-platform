<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';

import Card from 'primevue/card';
import Image from 'primevue/image';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import type { Product } from '@/types/product';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref('');

const productId = Number(route.params.id);

onMounted(async () => {
    try {
        await productStore.fetchSingleProduct(productId);
        if (!productStore.product) {
            error.value = 'Product not found.';
        }
    } catch (err) {
        error.value = 'Failed to load product.';
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div class="max-w-3xl mx-auto p-4">
        <div class="mb-4 flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-blue-700">Product Details</h2>
            <Button icon="pi pi-arrow-left" label="Back" @click="router.push('/products')" />
        </div>

        <ProgressSpinner v-if="loading" style="width: 50px; height: 50px" />

        <Message v-if="error" severity="error">{{ error }}</Message>

        <Card v-if="productStore.product" class="shadow-md">
            <template #header>
                <Image :src="productStore.product.image" :alt="productStore.product.name" preview
                    imageClass="w-full max-h-96 object-cover rounded" />
            </template>

            <template #title>
                {{ productStore.product.name }}
            </template>

            <template #subtitle>
                {{ productStore.formatCurrency(Number(productStore.product.price)) }}
            </template>

            <template #content>
                <p class="text-gray-700 whitespace-pre-line">
                    {{ productStore.product.description }}
                </p>
            </template>
        </Card>
    </div>
</template>
