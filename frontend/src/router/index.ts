import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store';

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
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/SignInView.vue'),
            meta: {
                requiresAuth: false,
                redirectIfAuthenticated: true,
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    const isAuthenticated = !!authStore.accessToken;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router
