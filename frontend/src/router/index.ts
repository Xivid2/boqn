import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store';

const authenticated = ["admin", "customer"];
const admin = ["admin"];

const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView,
            meta: {
                requiresAuth: false,
                canSee: () => true
            }
        },
        {
            path: '/about',
            component: () => import('../views/AboutView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true
            }
        },
        {
            path: '/services',
            redirect: '/services/massages',
            component: () => import('../views/services/ServicesView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true
            },
            children: [
                {
                    path: 'massages',
                    meta: {
                        requiresAuth: false,
                        canSee: () => true
                    },
                    component: () => import('../views/services/ServicesMassages.vue'),
                },
                {
                    path: 'ergo',
                    meta: {
                        requiresAuth: false,
                        canSee: () => true
                    },
                    component: () => import('../views/services/ServicesErgo.vue'),
                },
                {
                    path: 'logo',
                    meta: {
                        requiresAuth: false,
                        canSee: () => true
                    },
                    component: () => import('../views/services/ServicesLogo.vue'),
                },
            ],
        },
        {
            path: '/prices',
            redirect: '/prices/massages',
            component: () => import('../views/prices/PricesView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
            },
            children: [
                {
                    path: 'massages',
                    meta: {
                        requiresAuth: false,
                        canSee: () => true
                    },
                    component: () => import('../views/prices/PricesMassages.vue'),
                },
                {
                    path: 'ergo',
                    meta: {
                        requiresAuth: false,
                        canSee: () => true
                    },
                    component: () => import('../views/prices/PricesErgo.vue'),
                },
                {
                    path: 'logo',
                    meta: {
                        requiresAuth: false,
                        canSee: () => true
                    },
                    component: () => import('../views/prices/PricesLogo.vue'),
                },
            ],
        },
        {
            path: '/appointment',
            component: () => import('../views/AppointmentView.vue'),
            meta: {
                requiresAuth: true,
                canSee: (role: string) => authenticated.includes(role),
            }
        },
        {
            path: '/gallery',
            component: () => import('../views/GalleryView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
            }
        },
        {
            path: '/contact',
            component: () => import('../views/ContactView.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true
            }
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
                redirectIfAuthenticated: true,
            }
        },
        {
            path: '/register',
            component: () => import('../views/Register.vue'),
            meta: {
                requiresAuth: false,
                canSee: () => true,
                redirectIfAuthenticated: true,
            }
        },
        {
            path: '/profile',
            component: () => import('../views/Profile.vue'),
            meta: {
                requiresAuth: true,
                canSee: (role: string) => authenticated.includes(role),
            }
        },
        {
            path: '/admin',
            meta: {
                requiresAuth: true,
                canSee: (role: string) => admin.includes(role),
            },
            component: () => import('../views/admin/Admin.vue'),
            children: [
                {
                    path: "",
                    meta: {
                        requiresAuth: true,
                        canSee: (role: string) => admin.includes(role),
                    },
                    component: () => import('../views/admin/AdminPanel.vue')
                },
                {
                    path: 'services',
                    meta: {
                        requiresAuth: true,
                        canSee: (role: string) => admin.includes(role),
                    },
                    component: () => import('../views/admin/AdminServices/AdminServices.vue'),
                    children: [
                        {
                            path: '',
                            meta: {
                                requiresAuth: true,
                                canSee: (role: string) => admin.includes(role),
                            },
                            component: () => import('../views/admin/AdminServices/AdminServicesList.vue'),
                        },
                        {
                            path: ':id',
                            meta: {
                                requiresAuth: true,
                                canSee: (role: string) => admin.includes(role),
                            },
                            component: () => import('../views/admin/AdminServices/AdminServicesEdit.vue'),
                        },
                        {
                            path: 'create',
                            meta: {
                                requiresAuth: true,
                                canSee: (role: string) => admin.includes(role),
                            },
                            component: () => import('../views/admin/AdminServices/AdminServicesCreate.vue'),
                        },
                    ],
                },
                {
                    path: 'appointments',
                    meta: {
                        requiresAuth: true,
                        canSee: (role: string) => admin.includes(role),
                    },
                    component: () => import('../views/admin/AdminAppointments/AdminAppointmentsList.vue')
                },
                {
                    path: 'users',
                    meta: {
                        requiresAuth: true,
                        canSee: (role: string) => admin.includes(role),
                    },
                    component: () => import('../views/admin/AdminUsers.vue')
                },
            ]
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (!authStore.isInitialRefreshComplete) {
        await authStore.refreshTokens();
    }

    const requiresAuth = to.meta.requiresAuth;
    const redirectIfAuthenticated = to.meta.redirectIfAuthenticated;

    if (requiresAuth) {
        await authStore.refreshTokens();

        if (authStore.error) {
            return next('/login');
        } else {
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
