import { defineStore } from 'pinia';
import api from '@/axios';
import type { Product } from '@/types/product';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    search: string;
}

export const useProductStore = defineStore('product', {
    state: (): ProductState => ({
        products: [],
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
        async fetchProducts(page = 1, perPage = this.meta.per_page) {
            this.loading = true;
            this.error = null;

            try {
                const res = await api.get('/products', {
                    params: {
                        page,
                        per_page: perPage,
                        search: this.search
                    }
                });
                this.products = res.data.data;
                this.meta = res.data.meta;
            } catch (error: any) {
                this.error = error?.response?.data?.message || 'Failed to fetch products.';
            } finally {
                this.loading = false;
            }
        },
        setSearch(value: string) {
            this.search = value;
        }
    }
});
