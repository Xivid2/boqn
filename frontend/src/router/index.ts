import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store';
import { useHttp } from '@/plugins/api';
import AuthService from '@/services/auth.service';

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        // {
        //     path: '/services',
        //     name: 'services',
        //     component: () => import('../views/ServicesView.vue'),
        //     meta: {
        //         requiresAuth: true,
        //     }
        // },
        // {
        //     path: '/prices',
        //     name: 'prices',
        //     component: () => import('../views/PricesView.vue'),
        //     meta: {
        //         requiresAuth: true,
        //     }
        // },
        {
            path: '/appointment',
            name: 'appointment',
            component: () => import('../views/AppointmentView.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('../views/GalleryView.vue'),
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactView.vue'),
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                requiresAuth: false,
                redirectIfAuthenticated: true,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
            meta: {
                requiresAuth: false,
                redirectIfAuthenticated: true,
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                requiresAuth: true,
            }
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const auth = new AuthService(useHttp);

    if (!authStore.isInitialRefreshComplete) {
        const { data, error } = await auth.refreshTokens();

        if (error) {
            authStore.setUnauthenticated();
        } else {
            const { access_token } = data;

            authStore.setToken(access_token);
        }

        authStore.isInitialRefreshComplete = true;
    }

    const requiresAuth = to.meta.requiresAuth;
    const redirectIfAuthenticated = to.meta.redirectIfAuthenticated;

    if (requiresAuth) {
        const { data, error } = await auth.refreshTokens();

        if (error) {
            authStore.setUnauthenticated();

            return next('/login');
        } else {
            const { access_token } = data;

            authStore.setToken(access_token);

            return next();
        }
    }

    if (authStore.isAuthenticated && redirectIfAuthenticated) {
        return next('/');
    }

    next();
});

export default router
