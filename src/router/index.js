import { createRouter, createWebHistory } from 'vue-router';
import RegisterApp from '@/components/Auth/RegisterApp.vue';
import LoginApp from '@/components/Auth/LoginApp.vue';
import HomePage from '@/components/HomePage.vue';
import NotFound from '@/components/Errors/NotFound.vue';
import ForgotPasswordVue from '@/components/Auth/RsetPassword/ForgotPassword.vue';
import ResetPasswordVue from '@/components/Auth/RsetPassword/ResetPassword.vue';
import IndexProfile from '@/components/User/IndexProfile.vue';

import store from '@/store';
import ToDoListVue from '@/components/ToDoList.vue';
import CalendarAppVue from '@/components/CalendarComp/CalendarApp.vue';
const routes = [
    {
        path: '/',
        redirect: 'home',
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterApp,
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginApp,
        meta: { requiresAuth: false }
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPasswordVue,
        meta: { requiresAuth: false }
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: ResetPasswordVue,
        meta: { requiresAuth: false }
    },
    {
        path: '/change-password/:token',
        name: 'change-password',
        component: ResetPasswordVue,
        props: true,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/to-do-list',
        name: 'to-do-list',
        component: ToDoListVue,
        meta: { requiresAuth: true }
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: CalendarAppVue,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: IndexProfile,
        meta: { requiresAuth: true }
    },
    {
        path: '/theme',
        name: 'theme',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/logout',
        name: 'logout',
        meta: { requiresAuth: true }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '404_Not_Found',
    },
    {
        path: '/404_Not_Found',
        name: 'notFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (store.getters.isLogged && to.name !== 'notFound') {
        if (to.meta.requiresAuth == false) {
            next({
                name: 'home',
            });
        } else {
            next();
        }
    }
    else {
        next();
    }
});


export default router;