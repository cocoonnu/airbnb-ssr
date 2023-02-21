import { createRouter } from 'vue-router'
import { createWebHashHistory } from 'vue-router' // mode: 'hash'
import { createWebHistory } from 'vue-router' // mode: 'history'


const routes = [
    {
        path: '/',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/hello',
        name: 'hello',
        component: () => import('@/views/HelloWorld.vue')
    }
]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes,
})

export default router