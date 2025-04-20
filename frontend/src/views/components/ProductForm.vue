<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/product';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';
import type { ProductPayload } from '@/types/product';

const productStore = useProductStore();
const toast = useToast();

const props = defineProps<{ productId?: number }>();

const productId = props.productId;
const isEdit = !!productId;
const loading = ref(false);
const emit = defineEmits(['close']);

const form = ref({
    name: '',
    description: '',
    price: 0,
    image: null as File | null,
});

onMounted(async () => {
    if (isEdit && productId) {
        const product = productStore.products.find(p => p.id === productId);
        if (product) {
            productStore.product = product;
            form.value = {
                name: product.name,
                description: product.description ?? '',
                price: Number(product.price),
                image: null,
            };
        } else {
            await productStore.fetchSingleProduct(productId);
            if (productStore.product) {
                form.value = {
                    name: productStore.product.name,
                    description: productStore.product.description ?? '',
                    price: Number(productStore.product.price),
                    image: null,
                };
            }
        }
    }
});

const saveProduct = async () => {
    loading.value = true;
    const formData = new FormData() as unknown as ProductPayload;
    formData.append('name', form.value.name);
    formData.append('description', form.value.description);
    formData.append('price', form.value.price.toString());
    formData.append('image_url', productStore.product?.image ?? '');

    if (form.value.image) {
        formData.append('image', form.value.image);
    }

    try {
        if (isEdit && productId) {
            await productStore.updateProduct(productId, formData);
            toast.add({ severity: 'success', summary: 'Product updated', life: 3000 });
        } else {
            await productStore.createProduct(formData);
            toast.add({ severity: 'success', summary: 'Product created', life: 3000 });
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Failed to save product', life: 3000 });
    } finally {
        loading.value = false;
        form.value = {
            name: '',
            description: '',
            price: 0,
            image: null,
        };
        emit('close');
    }
};

function handleFileUpload(event: any) {
    const file = event.files?.[0];
    if (!file) return;

    form.value.image = file;

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string | null;
        if (result) {
            previewImage.value = result;
        }
    };
    reader.readAsDataURL(file);
}
const previewImage = ref<string | null>(null);

</script>


<template>
    <div class="max-w-xl mx-auto p-4">
        <div class="flex flex-col gap-4">
            <label class="flex flex-col gap-1">
                <span>Name</span>
                <InputText v-model="form.name" placeholder="Enter product name" />
            </label>

            <label class="flex flex-col gap-1">
                <span>Price</span>
                <InputNumber v-model="form.price" mode="currency" currency="USD" locale="en-US"
                    placeholder="Enter product price" />
            </label>

            <label class="flex flex-col gap-1">
                <span>Description</span>
                <Textarea v-model="form.description" rows="4" autoResize placeholder="Enter product description" />
            </label>

            <label class="flex flex-col gap-1">
                <span>Upload Image</span>
                <FileUpload mode="basic" accept="image/*" customUpload chooseLabel="Choose Image" class="w-full"
                    @select="handleFileUpload" />
            </label>

            <div v-if="form.image || productStore.product?.image" class="relative mt-3 w-24">
                <i class="pi pi-times absolute top-[-6px] left-[77px] z-10 bg-white text-red-500 p-1 rounded-full shadow cursor-pointer"
                    @click="form.image ? form.image = null : (productStore.product as any).image = undefined" />
                <img v-if="previewImage || productStore.product?.image"
                    :src="previewImage || productStore.product?.image" alt="Product Image"
                    class="w-24 h-24 object-cover rounded" />
            </div>

            <Button :label="isEdit ? 'Update' : 'Create'" :loading="loading"
                :icon="isEdit ? 'pi pi-pencil' : 'pi pi-check'" class="w-full mt-2 self-end" @click="saveProduct" />
        </div>
    </div>
</template>
