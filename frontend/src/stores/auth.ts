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
            if (!this.token) return;
            const res = await api.get('/user');
            this.user = res.data;
        },

        async login(credentials: LoginCredentials) {
            const res = await api.post('/login', credentials);
            this.token = res.data.access_token;
            this.user = res.data.user;

            localStorage.setItem('token', this.token);
            return res;
        },
        async register(credentials: RegisterCredentials) {
            const res = await api.post('/register', credentials);
            this.token = res.data.access_token;
            this.user = res.data.user;
            localStorage.setItem('token', this.token);
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
