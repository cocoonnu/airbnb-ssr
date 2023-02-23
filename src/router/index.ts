import { homedir } from 'os'
import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router' // mode: 'hash'
import { createWebHistory } from 'vue-router' // mode: 'history'


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
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes,
})

export default router