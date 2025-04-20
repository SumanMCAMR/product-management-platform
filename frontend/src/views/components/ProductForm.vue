<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';

import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const productStore = useProductStore();
const toast = useToast();
const router = useRouter();

const props = defineProps<{ productId?: number }>();

const productId = props.productId as number | undefined;

// Form fields
const name = ref('');
const price = ref<number | null>(null);
const description = ref('');
const image = ref('');

onMounted(async () => {
    if (productId) {
        let product = productStore.products.find(p => p.id === Number(productId));

        if (!product) {
            await productStore.fetchSingleProduct(Number(productId));
            product = productStore.products.find(p => p.id === Number(productId));
        }

        if (product) {
            name.value = product.name;
            price.value = Number(product.price);
            description.value = product.description || '';
            image.value = product.image || '';
        } else {
            toast.add({ severity: 'error', summary: 'Product not found', life: 3000 });
        }
    }
});

// Save or update
const saveProduct = async () => {
    const payload = {
        name: name.value,
        price: price.value!,
        description: description.value,
        image: image.value,
    };

    try {
        if (productId) {
            await productStore.updateProduct(Number(productId), payload);
            toast.add({ severity: 'success', summary: 'Product updated successfully', life: 3000 });
        } else {
            await productStore.createProduct(payload);
            toast.add({ severity: 'success', summary: 'Product created successfully', life: 3000 });
        }

        router.push('/products');
    } catch (error: any) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.response?.data?.message || 'Something went wrong',
            life: 4000,
        });
    }
};
</script>

<template>
    <div class="max-w-xl mx-auto p-6">
        <h2 class="text-2xl font-semibold text-blue-700 mb-4">
            {{ productId ? 'Update Product' : 'Create Product' }}
        </h2>

        <div class="flex flex-col gap-4">
            <label class="flex flex-col gap-1">
                <span>Name</span>
                <InputText v-model="name" placeholder="Enter product name" />
            </label>

            <label class="flex flex-col gap-1">
                <span>Price</span>
                <InputNumber v-model="price" inputId="currency" mode="currency" currency="USD" locale="en-US"
                    placeholder="Enter product price" />
            </label>

            <label class="flex flex-col gap-1">
                <span>Description</span>
                <Textarea v-model="description" rows="4" autoResize placeholder="Enter product description" />
            </label>

            <label class="flex flex-col gap-1">
                <span>Image URL</span>
                <InputText v-model="image" placeholder="Enter image URL" />
            </label>

            <Button label="Save" icon="pi pi-check" class="w-fit mt-2" @click="saveProduct" />
        </div>
    </div>
</template>
