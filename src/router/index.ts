import { homedir } from 'os'
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router'
import { createWebHistory } from 'vue-router'
import { createMemoryHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/',
        redirect: '/login'
    }  

]

const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
})

export default router