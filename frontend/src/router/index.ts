import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        meta: { guestOnly: true },
    },
    {
        path: '/products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/products/:id',
        name: 'products.show',
        component: () => import('../views/Show.vue'),
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/NotFound.vue'),
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    if (!auth.user && localStorage.getItem('pinia')) {
        try {
            await auth.fetchUser();
        } catch (error) {
            console.warn('Could not fetch user:', error);
        }
    }

    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return next('/login');
    }


    if (to.meta.guestOnly && auth.isLoggedIn) {
        return next('/products');
    }

    next();
});

export default router;
