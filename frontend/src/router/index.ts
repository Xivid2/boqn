import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store';
import { useHttp } from '@/plugins/api';
import AuthService from '@/services/auth.service';

const authenticated = ["admin", "customer"];
const admin = ["admin"];

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: false,
                canSee: () => true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true
            }
        },
        // {
        //     path: '/services',
        //     name: 'services',
        //     component: () => import('../views/ServicesView.vue'),
        //     meta: {
        //         requiresAuth: false,
        //         canSee: () => true
        //     }
        // },
        // {
        //     path: '/prices',
        //     name: 'prices',
        //     component: () => import('../views/PricesView.vue'),
        //     meta: {
        //         requiresAuth: false,
        //         canSee: () => true,
        //     }
        // },
        {
            path: '/appointment',
            name: 'appointment',
            component: () => import('../views/AppointmentView.vue'),
            meta: {
                requiresAuth: true,
                canSee: (role: string) => authenticated.includes(role),
            }
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('../views/GalleryView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
            }
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
                redirectIfAuthenticated: true,
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
                redirectIfAuthenticated: true,
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                requiresAuth: true,
                canSee: (role: string) => authenticated.includes(role),
            }
        },
        {
            path: '/admin',
            meta: {
                group: 'admin',
                requiresAuth: true,
                canSee: (role: string) => admin.includes(role),
            },
            component: () => import('../components/admin/AdminPanel.vue'),
            children: [
                {
                    path: '/appointments',
                    name: 'appointments',
                    meta: {
                        group: 'admin',
                        requiresAuth: true,
                        canSee: (role: string) => admin.includes(role),
                    },
                    component: () => import('../components/admin/AdminAppointments.vue')
                },
                {
                    path: '/users',
                    name: 'users',
                    meta: {
                        group: 'admin',
                        requiresAuth: true,
                        canSee: (role: string) => admin.includes(role),
                    },
                    component: () => import('../components/admin/AdminUsers.vue')
                },
            ]
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
            const { access_token, role } = data;

            authStore.setToken(access_token);
            authStore.setRole(role);
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
            const { access_token, role } = data;

            authStore.setToken(access_token);
            authStore.setRole(role);

            const {
                canSee = () => true,
            } = to.meta || {};

            if (!canSee(authStore.role)) {
                authStore.setUnauthenticated();

                return next('/login');
            }

            return next();
        }
    }

    if (authStore.isAuthenticated && redirectIfAuthenticated) {
        return next('/');
    }

    next();
});

export default router
