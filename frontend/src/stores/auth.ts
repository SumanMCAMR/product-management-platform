import { defineStore } from 'pinia';
import api from '../axios';
import type { User } from '@/types/user';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth';



export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        loading: false,
        token: localStorage.getItem('token') || ''
    }),

    getters: {
        isLoggedIn: (state) => !!state.token,
    },

    actions: {
        async fetchUser() {
            this.loading = true;
            try {
                const res = await api.get('/user');
                this.user = res.data;
            } catch {
                this.user = null;
            } finally {
                this.loading = false;
            }
        },

        async login(credentials: LoginCredentials) {
            const res = await api.post('/login', credentials);
            this.token = res.data.access_token;
            this.user = res.data.user;

            localStorage.setItem('token', this.token);
            return res;
        },
        async register(credentials: RegisterCredentials) {
            await api.get('/sanctum/csrf-cookie');
            const res = await api.post('/register', credentials);
            await this.fetchUser();
            return res;
        },

        async logout() {
            await api.post('/logout');
            this.user = null;
            this.token = '';
            localStorage.removeItem('token');
        },
    },
});
