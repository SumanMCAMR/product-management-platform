<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();
const search = ref('');

onMounted(() => {
  productStore.fetchProducts();
});

watch(search, () => {
    productStore.search = search.value;
  productStore.fetchProducts();
});

const changePage = (page: number) => {
  productStore.fetchProducts(page);
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold text-blue-600 mb-4">Products</h2>

    <input
      v-model="search"
      type="text"
      placeholder="Search products..."
      class="w-full border border-blue-300 rounded-xl p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />

    <div v-if="productStore.loading" class="text-blue-600">Loading...</div>
    <div v-if="productStore.error" class="text-red-600">{{ productStore.error }}</div>

    <ul v-else class="space-y-4">
      <li
        v-for="product in productStore.products"
        :key="product.id"
        class="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start gap-4">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h3 class="text-lg font-semibold text-blue-700">{{ product.name }}</h3>
            <p class="text-sm text-gray-600">₹{{ product.price }}</p>
            <p class="text-sm mt-1 text-gray-500">{{ product.description }}</p>
          </div>
        </div>
      </li>
    </ul>
    <!-- Pagination -->
    <div class="flex justify-center gap-2 mt-6">
      <button
        v-for="page in productStore?.total_pages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-4 py-2 rounded-lg text-sm',
          page === productStore.meta.current_page
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-blue-600 hover:bg-blue-100'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>
