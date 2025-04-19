import { defineStore } from 'pinia';
import api from '../axios';
import type { User } from '@/types/user';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
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

        async login(credentials: LoginCredentials) {
            const res = await api.post('/login', credentials);
            await this.fetchUser();
            return res;
        },
        async register(credentials: RegisterCredentials) {
            const res = await api.post('/register', credentials);
            await this.fetchUser();
            return res;
        },

        async logout() {
            await api.post('/logout');
            this.user = null;
        },
    },
});
