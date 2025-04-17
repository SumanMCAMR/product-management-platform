import { defineStore } from 'pinia';
import api from '../axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as null | { id: number; name: string; email: string },
        loading: false,
    }),

    getters: {
        isLoggedIn: (state) => !!state.user,
    },

    actions: {
        async fetchUser() {
            this.loading = true;
            try {
                const res = await api.get('/api/user');
                this.user = res.data;
            } catch {
                this.user = null;
            } finally {
                this.loading = false;
            }
        },

        async login(credentials: { email: string; password: string }) {
            await api.post('/login', credentials);
            await this.fetchUser();
        },

        async logout() {
            await api.post('/logout');
            this.user = null;
        },
    },
});
