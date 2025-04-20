<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product';

import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import ProductForm from './components/ProductForm.vue'
import Badge from 'primevue/badge';
import { useToast } from 'primevue';

const productStore = useProductStore();
const createProductVisible = ref<boolean>(false);
const activeProductId = ref<number | undefined>(undefined);

onMounted(() => {
  productStore.fetchProducts();
});

const handleSearch = () => {
  productStore.fetchProducts(1);
}
const onPageChange = (event: DataTablePageEvent) => {
  const page = event.page + 1;
  const per_page = event.rows;
  productStore.fetchProducts(page, per_page);
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const toast = useToast();

const handleProductDelete = async (id: number) => {
  await productStore.deleteProduct(id);
  toast.add({ severity: 'success', summary: 'Product deleted successfully', life: 3000 });
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Products</h2>

    <div class="mb-4 flex justify-between gap-3">
      <div class="flex-1">
        <InputGroup>
          <InputText v-model="productStore.search" placeholder="Search products..." @input="handleSearch" />
          <InputGroupAddon>
            <Button icon="pi pi-search" severity="secondary" variant="text" @click="handleSearch" />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div class="flex-1 flex justify-end">
        <Badge severity="success" :value="productStore.meta?.total" />
        <Button label="Add Product" severity="success" @click="createProductVisible = true" />
      </div>
    </div>

    <!-- Error / Loading -->
    <div v-if="productStore.loading" class="text-blue-600 mb-2">Loading...</div>
    <div v-if="productStore.error" class="text-red-600 mb-2">{{ productStore.error }}</div>

    <!-- Product Table -->
    <DataTable :value="productStore.products" :lazy="true" :loading="productStore.loading" :paginator="true"
      :rows="productStore.meta.per_page" :totalRecords="productStore.meta.total"
      :first="(productStore.meta.current_page - 1) * productStore.meta.per_page" :rowsPerPageOptions="[5, 10, 20, 50]"
      @page="onPageChange" tableStyle="min-width: 50rem">
      <Column field="name" header="Name" />
      <Column header="Image">
        <template #body="{ data }">
          <img :src="data.image" :alt="data.name" class="w-24 rounded" />
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="{ data }">
          {{ formatCurrency(data.price) }}
        </template>
      </Column>
      <Column field="description" header="Description" />
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" size="small" severity="warning"
              @click="createProductVisible = true; activeProductId = data.id" />
            <Button icon="pi pi-trash" size="small" severity="danger" @click="handleProductDelete(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Drawer v-model:visible="createProductVisible" header="Drawer" position="right">
    <ProductForm :productId="activeProductId" />
  </Drawer>
</template>
