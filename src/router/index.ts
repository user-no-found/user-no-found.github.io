import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/post/:slug',
        name: 'Post',
        component: () => import('../views/Post.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router