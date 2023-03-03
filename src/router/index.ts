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
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/detail/index.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/index.vue')
    },
    {
        path: '/',
        redirect: '/home'
    }  

]


export function createSSRRouter() {

    return createRouter({
        scrollBehavior() {
            return {
                top: 0,
                behavior: 'smooth',
            }
        },

        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),

        routes,
    })

}