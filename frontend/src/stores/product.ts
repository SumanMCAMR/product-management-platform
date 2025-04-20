import { defineStore } from 'pinia';
import api from '@/axios';
import type { Product, ProductPayload, ProductState } from '@/types/product';

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        products: [],
        product: null,
        loading: false,
        error: null,
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0
        },
        search: ''
    }),
    getters: {
        total_pages(): number {
            return this.meta.per_page > 0 ? Math.ceil(this.meta.total / this.meta.per_page) : 0;
        }
    },

    actions: {
        async fetchProducts(page: number = 1, perPage?: number): Promise<void> {
            this.loading = true;
            this.error = null;

            if (perPage === undefined) {
                perPage = this.meta.per_page;
            }

            try {
                const res = await api.get('/products', {
                    params: {
                        page,
                        per_page: perPage,
                        search: this.search
                    }
                });
                this.products = res.data.data as Product[];
                this.meta = res.data.meta as {
                    current_page: number;
                    last_page: number;
                    per_page: number;
                    total: number;
                };
            } catch (error: any) {
                this.error = error?.response?.data?.message || 'Failed to fetch products.';
            } finally {
                this.loading = false;
            }
        },
        setSearch(value: string) {
            this.search = value;
        },
        async createProduct(payload: ProductPayload) {
            return api.post('/products', payload).then((res) => {
                this.fetchProducts();
                return res;
            });
        },

        async updateProduct(id: number, payload: ProductPayload) {
            return api.put(`/products/${id}`, payload).then((res) => {
                this.fetchProducts();
                return res;
            });
        },

        async fetchSingleProduct(id: number) {
            return api.get(`/products/${id}`).then((res) => {
                this.products.push(res.data);
                return res;
            });
        },

        async deleteProduct(id: number) {
            return api.delete(`/products/${id}`).then(async () => {
                await this.fetchProducts();
            });
        },

    }
});
