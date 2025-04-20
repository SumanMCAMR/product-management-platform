<script setup lang="ts">
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/product';

import DataTable, { type DataTablePageEvent } from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';

const productStore = useProductStore();

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
</script>

<template>
  <div class="max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Products</h2>

    <div class="mb-4">
      <InputGroup>
        <InputText v-model="productStore.search" placeholder="Search products..." @input="handleSearch"
          class="w-full" />
        <InputGroupAddon>
          <Button icon="pi pi-search" severity="secondary" variant="text" @click="handleSearch" />
        </InputGroupAddon>
      </InputGroup>
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
    </DataTable>
  </div>
</template>
